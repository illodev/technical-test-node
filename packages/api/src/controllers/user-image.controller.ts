import { FastifyReply, FastifyRequest } from "fastify";

import {
    createUserImageInputSchema,
    UserImageResponse
} from "@monorepo/schemas/user-image.schema";
import { userImageService } from "@monorepo/services/user-image.service";
import { handleApiError } from "../utils/response.util";

/**
 * Create a new userImage
 *
 * @param req - Request
 * @param reply - Reply
 * @returns UserImageResponse
 *
 * @example
 * createUserImageHandler(req, reply);
 */
const createUserImageHandler = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<UserImageResponse> => {
    try {
        const userImageData = createUserImageInputSchema.parse(req.body);
        const userImage = await userImageService.createUserImage(userImageData);

        return reply.status(201).send(userImage);
    } catch (error: unknown) {
        return handleApiError(error, reply);
    }
};

/**
 * Delete a user image
 *
 * @param req - Request
 * @param reply - Reply
 * @returns UserImageResponse
 *
 * @example
 * deleteUserImageHandler(req, reply);
 */
const deleteUserImageHandler = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<void> => {
    try {
        const { id } = req.params as { id: string };

        await userImageService.deleteUserImage(id);

        return reply.status(204).send();
    } catch (error: unknown) {
        return handleApiError(error, reply);
    }
};

export {
    createUserImageHandler,
    deleteUserImageHandler
};

