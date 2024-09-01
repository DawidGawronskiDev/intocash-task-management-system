import { keyFor, keyStatues } from "@/lib/config";
import mongoose, { InferSchemaType } from "mongoose";

const KeySchema = new mongoose.Schema(
  {
    for: {
      type: String,
      enum: keyFor,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: keyStatues,
      required: true,
    },
  },
  { timestamps: true }
);

type Key = InferSchemaType<typeof KeySchema> & {
  _id: string;
};

const KeyModel = mongoose.models.Key || mongoose.model("Key", KeySchema);

export default KeyModel;
export type { Key };
