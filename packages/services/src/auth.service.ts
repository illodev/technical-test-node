import { prisma } from "@monorepo/database/prisma";
import type { LoginInput, RegisterInput } from "@monorepo/schemas/auth.schema";
import { UserResponse } from "@monorepo/schemas/user.schema";
import { checkPassword, hashPassword } from "@monorepo/utilities/auth";

const authService = {
    login: async (data: LoginInput): Promise<UserResponse> => {
        const { email, password: plainPassword } = data;

        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        const isMatch =
            user && (await checkPassword(plainPassword, user.password));

        if (!user || !isMatch) {
            throw new Error("Invalid email or password");
        }

        return user;
    },
    register: async (data: RegisterInput): Promise<UserResponse> => {
        const { email, password: plainPassword, ...restUser } = data;

        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        });

        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await hashPassword(plainPassword);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                ...restUser
            }
        });

        return user;
    }
};

export { authService };
