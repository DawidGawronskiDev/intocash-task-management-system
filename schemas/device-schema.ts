import {
  brands,
  deviceConditions,
  deviceTypes,
  operatingSystems,
} from "@/lib/config";
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
  os: z.enum([...operatingSystems] as [string, ...string[]]),
  drivers: z.boolean(),
  office: z.boolean(),
  activation: z.boolean(),
  condition: z.enum([...deviceConditions] as [string, ...string[]]),
  quantity: z.coerce.number().min(1),
  shelf: z.string().optional(),
});

export default DeviceSchema;
