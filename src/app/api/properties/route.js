// app/api/properties/route.js
import dbConnect from "@/lib/dbConnect";
import { Property } from "@/model/properties";
import { SuccessHandles, ErrorHandles } from "@/lib/server/response";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();

    // Transform incoming data to match schema
    const transformed = {
      ...body,
      // Location
      location: body.locationData || {},
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

    delete transformed.locationData; // remove duplicate

    // Create property
    const property = await Property.create(transformed);

    return SuccessHandles.Created("Property created successfully", property);
  } catch (err) {
    console.error("Property Create Error:", err);
    return ErrorHandles.InternalServer(err.message);
  }
}

export async function GET() {
  await dbConnect();
  try {
    const properties = await Property.find();
    return SuccessHandles.Ok("Fetch properties successfully", properties);
  } catch (err) {
    return ErrorHandles.InternalServer(err);
  }
}
