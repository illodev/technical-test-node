import { afterAll, describe, expect, test } from "vitest";

import app from "../../app";
import { apiPrefix } from "../../config/api.config";

const userData = {
    id: 1,
    name: "John Doe",
    email: "test@test.com",
    roles: ["ROLE_USER"]
};

const postData = {
    id: 1,
    title: "Title",
    content: "Content",
    userId: 1
};

describe("Post Routes", () => {
    afterAll(async () => {
        await app.close();
    });

    test("GET /posts Unauthorized", async () => {
        const response = await app.inject({
            method: "GET",
            url: apiPrefix + "/posts"
        });

        expect(response.statusCode).toBe(401);
    });

    test("GET /posts Forbidden", async () => {
        const response = await app.inject({
            method: "GET",
            url: apiPrefix + "/posts",
            headers: {
                Authorization: `Bearer ${app.jwt.sign(userData)}`
            }
        });

        expect(response.statusCode).toBe(403);
    });

    test("GET /posts OK", async () => {
        const response = await app.inject({
            method: "GET",
            url: apiPrefix + "/posts",
            headers: {
                Authorization: `Bearer ${app.jwt.sign(userData)}`
            }
        });

        expect(response.statusCode).toBe(200);
    });

    test("GET /posts/:id Unauthorized", async () => {
        const response = await app.inject({
            method: "GET",
            url: apiPrefix + "/posts/1"
        });

        expect(response.statusCode).toBe(401);
    });

    test("GET /posts/:id Forbidden", async () => {
        const response = await app.inject({
            method: "GET",
            url: apiPrefix + "/posts/1",
            headers: {
                Authorization: `Bearer ${app.jwt.sign(userData)}`
            }
        });

        expect(response.statusCode).toBe(403);
    });

    test("GET /posts/:id OK", async () => {
        const response = await app.inject({
            method: "GET",
            url: apiPrefix + "/posts/1",
            headers: {
                Authorization: `Bearer ${app.jwt.sign(userData)}`
            }
        });

        expect(response.statusCode).toBe(200);
    });

    test("POST /posts Unauthorized", async () => {
        const response = await app.inject({
            method: "POST",
            url: apiPrefix + "/posts",
            payload: postData
        });

        expect(response.statusCode).toBe(401);
    });

    test("POST /posts Forbidden", async () => {
        const response = await app.inject({
            method: "POST",
            url: apiPrefix + "/posts",
            headers: {
                Authorization: `Bearer ${app.jwt.sign(userData)}`
            },
            payload: postData
        });

        expect(response.statusCode).toBe(403);
    });

    test("POST /posts OK", async () => {
        const response = await app.inject({
            method: "POST",
            url: apiPrefix + "/posts",
            headers: {
                Authorization: `Bearer ${app.jwt.sign(userData)}`
            },
            payload: postData
        });

        expect(response.statusCode).toBe(422);
    });

    test("PUT /posts/:id Unauthorized", async () => {
        const response = await app.inject({
            method: "PUT",
            url: apiPrefix + "/posts/1",
            payload: postData
        });

        expect(response.statusCode).toBe(401);
    });

    test("PUT /posts/:id Forbidden", async () => {
        const response = await app.inject({
            method: "PUT",
            url: apiPrefix + "/posts/1",
            headers: {
                Authorization: `Bearer ${app.jwt.sign(userData)}`
            },
            payload: postData
        });

        expect(response.statusCode).toBe(403);
    });

    test("PUT /posts/:id OK", async () => {
        const response = await app.inject({
            method: "PUT",
            url: apiPrefix + "/posts/1",
            headers: {
                Authorization: `Bearer ${app.jwt.sign(userData)}`
            },
            payload: postData
        });

        expect(response.statusCode).toBe(422);
    });

    test("DELETE /posts/:id Unauthorized", async () => {
        const response = await app.inject({
            method: "DELETE",
            url: apiPrefix + "/posts/1"
        });

        expect(response.statusCode).toBe(401);
    });

    test("DELETE /posts/:id Forbidden", async () => {
        const response = await app.inject({
            method: "DELETE",
            url: apiPrefix + "/posts/1",
            headers: {
                Authorization: `Bearer ${app.jwt.sign(userData)}`
            }
        });

        expect(response.statusCode).toBe(403);
    });
});
