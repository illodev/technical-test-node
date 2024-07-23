import { prisma } from "@monorepo/database/prisma";
import {
    CreateUserInput,
    UpdateUserInput
} from "@monorepo/schemas/user.schema";
import { hashPassword } from "@monorepo/utilities/auth";

const userSelect = {
    id: true,
    email: true,
    name: true,
    roles: true,
    createdAt: true,
    updatedAt: true
};

export const userService = {
    async findAllUsers() {
        return prisma.user.findMany({
            select: userSelect
        });
    },
    async findUserById(id: string) {
        return prisma.user.findUnique({
            where: { id },
            select: userSelect
        });
    },
    async createUser(data: CreateUserInput) {
        const { email, password: plainPassword, ...rest } = data;

        const existingUser = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await hashPassword(plainPassword);

        return prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                ...rest
            },
            select: userSelect
        });
    },
    async updateUser(id: string, data: UpdateUserInput) {
        if (data.password) {
            data.password = await hashPassword(data.password);
        }

        return prisma.user.update({
            where: { id },
            data,
            select: userSelect
        });
    },
    async deleteUser(id: string) {
        return prisma.user.delete({
            where: { id }
        });
    }
};
