import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { buildJsonSchemas } from "fastify-zod";

import {
    loginHandler,
    logoutHandler,
    registerHandler
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth-middleware";

import {
    loginInputSchema,
    loginResponseSchema,
    logoutResponseSchema,
    registerInputSchema,
    registerResponseSchema
} from "@monorepo/schemas/auth.schema";

const authRoutes: FastifyPluginAsync = async (
    fastify: FastifyInstance
): Promise<void> => {
    const { schemas: postSchemas, $ref } = buildJsonSchemas(
        {
            loginInputSchema,
            registerInputSchema,
            loginResponseSchema,
            registerResponseSchema,
            logoutResponseSchema
        },
        {
            $id: "auth",
            target: "openApi3"
        }
    );

    // Add schemas to Fastify instance
    for (let authSchema of [...postSchemas]) {
        fastify.addSchema(authSchema);
    }

    fastify.post(
        "/register",
        {
            schema: {
                tags: ["Auth"],
                summary: "Register a new user",
                description: "Register a new user",
                body: $ref("registerInputSchema"),
                response: {
                    201: $ref("registerResponseSchema")
                }
            }
        },
        registerHandler
    );

    fastify.post(
        "/login",
        {
            schema: {
                tags: ["Auth"],
                summary: "Login",
                description: "Login",
                body: $ref("loginInputSchema"),
                response: {
                    200: $ref("loginResponseSchema")
                }
            }
        },
        loginHandler
    );
    fastify.post(
        "/logout",
        {
            preHandler: [authMiddleware],
            schema: {
                tags: ["Auth"],
                summary: "Logout",
                description: "Logout",
                security: [
                    {
                        Bearer: []
                    }
                ],
                response: {
                    200: $ref("logoutResponseSchema")
                }
            }
        },
        logoutHandler
    );

    fastify.log.info("Auth routes registered");
};

export { authRoutes };
