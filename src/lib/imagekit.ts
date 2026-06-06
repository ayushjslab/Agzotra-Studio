import ImageKit from "@imagekit/nodejs";

if (
    !process.env.IMAGE_KIT_PRIVATE_KEY ||
    !process.env.IMAGE_KIT_URL_END_POINT
) {
    console.warn(
        "ImageKit environment variables are missing. Uploads will fail."
    );
}

export const imagekit = new ImageKit({
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY ?? "",
});

/**
 * Upload a Buffer to ImageKit and return the public URL.
 * @param fileName  The file name to store (e.g. "thumb_1234.png")
 * @param buffer    Raw PNG/JPEG buffer from Puppeteer
 * @param folder    ImageKit folder path (default: "thumbnails_puppeteer")
 */
export async function uploadToImageKit(
    fileName: string,
    buffer: Buffer | Uint8Array,
    folder = "thumbnails_puppeteer"
): Promise<string> {
    const base64 = Buffer.from(buffer).toString("base64");

    const result = await imagekit.files.upload({
        file: base64,
        fileName,
        folder,
        useUniqueFileName: false,
    });

    // The URL endpoint from env is the base; result.url is the full CDN URL
    return result.url ?? "";
}
