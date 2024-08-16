"use client";

import { brands, deviceTypes } from "@/lib/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ButtonSubmit from "../shared/button-submit";
import { Input } from "../ui/input";
import { useQuery } from "@tanstack/react-query";
import { getComponents } from "@/lib/http";
import Loading from "../shared/loading";
import SelectComponents from "../shared/select-components";

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
});

const FormCreate = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["components"],
    queryFn: getComponents,
  });

  const methods = useForm<z.infer<typeof DeviceSchema>>({
    resolver: zodResolver(DeviceSchema),
    defaultValues: {
      type: undefined,
      brand: undefined,
      model: "",
      components: [],
      quantity: 1,
    },
  });

  const {
    getValues,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  console.log(getValues().components);

  const onSubmit = (values: z.infer<typeof DeviceSchema>) => {
    console.log(values);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Form {...methods}>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-8 w-full p-4 max-w-2xl"
      >
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a device type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {deviceTypes.map((deviceType) => (
                    <SelectItem key={deviceType} value={deviceType}>
                      {deviceType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a device type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription>
                Model field is not case sensitive
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SelectComponents data={data} />

        <FormField
          control={control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <ButtonSubmit isSubmitting={isSubmitting}>Create Device</ButtonSubmit>
      </form>
    </Form>
  );
};

export default FormCreate;
