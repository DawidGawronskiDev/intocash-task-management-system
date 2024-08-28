import { taskStatuses } from "@/lib/config";
import mongoose, { Schema, InferSchemaType } from "mongoose";

const TaskSchema = new Schema(
  {
    device: {
      type: mongoose.Types.ObjectId,
      ref: "Device",
      required: true,
    },
    components: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Component",
        required: true,
      },
    ],
    os: {
      type: String,
      required: true,
    },
    drivers: {
      type: Boolean,
      required: true,
    },
    office: {
      type: Boolean,
      required: true,
    },
    activation: {
      type: Boolean,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: taskStatuses,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

type Task = InferSchemaType<typeof TaskSchema> & {
  _id: string;
};

const TaskModel = mongoose.models.Task || mongoose.model("Task", TaskSchema);

export default TaskModel;
export type { Task };
