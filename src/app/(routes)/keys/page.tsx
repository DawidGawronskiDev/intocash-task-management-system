"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
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

  const { fields, append, remove } = useFieldArray({ control, name: "keys" });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className="space-y-4">
          {fields.map((field, index) => (
            <li key={index} className="flex gap-4">
              <FormField
                name={`keys.${index}.content`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name={`keys.${index}.type`}
                render={({ field }) => (
                  <FormItem className="w-28">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select key type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Windows">Windows</SelectItem>
                        <SelectItem value="Office">Office</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
                className="aspect-square"
              >
                <X />
              </Button>
            </li>
          ))}
        </ul>
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
