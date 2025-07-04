"use client";

import {
  componentTypes,
  componentTypesWithSize,
  deviceTypes,
} from "@/lib/config";
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
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ButtonSubmit from "../shared/button-submit";
import ComponentSchema from "@/schemas/component-schema";
import axios from "axios";
import { useToast } from "../ui/use-toast";

const FormCreate = () => {
  const { toast } = useToast();

  const methods = useForm<z.infer<typeof ComponentSchema>>({
    resolver: zodResolver(ComponentSchema),
    defaultValues: {
      type: undefined,
      name: "",
      size: 0,
      forDevice: undefined,
      quantity: 0,
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const watchType = watch("type");

  const onSubmit = async (values: z.infer<typeof ComponentSchema>) => {
    console.log(values);
    const request = await axios
      .post("/api/components", values)
      .then((response) => {
        toast({
          title: "Success",
          description: "Component created successfully",
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create component",
        });
      });
  };

  return (
    <Form {...methods}>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-8 max-w-xl mx-auto p-4 w-full"
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
                    <SelectValue placeholder="Selet a component type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {componentTypes.map((component) => (
                    <SelectItem value={component} key={component}>
                      {component}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {componentTypesWithSize.includes(watchType) && (
          <FormField
            control={control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Describe size in GBs (4GB is equal to 4 and 1TB is equal to
                  1024)
                </FormDescription>
              </FormItem>
            )}
          />
        )}
        {!componentTypesWithSize.includes(watchType) && watchType && (
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="string" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={control}
          name="forDevice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>For Device</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a device that this component fits" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {deviceTypes.map((device) => (
                    <SelectItem value={device} key={device}>
                      {device}
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
        <ButtonSubmit isSubmitting={isSubmitting}>
          Create Component
        </ButtonSubmit>
      </form>
    </Form>
  );
};

export default FormCreate;
