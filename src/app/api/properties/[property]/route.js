import dbConnect from "@/lib/dbConnect";
import { ErrorHandles, SuccessHandles } from "@/lib/server/response";

export async function GET() {
  await dbConnect();
  try {
    console.log("Fetch data.....");
    return SuccessHandles.Ok();
  } catch (err) {
    return ErrorHandles.InternalServer(err);
  }
}

export async function PUT() {
  await dbConnect();
  try {
    console.log("Fetch data.....");
    return SuccessHandles.Ok();
  } catch (err) {
    return ErrorHandles.InternalServer(err);
  }
}

export async function DELETE() {
  await dbConnect();
  try {
    console.log("Fetch data.....");
    return SuccessHandles.Ok();
  } catch (err) {
    return ErrorHandles.InternalServer(err);
  }
}
