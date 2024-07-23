import { afterAll, describe, expect, test } from "vitest";

import app from "../../app";
import { apiPrefix } from "../../config/api.config";

const userData = {
    id: 1,
    name: "John Doe",
    email: "test@test.com",
    roles: ["ROLE_USER"]
};

const adminData = {
    id: 1,
    name: "John Doe",
    email: "test@test.com",
    roles: ["ROLE_ADMIN"]
};

describe("User routes", () => {
    afterAll(async () => {
        await app.close();
    });

    test("GET /users Unauthorized", async () => {
        const response = await app.inject({
            method: "GET",
            url: apiPrefix + "/users"
        });

        expect(response.statusCode).toBe(401);
    });

    test("GET /users Forbidden", async () => {
        const response = await app.inject({
            method: "GET",
            url: apiPrefix + "/users",
            headers: {
                Authorization: `Bearer ${app.jwt.sign(userData)}`
            }
        });

        expect(response.statusCode).toBe(403);
    });

    test("GET /users OK", async () => {
        const response = await app.inject({
            method: "GET",
            url: apiPrefix + "/users",
            headers: {
                Authorization: `Bearer ${app.jwt.sign(adminData)}`
            }
        });

        expect(response.statusCode).toBe(200);
    });

    test("GET /users/:id Unauthorized", async () => {
        const response = await app.inject({
            method: "GET",
            url: apiPrefix + "/users/1"
        });

        expect(response.statusCode).toBe(401);
    });

    test("GET /users/:id Forbidden", async () => {
        const response = await app.inject({
            method: "GET",
            url: apiPrefix + "/users/1",
            headers: {
                Authorization: `Bearer ${app.jwt.sign(userData)}`
            }
        });

        expect(response.statusCode).toBe(403);
    });

    test("GET /users/:id OK", async () => {
        const response = await app.inject({
            method: "GET",
            url: apiPrefix + "/users/1",
            headers: {
                Authorization: `Bearer ${app.jwt.sign(adminData)}`
            }
        });

        expect(response.statusCode).toBe(200);
    });

    test("POST /users Unauthorized", async () => {
        const response = await app.inject({
            method: "POST",
            url: apiPrefix + "/users",
            payload: {
                email: ""
            }
        });

        expect(response.statusCode).toBe(401);
    });

    test("POST /users Forbidden", async () => {
        const response = await app.inject({
            method: "POST",
            url: apiPrefix + "/users",
            headers: {
                Authorization: `Bearer ${app.jwt.sign(userData)}`
            },
            payload: {
                email: ""
            }
        });

        expect(response.statusCode).toBe(403);
    });

    test("POST /users OK", async () => {
        const response = await app.inject({
            method: "POST",
            url: apiPrefix + "/users",
            headers: {
                Authorization: `Bearer ${app.jwt.sign(adminData)}`
            },
            payload: {
                email: ""
            }
        });

        expect(response.statusCode).toBe(422);
    });

    test("PUT /users/:id Unauthorized", async () => {
        const response = await app.inject({
            method: "PUT",
            url: apiPrefix + "/users/1",
            payload: {
                email: ""
            }
        });

        expect(response.statusCode).toBe(401);
    });

    test("PUT /users/:id Forbidden", async () => {
        const response = await app.inject({
            method: "PUT",
            url: apiPrefix + "/users/1",
            headers: {
                Authorization: `Bearer ${app.jwt.sign(userData)}`
            },
            payload: {
                email: ""
            }
        });

        expect(response.statusCode).toBe(403);
    });

    test("PUT /users/:id OK", async () => {
        const response = await app.inject({
            method: "PUT",
            url: apiPrefix + "/users/1",
            headers: {
                Authorization: `Bearer ${app.jwt.sign(adminData)}`
            },
            payload: {
                email: ""
            }
        });

        expect(response.statusCode).toBe(422);
    });

    test("DELETE /users/:id Unauthorized", async () => {
        const response = await app.inject({
            method: "DELETE",
            url: apiPrefix + "/users/1"
        });

        expect(response.statusCode).toBe(401);
    });

    test("DELETE /users/:id Forbidden", async () => {
        const response = await app.inject({
            method: "DELETE",
            url: apiPrefix + "/users/1",
            headers: {
                Authorization: `Bearer ${app.jwt.sign(userData)}`
            }
        });

        expect(response.statusCode).toBe(403);
    });
});
