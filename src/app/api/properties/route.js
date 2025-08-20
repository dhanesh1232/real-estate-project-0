import dbConnect from "@/lib/dbConnect";
import { ErrorHandles, SuccessHandles } from "@/lib/server/response";

export async function POST() {
  await dbConnect();
  try {
    console.log("Successs");
    return SuccessHandles.Ok();
  } catch (err) {
    return ErrorHandles.InternalServer(err);
  }
}

export async function GET() {
  await dbConnect();
  try {
    console.log("Fetch data.....");
    return SuccessHandles.Ok();
  } catch (err) {
    return ErrorHandles.InternalServer(err);
  }
}
