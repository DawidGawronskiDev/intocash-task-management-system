import mongoose, { InferSchemaType, Schema } from "mongoose";

const PeopleSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

export type Person = InferSchemaType<typeof PeopleSchema> & {
  _id: string;
};

const PeopleModel =
  mongoose.models.People || mongoose.model("People", PeopleSchema);

export default PeopleModel;
