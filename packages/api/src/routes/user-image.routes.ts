import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { buildJsonSchemas } from "fastify-zod";

import {
    createUserImageInputSchema,
    userImageResponseSchema
} from "@monorepo/schemas/user-image.schema";
import {
    badRequestResponseSchema,
    notFoundResponseSchema,
    unauthorizedResponseSchema,
    unprocessableEntityResponseSchema
} from "../config/swagger.config";
import {
    createUserImageHandler,
    deleteUserImageHandler
} from "../controllers/user-image.controller";
import { authMiddleware } from "../middlewares/auth-middleware";

/**
 * Defines the user image routes for the Fastify application.
 *
 * @param fastify - The Fastify instance.
 */
const userImageRoutes: FastifyPluginAsync = async (
    fastify: FastifyInstance
): Promise<void> => {
    const { schemas: userImageSchemas, $ref } = buildJsonSchemas(
        {
            createUserImageInputSchema,
            userImageResponseSchema
        },
        {
            $id: "userImage",
            target: "openApi3"
        }
    );

    // Add schemas to Fastify instance
    for (let userImageSchema of [...userImageSchemas]) {
        fastify.addSchema(userImageSchema);
    }

    fastify.post(
        "/",
        {
            preHandler: [authMiddleware],
            schema: {
                consumes: ["multipart/form-data"],
                tags: ["UserImage"],
                summary: "Create a user image",
                description: "Create a user image",
                security: [
                    {
                        Bearer: []
                    }
                ],
                body: {
                    // multipart/form-data
                    type: "object",
                    properties: {
                        file: {
                            type: "string",
                            description: "File to upload",
                            format: "binary"
                        }
                    }
                },
                response: {
                    201: $ref("userImageResponseSchema"),
                    400: badRequestResponseSchema,
                    401: unauthorizedResponseSchema,
                    422: unprocessableEntityResponseSchema
                }
            }
        },
        createUserImageHandler
    );

    fastify.delete(
        "/:id",
        {
            preHandler: [authMiddleware],
            schema: {
                tags: ["UserImage"],
                summary: "Delete a user image",
                description: "Delete a user image",
                security: [
                    {
                        Bearer: []
                    }
                ],
                params: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "UserImage ID"
                        }
                    }
                },
                response: {
                    204: {
                        type: "null"
                    },
                    401: unauthorizedResponseSchema,
                    404: notFoundResponseSchema
                }
            }
        },
        deleteUserImageHandler
    );
};

export { userImageRoutes };
