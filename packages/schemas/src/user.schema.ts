import { z } from "zod";

export const userSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string().min(1).nullable().optional(),
    password: z
        .string()
        .min(8)
        .max(64)
        .refine((value) => {
            // Password must contain at least one lowercase letter, one uppercase letter, and one digit
            return (
                /[a-z]/.test(value) &&
                /[A-Z]/.test(value) &&
                /[0-9]/.test(value)
            );
        }, "Password must contain at least one lowercase letter, one uppercase letter, and one digit")
        .refine((value) => {
            // Password must not contain whitespace
            return !/\s/.test(value);
        }),
    roles: z.array(z.enum(["ROLE_USER", "ROLE_ADMIN"])),
    createdAt: z.date(),
    updatedAt: z.date()
});

export type User = z.infer<typeof userSchema>;

export const createUserInputSchema = userSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
});

export type CreateUserInput = z.infer<typeof createUserInputSchema>;

export const updateUserInputSchema = userSchema.partial().omit({
    id: true,
    createdAt: true,
    updatedAt: true
});

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;

export const userResponseSchema = userSchema.omit({ password: true }).strict();

export type UserResponse = z.infer<typeof userResponseSchema>;

export const userArrayResponseSchema = z.array(userResponseSchema);

export type UserArrayResponse = z.infer<typeof userArrayResponseSchema>;
