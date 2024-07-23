import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { buildJsonSchemas } from "fastify-zod";

import {
    createPostInputSchema,
    postResponseSchema,
    updatePostInputSchema
} from "@monorepo/schemas/post.schema";
import {
    badRequestResponseSchema,
    notFoundResponseSchema,
    unauthorizedResponseSchema,
    unprocessableEntityResponseSchema
} from "../config/swagger.config";
import {
    createPostHandler,
    deletePostHandler,
    getPostHandler,
    getPostsHandler,
    updatePostHandler
} from "../controllers/post.controller";
import { authMiddleware } from "../middlewares/auth-middleware";

/**
 * Defines the routes for handling post-related operations.
 *
 * @param fastify - The Fastify instance.
 */
const postRoutes: FastifyPluginAsync = async (
    fastify: FastifyInstance
): Promise<void> => {
    const { schemas: postSchemas, $ref } = buildJsonSchemas(
        {
            createPostInputSchema,
            updatePostInputSchema,
            postResponseSchema
        },
        {
            $id: "post",
            target: "openApi3"
        }
    );

    // Add schemas to Fastify instance
    for (let postSchema of [...postSchemas]) {
        fastify.addSchema(postSchema);
    }

    fastify.post(
        "/",
        {
            preHandler: [authMiddleware],
            schema: {
                tags: ["Post"],
                summary: "Create a post",
                description: "Create a post",
                security: [
                    {
                        Bearer: []
                    }
                ],
                body: $ref("createPostInputSchema"),
                response: {
                    201: $ref("postResponseSchema"),
                    400: badRequestResponseSchema,
                    401: unauthorizedResponseSchema,
                    422: unprocessableEntityResponseSchema
                }
            }
        },
        createPostHandler
    );

    fastify.get(
        "/",
        {
            schema: {
                tags: ["Post"],
                summary: "Get all posts",
                description: "Get all posts",
                response: {
                    200: {
                        type: "array",
                        items: $ref("postResponseSchema")
                    }
                }
            }
        },
        getPostsHandler
    );

    fastify.get(
        "/:id",
        {
            schema: {
                tags: ["Post"],
                summary: "Get a post",
                description: "Get a post",
                params: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "Post ID"
                        }
                    }
                },
                response: {
                    200: $ref("postResponseSchema"),
                    404: notFoundResponseSchema
                }
            }
        },
        getPostHandler
    );

    fastify.put(
        "/:id",
        {
            preHandler: [authMiddleware],
            schema: {
                tags: ["Post"],
                summary: "Update a post",
                description: "Update a post",
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
                            description: "Post ID"
                        }
                    }
                },
                body: $ref("updatePostInputSchema"),
                response: {
                    200: $ref("postResponseSchema"),
                    400: badRequestResponseSchema,
                    401: unauthorizedResponseSchema,
                    404: notFoundResponseSchema,
                    422: unprocessableEntityResponseSchema
                }
            }
        },
        updatePostHandler
    );

    fastify.delete(
        "/:id",
        {
            preHandler: [authMiddleware],
            schema: {
                tags: ["Post"],
                summary: "Delete a post",
                description: "Delete a post",
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
                            description: "Post ID"
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
        deletePostHandler
    );
};

export { postRoutes };
