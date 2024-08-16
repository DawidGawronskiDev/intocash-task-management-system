"use client";

import { brands, deviceTypes } from "@/lib/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import SelectComponents from "../shared/select-components";
import DeviceSchema from "@/schemas/device-schema";
import { Input } from "../ui/input";
import { Component } from "@/types";
import axios from "axios";
import { useToast } from "../ui/use-toast";

type FormProps = {
  data: Component[];
};

const FormCreate = ({ data }: FormProps) => {
  const { toast } = useToast();

  const methods = useForm<z.infer<typeof DeviceSchema>>({
    resolver: zodResolver(DeviceSchema),
    defaultValues: {
      type: undefined,
      brand: undefined,
      model: "",
      components: [],
      quantity: 1,
      shelf: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values: z.infer<typeof DeviceSchema>) => {
    await axios
      .post("/api/devices/", values)
      .then(() => {
        toast({
          title: "Success",
          description: <code>{JSON.stringify(values, null, 2)}</code>,
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: <p>Failed to create device</p>,
        });
      });
  };

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
              <FormLabel>Type*</FormLabel>
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
              <FormLabel>Brand*</FormLabel>
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
              <FormLabel>Model*</FormLabel>
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
              <FormLabel>Quantity*</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="shelf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shelf</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Shelf" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <ButtonSubmit isSubmitting={isSubmitting}>Create Device</ButtonSubmit>
      </form>
    </Form>
  );
};

export default FormCreate;
