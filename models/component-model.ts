import { componentsWithSize, componentTypes, deviceTypes } from "@/lib/config";
import mongoose, { Schema } from "mongoose";

const ComponentSchema = new Schema({
  type: {
    type: String,
    enum: componentTypes,
    required: true,
  },
  size: {
    type: Number,
    required: function (this: any) {
      return componentsWithSize.includes(this.type) === true;
    },
  },
  name: {
    type: String,
    required: function (this: any) {
      return componentsWithSize.includes(this.type) !== true;
    },
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

const ComponentModel =
  mongoose.models.Component || mongoose.model("Component", ComponentSchema);

export default ComponentModel;
