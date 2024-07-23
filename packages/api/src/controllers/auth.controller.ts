import { FastifyReply, FastifyRequest } from "fastify";

import {
    loginInputSchema,
    LoginResponse,
    LogoutResponse,
    registerInputSchema,
    RegisterResponse
} from "@monorepo/schemas/auth.schema";
import { authService } from "@monorepo/services/auth.service";
import { accessTokenCookieOptions } from "../config/auth.config";
import { handleApiError } from "../utils/response.util";

/**
 * Login a user
 *
 * @param req - Request
 * @param reply - Reply
 * @returns LoginResponse
 *
 * @example
 * loginHandler(req, reply);
 */
const loginHandler = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<LoginResponse> => {
    try {
        const userData = loginInputSchema.parse(req.body);
        const user = await authService.login(userData);

        const token = req.server.jwt.sign(user);

        reply.setCookie(
            accessTokenCookieOptions.name,
            token,
            accessTokenCookieOptions
        );

        return reply.send({ accessToken: token });
    } catch (error) {
        return handleApiError(error, reply);
    }
};

/**
 * Register a new user
 *
 * @param req - Request
 * @param reply - Reply
 * @returns RegisterResponse
 *
 * @example
 * registerHandler(req, reply);
 */
const registerHandler = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<RegisterResponse> => {
    try {
        const userData = registerInputSchema.parse(req.body);
        const user = await authService.register(userData);

        return reply.status(201).send(user);
    } catch (error: unknown) {
        return handleApiError(error, reply);
    }
};

/**
 * Logout a user
 *
 * @param req - Request
 * @param reply - Reply
 * @returns LogoutResponse
 *
 * @example
 * logoutHandler(req, reply);
 */
const logoutHandler = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<LogoutResponse> => {
    try {
        reply.clearCookie(accessTokenCookieOptions.name);

        return reply.send({ message: "User logged out successfully" });
    } catch (error) {
        return reply
            .status(400)
            .send("An error occurred while logging out the user");
    }
};

export { loginHandler, logoutHandler, registerHandler };
