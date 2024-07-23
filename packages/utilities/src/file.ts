import fs from "fs/promises";

const uploadFolder = "uploads";

type SaveFileResponse = {
    filePath: string;
    fileSize: number;
    fileMimeType: string;
    fileOriginalName: string;
};

const generateName = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const generateRandomString = (length: number) => {
        let result = "";
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    };

    return `${day}${month}${year}-${hours}${minutes}-${generateRandomString(10)}`;
};

const saveFile = async (content: File): Promise<SaveFileResponse> => {
    const extension = content.name.split(".").pop();
    const fileMimeType = content.type;
    const fileSize = content.size;
    const filePath = `${uploadFolder}/${generateName()}${extension ? `.${extension}` : ""}`;
    const fileOriginalName = content.name;

    await fs
        .writeFile(filePath, Buffer.from(await content.arrayBuffer()))
        .catch((error) => {
            throw new Error(`Error saving file: ${error}`);
        });

    return {
        filePath,
        fileSize,
        fileMimeType,
        fileOriginalName
    };
};

const deleteFile = async (filePath: string) => {
    await fs.unlink(filePath).catch((error) => {
        throw new Error(`Error deleting file: ${error}`);
    });
};

const getFile = async (filePath: string) => {
    return fs.readFile(filePath);
};

export { deleteFile, getFile, saveFile };
