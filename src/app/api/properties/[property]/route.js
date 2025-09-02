import dbConnect from "@/lib/dbConnect";
import { ErrorHandles, SuccessHandles } from "@/lib/server/response";
import { Property } from "@/model/properties";

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { property } = await params;
    console.log("Fetch data.....", property);
    const propertyData = await Property.findById(property);
    console.log("propertyData", propertyData);
    if (!propertyData) {
      return ErrorHandles.NotFound("Property not found");
    }
    return SuccessHandles.Ok(
      "Fetch succesfully property data from db",
      propertyData
    );
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
