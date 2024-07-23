import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyWebsocket from "@fastify/websocket";
import Fastify from "fastify";

import { apiPrefix } from "./config/api.config";
import { swaggerOptions, swaggerUiOptions } from "./config/swagger.config";
import { authRoutes } from "./routes/auth.routes";
import { postRoutes } from "./routes/post.routes";
import { userImageRoutes } from "./routes/user-image.routes";
import { userRoutes } from "./routes/user.routes";

const app = Fastify({
    logger: true
});

//
// # Plugins
// -----------------------------------------------------------------------------

app.register(fastifyJwt, {
    secret: "some-secret",
    cookie: {
        cookieName: "accessToken",
        signed: false
    }
});

app.register(fastifyCookie, {
    secret: "some-secret-key",
    hook: "preHandler"
});

app.register(cors, {
    origin: "*",
    credentials: true
});

app.register(fastifyWebsocket);
app.register(multipart);

app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUiOptions);

//
// # Graceful shutdown
// -----------------------------------------------------------------------------

const listeners = ["SIGINT", "SIGTERM"];

listeners.forEach((signal) => {
    process.on(signal, async () => {
        await app.close();
        process.exit(0);
    });
});

//
// # API Routes
// -----------------------------------------------------------------------------

app.register(authRoutes, { prefix: `${apiPrefix}/auth` });
app.register(userRoutes, { prefix: `${apiPrefix}/users` });
app.register(postRoutes, { prefix: `${apiPrefix}/posts` });
app.register(userImageRoutes, { prefix: `${apiPrefix}/user-images` });

//
// # Websocket
// -----------------------------------------------------------------------------

app.register(async function (fastify) {
    fastify.get("/ws", { websocket: true }, (socket, req) => {
        socket.on("error", (error) => {
            console.error("Error in socket connection:", error);
        });

        socket.on("close", () => {
            console.log("Client disconnected");
        });

        socket.on("message", (message) => {
            console.log("Received message:", message);
            socket.send(`You sent: ${message}`);
        });

        socket.send("Hello, client!");
    });
});

//
// # Health Check
// -----------------------------------------------------------------------------

app.get(
    `${apiPrefix}/health`,
    {
        schema: {
            tags: ["Health"],
            summary: "Health check",
            description: "Health check",
            $id: "health",
            type: "object",
            response: {
                200: {
                    type: "object",
                    properties: {
                        status: { type: "string" }
                    }
                }
            }
        }
    },
    async () => {
        return { status: "ok" };
    }
);

export default app;
