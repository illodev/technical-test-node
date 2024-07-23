import { object, z } from "zod";

export const userImageSchema = z.object({
    id: z.string(),
    filePath: z.string(),
    fileSize: z.number(),
    fileMimeType: z.string(),
    fileOriginalName: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
});

export type UserImage = z.infer<typeof userImageSchema>;

export const createUserImageInputSchema = object({
    file: z.instanceof(File)
});

export type CreateUserImageInput = z.infer<typeof createUserImageInputSchema>;

export const userImageResponseSchema = userImageSchema.strict();

export type UserImageResponse = z.infer<typeof userImageResponseSchema>;

export const userImageArrayResponseSchema = z.array(userImageResponseSchema);

export type UserImageArrayResponse = z.infer<
    typeof userImageArrayResponseSchema
>;
