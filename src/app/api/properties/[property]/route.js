import dbConnect from "@/lib/dbConnect";
import { ErrorHandles, SuccessHandles } from "@/lib/server/response";
import { Property } from "@/model/properties";

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { property } = await params;
    const propertyData = await Property.findById(property);
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

export async function PUT(req, { params }) {
  await dbConnect();
  try {
    const { property } = await params;
    const body = await req.json();
    // Transform incoming data to match schema
    const transformed = {
      ...body,
      // Location
      location: body.locationsData || {},
      // Ensure yearBuilt is just a number
      yearBuilt: body.yearBuilt
        ? new Date(body.yearBuilt).getFullYear()
        : undefined,
      // Normalize enum values
      facing: body.facing
        ? body.facing.charAt(0).toUpperCase() +
          body.facing.slice(1).toLowerCase()
        : undefined,
      furnishing: body.furnishing,
      waterSupply: body.waterSupply
        ? body.waterSupply.charAt(0).toUpperCase() +
          body.waterSupply.slice(1).toLowerCase()
        : undefined,
    };

    delete transformed.locationsData; // remove duplicate

    // Update property in DB
    const propertyData = await Property.findByIdAndUpdate(
      property,
      transformed,
      { new: true }
    );
    if (!propertyData) {
      return ErrorHandles.NotFound("Property not found");
    }
    return SuccessHandles.Ok("Property updated successfully");
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
