import { z } from "zod";

export const postSchema = z.object({
    id: z.string(),
    title: z.string().min(1),
    content: z.string().min(1),
    published: z.boolean(),
    authorId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
});

export type Post = z.infer<typeof postSchema>;

export const createPostInputSchema = postSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
});

export type CreatePostInput = z.infer<typeof createPostInputSchema>;

export const updatePostInputSchema = postSchema.partial().omit({
    id: true,
    createdAt: true,
    updatedAt: true
});

export type UpdatePostInput = z.infer<typeof updatePostInputSchema>;

export const postResponseSchema = postSchema;

export type PostResponse = z.infer<typeof postResponseSchema>;

export const postArrayResponseSchema = z.array(postResponseSchema);

export type PostArrayResponse = z.infer<typeof postArrayResponseSchema>;
