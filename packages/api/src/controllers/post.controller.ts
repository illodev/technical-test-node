import { FastifyReply, FastifyRequest } from "fastify";

import {
    createPostInputSchema,
    PostResponse,
    updatePostInputSchema
} from "@monorepo/schemas/post.schema";
import { postService } from "@monorepo/services/post.service";
import { handleApiError } from "../utils/response.util";

/**
 * Create a new post
 *
 * @param req - Request
 * @param reply - Reply
 * @returns PostResponse
 *
 * @example
 * createPostHandler(req, reply);
 */
const createPostHandler = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<PostResponse> => {
    try {
        const postData = createPostInputSchema.parse(req.body);
        const post = await postService.createPost(postData);

        return reply.status(201).send(post);
    } catch (error: unknown) {
        return handleApiError(error, reply);
    }
};

/**
 * Get all posts
 *
 * @param req - Request
 * @param reply - Reply
 * @returns PostResponse[]
 *
 * @example
 * getPostsHandler(req, reply);
 */
const getPostsHandler = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<PostResponse[]> => {
    try {
        const posts = await postService.findAllPosts();

        return reply.status(200).send(posts);
    } catch (error: unknown) {
        return handleApiError(error, reply);
    }
};

/**
 * Get a post by ID
 *
 * @param req - Request
 * @param reply - Reply
 * @returns PostResponse
 *
 * @example
 * getPostHandler(req, reply);
 */
const getPostHandler = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<PostResponse> => {
    try {
        const { id } = req.params as { id: string };

        const post = await postService.findPostById(id);

        if (!post) {
            return reply.status(404).send("Post not found");
        }

        return reply.status(200).send(post);
    } catch (error: unknown) {
        return handleApiError(error, reply);
    }
};

/**
 * Update a post
 *
 * @param req - Request
 * @param reply - Reply
 * @returns PostResponse
 *
 * @example
 * updatePostHandler(req, reply);
 */
const updatePostHandler = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<PostResponse> => {
    try {
        const { id } = req.params as { id: string };

        const postData = updatePostInputSchema.parse(req.body);
        const post = await postService.updatePost(id, postData);

        return reply.status(200).send(post);
    } catch (error: unknown) {
        return handleApiError(error, reply);
    }
};

/**
 * Delete a post
 *
 * @param req - Request
 * @param reply - Reply
 * @returns PostResponse
 *
 * @example
 * deletePostHandler(req, reply);
 */
const deletePostHandler = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<void> => {
    try {
        const { id } = req.params as { id: string };

        await postService.deletePost(id);

        return reply.status(204).send();
    } catch (error: unknown) {
        return handleApiError(error, reply);
    }
};

export {
    createPostHandler,
    deletePostHandler,
    getPostHandler,
    getPostsHandler,
    updatePostHandler
};
