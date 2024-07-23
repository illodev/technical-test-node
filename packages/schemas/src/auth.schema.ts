import { z } from "zod";
import { userSchema } from "./user.schema";

export const loginInputSchema = userSchema.pick({
    email: true,
    password: true
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const loginResponseSchema = z.object({
    accessToken: z.string()
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const registerInputSchema = userSchema.omit({
    id: true,
    roles: true,
    createdAt: true,
    updatedAt: true
});

export type RegisterInput = z.infer<typeof registerInputSchema>;

export const registerResponseSchema = userSchema.omit({ password: true });

export type RegisterResponse = z.infer<typeof registerResponseSchema>;

export const refreshTokenInputSchema = z.object({
    refreshToken: z.string()
});

export type RefreshTokenInput = z.infer<typeof refreshTokenInputSchema>;

export const refreshTokenResponseSchema = z.object({
    accessToken: z.string()
});

export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;

export const logoutResponseSchema = z.object({
    message: z.string()
});

export type LogoutResponse = z.infer<typeof logoutResponseSchema>;
