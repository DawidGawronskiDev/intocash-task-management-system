"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  keys: z.array(
    z.object({
      content: z.string(),
      type: z.enum(["Windows", "Office"]),
    })
  ),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keys: [],
    },
  });

  const { control, handleSubmit } = form;

  const { fields, append } = useFieldArray({ control, name: "keys" });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <FormField
            key={index}
            name={`fields.${index}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key</FormLabel>
                <FormControl>
                  <Input
                    placeholder="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ))}
        <Button
          type="button"
          onClick={() => append({ type: "Windows", content: "" })}
        >
          Add key
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default Page;
