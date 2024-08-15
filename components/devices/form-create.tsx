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
import { Button } from "../ui/button";

const DeviceSchema = z.object({
  type: z.enum([...deviceTypes] as [string, ...string[]]),
  brand: z.enum([...brands] as [string, ...string[]]),
  model: z.string().min(1),
  components: z.array(z.string()).optional(),
  quantity: z.coerce.number().min(1),
});

const FormCreate = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["components"],
    queryFn: getComponents,
  });

  console.log(data);

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
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { fields, append } = useFieldArray({ control, name: "components" });

  const onSubmit = (values: z.infer<typeof DeviceSchema>) => {
    console.log(onSubmit);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Form {...methods}>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
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
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            name={"components" + index}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Component</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a component" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data!.map((component) => (
                      <SelectItem
                        key={component._id as string}
                        value={component._id as string}
                      >
                        {(component.size as number) ||
                          (component.name as string)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="button" onClick={() => append(undefined)}>
          Add Component
        </Button>
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
