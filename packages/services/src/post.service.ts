import { prisma } from "@monorepo/database/prisma";
import {
    CreatePostInput,
    UpdatePostInput
} from "@monorepo/schemas/post.schema";

const postSelect = {
    id: true,
    title: true,
    content: true,
    published: true,
    authorId: true,
    createdAt: true,
    updatedAt: true
};

export const postService = {
    async findAllPosts() {
        return prisma.post.findMany({
            select: postSelect
        });
    },
    async findPostById(id: string) {
        return prisma.post.findUnique({
            where: { id },
            select: postSelect
        });
    },
    async createPost(data: CreatePostInput) {
        const { authorId, ...rest } = data;

        return prisma.post.create({
            data: {
                ...rest,
                author: {
                    connect: { id: authorId }
                }
            },
            select: postSelect
        });
    },
    async updatePost(id: string, data: UpdatePostInput) {
        return prisma.post.update({
            where: { id },
            data,
            select: postSelect
        });
    },
    async deletePost(id: string) {
        return prisma.post.delete({
            where: { id }
        });
    }
};
