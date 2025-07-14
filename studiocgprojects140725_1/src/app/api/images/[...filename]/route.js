import fs from "fs";
import path from "path";
import mime from "mime";

export async function GET(req, { params }) {
    try {
        const fileSegments = params.filename || [];

        const relativePath = fileSegments.join(path.sep);

        const basePath = path.resolve(process.env.R3_PATH);
        const imagePath = path.resolve(basePath, relativePath);

        console.log("Request for:", fileSegments);
        console.log("Resolved full path:", imagePath);

        if (!imagePath.startsWith(basePath)) {
            return new Response("Forbidden", { status: 403 });
        }

        if (!fs.existsSync(imagePath)) {
            return new Response("Not found", { status: 404 });
        }

        const fileBuffer = fs.readFileSync(imagePath);
        const mimeType = mime.getType(imagePath) || "application/octet-stream";

        return new Response(fileBuffer, {
            status: 200,
            headers: {
                "Content-Type": mimeType,
            },
        });
    } catch (e) {
        console.error(e);
        return new Response("Server error", { status: 500 });
    }
}
