import mongoose from "mongoose";

const propertiesSchema = new mongoose.Schema({});

export const Properties =
  mongoose.models.Properties || mongoose.model("Properties", propertiesSchema);
