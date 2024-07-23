import { deleteFile, saveFile } from "@/utilities/src/file";
import { prisma } from "@monorepo/database/prisma";
import { CreateUserImageInput } from "@monorepo/schemas/user-image.schema";

const userImageSelect = {
    id: true,
    filePath: true,
    fileSize: true,
    fileMimeType: true,
    fileOriginalName: true,
    fileDimensions: true,
    createdAt: true,
    updatedAt: true
};

export const userImageService = {
    async createUserImage(data: CreateUserImageInput) {
        const { file } = data;

        const result = await saveFile(file);

        return prisma.userImage.create({
            data: result,
            select: userImageSelect
        });
    },
    async deleteUserImage(id: string) {
        const userImage = await prisma.userImage.findUnique({
            where: { id }
        });

        if (!userImage) {
            throw new Error("User image not found");
        }

        await deleteFile(userImage.filePath);

        return prisma.userImage.delete({
            where: { id }
        });
    }
};
