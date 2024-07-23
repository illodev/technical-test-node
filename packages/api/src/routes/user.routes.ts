import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { buildJsonSchemas } from "fastify-zod";

import {
    createUserInputSchema,
    updateUserInputSchema,
    userResponseSchema
} from "@monorepo/schemas/user.schema";
import {
    badRequestResponseSchema,
    notFoundResponseSchema,
    unauthorizedResponseSchema,
    unprocessableEntityResponseSchema
} from "../config/swagger.config";
import {
    createUserHandler,
    deleteUserHandler,
    getUserHandler,
    getUsersHandler,
    updateUserHandler
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth-middleware";

/**
 * Defines the user routes for the Fastify application.
 *
 * @param fastify - The Fastify instance.
 */
const userRoutes: FastifyPluginAsync = async (
    fastify: FastifyInstance
): Promise<void> => {
    const { schemas: userSchemas, $ref } = buildJsonSchemas(
        {
            createUserInputSchema,
            updateUserInputSchema,
            userResponseSchema
        },
        {
            $id: "user",
            target: "openApi3"
        }
    );

    // Add schemas to Fastify instance
    for (let userSchema of [...userSchemas]) {
        fastify.addSchema(userSchema);
    }

    fastify.post(
        "/",
        {
            preHandler: [authMiddleware],
            schema: {
                tags: ["User"],
                summary: "Create a user",
                description: "Create a user",
                security: [
                    {
                        Bearer: []
                    }
                ],
                body: $ref("createUserInputSchema"),
                response: {
                    201: $ref("userResponseSchema"),
                    400: badRequestResponseSchema,
                    401: unauthorizedResponseSchema,
                    422: unprocessableEntityResponseSchema
                }
            }
        },
        createUserHandler
    );

    fastify.get(
        "/",
        {
            preHandler: [authMiddleware],
            config: {
                allowedRoles: ["ROLE_ADMIN"]
            },
            schema: {
                tags: ["User"],
                summary: "Get all users",
                description: "Get all users",
                security: [
                    {
                        Bearer: []
                    }
                ],
                response: {
                    200: {
                        type: "array",
                        items: $ref("userResponseSchema")
                    }
                }
            }
        },
        getUsersHandler
    );

    fastify.get(
        "/:id",
        {
            preHandler: [authMiddleware],
            schema: {
                tags: ["User"],
                summary: "Get a user",
                description: "Get a user",
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
                            description: "User ID"
                        }
                    }
                },
                response: {
                    200: $ref("userResponseSchema"),
                    404: notFoundResponseSchema
                }
            }
        },
        getUserHandler
    );

    fastify.put(
        "/:id",
        {
            preHandler: [authMiddleware],
            schema: {
                tags: ["User"],
                summary: "Update a user",
                description: "Update a user",
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
                            description: "User ID"
                        }
                    }
                },
                body: $ref("updateUserInputSchema"),
                response: {
                    200: $ref("userResponseSchema"),
                    400: badRequestResponseSchema,
                    401: unauthorizedResponseSchema,
                    404: notFoundResponseSchema,
                    422: unprocessableEntityResponseSchema
                }
            }
        },
        updateUserHandler
    );

    fastify.delete(
        "/:id",
        {
            preHandler: [authMiddleware],
            schema: {
                tags: ["User"],
                summary: "Delete a user",
                description: "Delete a user",
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
                            description: "User ID"
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
        deleteUserHandler
    );
};

export { userRoutes };
