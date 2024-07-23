import { FastifyReply } from "fastify";

/**
 * Handle API errors
 *
 * @param error - Error
 * @param reply - Reply
 * @returns FastifyReply
 *
 * @example
 * handleApiError(error, reply);
 */
export const handleApiError = (
    error: unknown,
    reply: FastifyReply
): FastifyReply => {
    if (error instanceof Error) {
        if ("errors" in error) {
            return reply.status(422).send({
                statusCode: 422,
                error: "Unprocessable Entity",
                message: error.message,
                errors: error.errors
            });
        }

        return reply.status(400).send({
            statusCode: 400,
            error: "Bad Request",
            message: error.message
        });
    }

    return reply.status(400).send({
        statusCode: 400,
        error: "Bad Request",
        message: "An error occurred"
    });
};
