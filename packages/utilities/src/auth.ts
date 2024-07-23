import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const checkPassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};

const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

export { checkPassword, hashPassword };
