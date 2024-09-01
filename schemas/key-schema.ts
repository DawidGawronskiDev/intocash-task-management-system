import { keyFor, keyStatues } from "@/lib/config";
import z from "zod";

const KeySchema = z.object({
  for: z.enum([...keyFor] as [string, ...string[]]),
  content: z.string(),
  status: z.enum([...keyStatues] as [string, ...string[]]),
});

export default KeySchema;
