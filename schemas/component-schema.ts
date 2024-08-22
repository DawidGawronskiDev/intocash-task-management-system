import { componentTypes, deviceTypes } from "@/lib/config";
import { hasSize } from "@/lib/utils";
import z from "zod";

const ComponentSchema = z
  .object({
    type: z.enum(componentTypes as [string, ...string[]]),
    name: z.string().optional(),
    size: z.coerce.number().optional(),
    forDevice: z.enum(deviceTypes as [string, ...string[]]),
    quantity: z.coerce.number().min(1),
  })
  .refine(
    (data) => {
      if (hasSize(data.type) && (data.size === undefined || data.size <= 0)) {
        return false;
      }
      return true;
    },
    {
      message: "Size must be greater than 0",
      path: ["size"],
    }
  )
  .refine(
    (data) => {
      if (!hasSize(data.type) && (!data.name || data.name.length === 0)) {
        return false;
      }
      return true;
    },
    {
      message: "Name must be at least 1 character long",
      path: ["name"],
    }
  );

export default ComponentSchema;
