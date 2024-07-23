import { UserResponse } from "@monorepo/schemas/user.schema";
import { FastifyReply, FastifyRequest } from "fastify";

declare module "fastify" {
    interface FastifyContextConfig {
        allowedRoles?: string[];
    }
}

declare module "@fastify/jwt" {
    interface FastifyJWT {
        user: UserResponse;
    }
}

/**
 * Middleware for authentication.
 * Verifies the JWT token in the request and checks if the user has the required roles to access the resource.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A Promise that resolves to void.
 */
const authMiddleware = async (
    request: FastifyRequest,
    reply: FastifyReply
): Promise<void> => {
    try {
        await request.jwtVerify();

        const allowedRoles = request.routeOptions.config.allowedRoles;

        if (allowedRoles && allowedRoles.length > 0) {
            const user = request.user;

            if (
                allowedRoles &&
                !user.roles.some((role) => allowedRoles?.includes(role))
            ) {
                return reply.code(403).send({
                    statusCode: 403,
                    error: "Forbidden",
                    message:
                        "You do not have permission to access this resource."
                });
            }
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            return reply.code(401).send({
                statusCode: 401,
                error: "Unauthorized",
                message: "You need to be logged in to access this resource."
            });
        }

        return reply.code(401).send({
            statusCode: 401,
            error: "Unauthorized",
            message: "You need to be logged in to access this resource."
        });
    }
};

export { authMiddleware };
