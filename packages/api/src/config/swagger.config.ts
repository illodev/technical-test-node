import { SwaggerOptions } from "@fastify/swagger";
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";

export const swaggerOptions: SwaggerOptions = {
    swagger: {
        info: {
            title: "Technical Test: Node.js Developer with TypeScript, Fastify, Prisma, and Monorepo",
            description:
                "Technical Test: Node.js Developer with TypeScript, Fastify, Prisma, and Monorepo",
            version: "1.0.0"
        },
        securityDefinitions: {
            Bearer: {
                type: "apiKey",
                name: "Authorization",
                in: "header"
            }
        },
        host: "technical-test-node.illodev.com",
        schemes: ["https"],
        consumes: ["application/json"],
        produces: ["application/json"]
    }
};

export const swaggerUiOptions: FastifySwaggerUiOptions = {
    routePrefix: "/docs",
    uiConfig: {
        withCredentials: true,
        persistAuthorization: true
    }
};

export const badRequestResponseSchema = {
    $id: "badRequestResponse",
    type: "object",
    summary: "Invalid input",
    description: "Invalid input",
    properties: {
        statusCode: { type: "number" },
        error: { type: "string" },
        message: { type: "string" }
    }
};

export const unauthorizedResponseSchema = {
    $id: "unauthorizedResponse",
    type: "object",
    summary: "Unauthorized",
    description: "Unauthorized",
    properties: {
        statusCode: { type: "number" },
        error: { type: "string" },
        message: { type: "string" }
    }
};

export const forbiddenResponseSchema = {
    $id: "forbiddenResponse",
    type: "object",
    summary: "Forbidden",
    description: "Forbidden",
    properties: {
        statusCode: { type: "number" },
        error: { type: "string" },
        message: { type: "string" }
    }
};

export const notFoundResponseSchema = {
    $id: "notFoundResponse",
    type: "object",
    summary: "Resource not found",
    description: "Resource not found",
    properties: {
        statusCode: { type: "number" },
        error: { type: "string" },
        message: { type: "string" }
    }
};

export const unprocessableEntityResponseSchema = {
    $id: "unprocessableEntityResponse",
    type: "object",
    summary: "Unprocessable Entity",
    description: "Unprocessable Entity",
    properties: {
        statusCode: { type: "number" },
        error: { type: "string" },
        message: { type: "string" },
        errors: { type: "object" }
    }
};

export const internalServerErrorResponseSchema = {
    $id: "internalServerErrorResponse",
    type: "object",
    summary: "Internal Server Error",
    description: "Internal Server Error",
    properties: {
        statusCode: { type: "number" },
        error: { type: "string" },
        message: { type: "string" }
    }
};
