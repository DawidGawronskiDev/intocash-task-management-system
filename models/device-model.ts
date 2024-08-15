import { brands, deviceTypes } from "@/lib/config";
import mongoose, { Schema } from "mongoose";

const DeviceSchema = new Schema({
  type: {
    type: String,
    enum: deviceTypes,
    required: true,
  },
  brand: {
    type: String,
    enum: brands,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  components: [
    { type: mongoose.Types.ObjectId, required: false, ref: "Component" },
  ],
  quantity: {
    type: Number,
    required: true,
  },
});

const DeviceModel =
  mongoose.models.Device || mongoose.model("Device", DeviceSchema);

export default DeviceModel;
