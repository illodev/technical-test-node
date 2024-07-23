import { FastifyReply, FastifyRequest } from "fastify";

import {
    createUserInputSchema,
    updateUserInputSchema,
    UserResponse
} from "@monorepo/schemas/user.schema";
import { userService } from "@monorepo/services/user.service";
import { handleApiError } from "../utils/response.util";

/**
 * Create a new user
 *
 * @param req - Request
 * @param reply - Reply
 * @returns UserResponse
 *
 * @example
 * createUserHandler(req, reply);
 */
const createUserHandler = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<UserResponse> => {
    try {
        const userData = createUserInputSchema.parse(req.body);
        const user = await userService.createUser(userData);

        return reply.status(201).send(user);
    } catch (error: unknown) {
        return handleApiError(error, reply);
    }
};

/**
 * Get all users
 *
 * @param req - Request
 * @param reply - Reply
 * @returns UserResponse[]
 *
 * @example
 * getUsersHandler(req, reply);
 */
const getUsersHandler = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<UserResponse[]> => {
    try {
        const users = await userService.findAllUsers();

        return reply.status(200).send(users);
    } catch (error: unknown) {
        return handleApiError(error, reply);
    }
};

/**
 * Get a user by ID
 *
 * @param req - Request
 * @param reply - Reply
 * @returns UserResponse
 *
 * @example
 * getUserHandler(req, reply);
 */
const getUserHandler = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<UserResponse> => {
    try {
        const { id } = req.params as { id: string };

        const user = await userService.findUserById(id);

        if (!user) {
            return reply.status(404).send("User not found");
        }

        return reply.status(200).send(user);
    } catch (error: unknown) {
        return handleApiError(error, reply);
    }
};

/**
 * Update a user
 *
 * @param req - Request
 * @param reply - Reply
 * @returns UserResponse
 *
 * @example
 * updateUserHandler(req, reply);
 */
const updateUserHandler = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<UserResponse> => {
    try {
        const { id } = req.params as { id: string };

        const userData = updateUserInputSchema.parse(req.body);
        const user = await userService.updateUser(id, userData);

        return reply.status(200).send(user);
    } catch (error: unknown) {
        return handleApiError(error, reply);
    }
};

/**
 * Delete a user
 *
 * @param req - Request
 * @param reply - Reply
 * @returns UserResponse
 *
 * @example
 * deleteUserHandler(req, reply);
 */
const deleteUserHandler = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<void> => {
    try {
        const { id } = req.params as { id: string };

        await userService.deleteUser(id);

        return reply.status(204).send();
    } catch (error: unknown) {
        return handleApiError(error, reply);
    }
};

export {
    createUserHandler,
    deleteUserHandler,
    getUserHandler,
    getUsersHandler,
    updateUserHandler
};
