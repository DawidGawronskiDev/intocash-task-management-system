import { operatingSystems } from "@/lib/config";
import z from "zod";

const TaskSchema = z.object({
  device: z.string().min(1),
  components: z
    .array(
      z.object({
        type: z.string().min(1, "Required"),
        componentId: z.string().min(1, "Required"),
      })
    )
    .optional(),
  os: z.enum([...operatingSystems] as [string, ...string[]]),
  drivers: z.boolean(),
  office: z.boolean(),
  activation: z.boolean(),
  quantity: z.coerce.number().min(1),
  status: z.string().min(1),
});

export default TaskSchema;
