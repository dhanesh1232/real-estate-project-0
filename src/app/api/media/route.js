import { imagekit } from "@/lib/server/image-kit";
import { ErrorHandles, SuccessHandles } from "@/lib/server/response";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    let files;
    if (search) {
      // Use proper searchQuery syntax for filtering files by name or tags
      files = await imagekit.listFiles({
        limit: 10,
        skip: 0,
        searchQuery: `name LIKE "${search}*" OR tags IN ["${search}"]`,
      });
    } else {
      files = await imagekit.listFiles({ limit: 10, skip: 0 });
    }

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

      // keep original extension
      const fileName = file.name || "upload_" + Date.now();

      const result = await imagekit.upload({
        file: buffer,
        fileName,
      });

      uploadedFiles.push(result);
    }

    return SuccessHandles.Created("Uploaded successfully", uploadedFiles);
  } catch (err) {
    console.error("Upload failed:", err);
    return ErrorHandles.InternalServer();
  }
}
