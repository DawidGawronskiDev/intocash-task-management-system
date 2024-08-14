"use client";

import {
  componentTypes,
  componentTypesWithSize,
  deviceTypes,
} from "@/lib/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";

const FormSchema = z
  .object({
    type: z.enum(componentTypes as [string, ...string[]]),
    name: z.string().optional(),
    size: z.coerce.number().optional(),
    forDevice: z.enum(deviceTypes as [string, ...string[]]),
  })
  .refine((data) => componentTypesWithSize.includes(data.type) === true, {
    message: "Name is required",
    path: ["name"],
  })
  .refine((data) => componentTypesWithSize.includes(data.type) === false, {
    message: "Size is required",
    path: ["size"],
  });

const FormCreate = () => {
  const methods = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "",
      name: "",
      size: undefined,
      forDevice: "Laptop",
    },
  });

  const { control, handleSubmit } = methods;

  const onSubmit = (values: z.infer<typeof FormSchema>) => {};

  return (
    <Form {...methods}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default FormCreate;
