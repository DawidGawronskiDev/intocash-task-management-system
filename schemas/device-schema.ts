import { brands, deviceTypes } from "@/lib/config";
import z from "zod";

const DeviceSchema = z.object({
  type: z.enum([...deviceTypes] as [string, ...string[]]),
  brand: z.enum([...brands] as [string, ...string[]]),
  model: z.string().min(1),
  components: z
    .array(
      z.object({
        type: z.string().min(1, "Required"),
        componentId: z.string().min(1, "Required"),
      })
    )
    .optional(),
  quantity: z.coerce.number().min(1),
  shelf: z.string().optional(),
});

export default DeviceSchema;
