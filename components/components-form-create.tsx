"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Optional } from "./ui/optional";

const compontentTypes = [
  "RAM",
  "SSD",
  "HDD",
  "CPU",
  "GPU",
  "Motherboard",
  "Extension Card",
  "CPU Fan",
  "Power Supply",
  "Cable",
  "Case",
];

const componentDevices = ["Laptop", "Desktop"];

const formSchema = z.object({
  type: z.enum([...compontentTypes] as [string, ...string[]]),
  name: z.string().min(1).max(255),
  location: z.string().max(255).optional(),
  quantity: z.coerce.number(),
  for_device: z.enum([...componentDevices] as [string, ...string[]]),
  description: z.string().optional(),
});

const ComponentsFormCreate = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "RAM",
      name: "",
      location: "",
      quantity: 0,
      for_device: "Laptop",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    const res = await fetch("http://localhost:3000/api/v1/components", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a component type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {compontentTypes.map((type, index) => (
                    <SelectItem key={index} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Component name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Location <Optional />
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Component location"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Component quantity"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="for_device"
          render={({ field }) => (
            <FormItem>
              <FormLabel>For Device</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a component device" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {componentDevices.map((device, index) => (
                    <SelectItem key={index} value={device}>
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
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description <Optional />
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Component description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting}>Submit</Button>
      </form>
    </Form>
  );
};

export default ComponentsFormCreate;
