import { componentTypes, deviceTypes } from "@/lib/config";
import z from "zod";

const ComponentSchema = z.object({
  type: z.enum(componentTypes as [string, ...string[]]),
  name: z.string().optional(),
  size: z.coerce.number().optional(),
  forDevice: z.enum(deviceTypes as [string, ...string[]]),
  quantity: z.coerce.number().min(1),
});

export default ComponentSchema;
