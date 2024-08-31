import { componentTypes, deviceTypes } from "@/lib/config";
import mongoose, { InferSchemaType, Schema } from "mongoose";

const ComponentSchema = new Schema({
  type: {
    type: String,
    enum: componentTypes,
    required: true,
  },
  size: {
    type: Number,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  forDevice: {
    type: String,
    enum: deviceTypes,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

type Component = InferSchemaType<typeof ComponentSchema> & {
  _id: string;
};

const ComponentModel =
  mongoose.models.Component || mongoose.model("Component", ComponentSchema);

export default ComponentModel;
export type { Component };
