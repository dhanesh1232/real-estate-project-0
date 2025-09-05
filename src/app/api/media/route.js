import { imagekit } from "@/lib/server/image-kit";
import { ErrorHandles, SuccessHandles } from "@/lib/server/response";

export async function GET(req) {
  try {
    const files = await imagekit.listFiles({
      limit: 100,
      skip: 0,
      path: "/dhamu",
    });

    return SuccessHandles.Ok("Fetched Images", files); // Return files data in success response
  } catch (err) {
    console.error("ImageKit listFiles error:", err);
    return ErrorHandles.InternalServer();
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");

    if (!files || files.length === 0) {
      return Response.json({ error: "No files provided" }, { status: 400 });
    }

    const uploadedFiles = [];

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const ext = file.name?.split(".").pop() || "";
      const fileName = file.name || `upload_${Date.now()}.${ext}`;

      const result = await imagekit.upload({
        file: buffer,
        fileName,
        useUniqueFileName: true, // prevents overwrites
        folder: "dhamu", // optional: keep things organized
      });

      uploadedFiles.push(result);
    }

    return SuccessHandles.Created("Uploaded successfully", uploadedFiles);
  } catch (err) {
    console.error("Upload failed:", err);
    return ErrorHandles.InternalServer();
  }
}
