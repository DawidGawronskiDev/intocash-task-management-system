import z from "zod";
import KeySchema from "./key-schema";

const KeysSchema = z.object({
  keys: z.array(KeySchema),
});

export default KeysSchema;
