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
import { Textarea } from "@/components/ui/textarea";
import { insertLicenses } from "@/db/queries";
import { getKeys } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  licenses: z.array(
    z.object({ key: z.string(), type: z.enum(["Windows", "Office"]) })
  ),
});

const LicensesPage = () => {
  return (
    <div>
      <LicensesFormCreate />
    </div>
  );
};

const LicensesFormCreate = () => {
  const [s, setS] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licenses: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "licenses",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // await insertLicenses(values.licenses);
  };

  const handleSChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setS(e.target.value);
  };

  const handlePopulateKeys = () => {
    const keys = getKeys(s);

    if (keys.length) {
      keys.forEach((key) => append(key));
      setS("");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-screen-md mx-auto p-8"
      >
        <div className="space-y-4">
          <Textarea
            placeholder="Put your keys here"
            value={s}
            onChange={handleSChange}
          />
          <Button
            type="button"
            variant="secondary"
            onClick={handlePopulateKeys}
            className="w-full"
          >
            Populate Keys
          </Button>
        </div>
        <div className="space-y-4">
          <ul className="space-y-4">
            {fields.length ? (
              fields.map((field, index) => (
                <li key={field.id} className="flex gap-4">
                  <FormField
                    control={form.control}
                    name={`licenses.${index}.key`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`licenses.${index}.type`}
                    render={({ field }) => (
                      <FormItem className="w-28">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select license type" />
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
                    variant="destructive"
                    type="button"
                    onClick={() => remove(index)}
                    className="aspect-square w-9 h-9"
                  >
                    <X />
                  </Button>
                </li>
              ))
            ) : (
              <p className="text-destructive">No keys added</p>
            )}
          </ul>
          <Button
            type="button"
            variant="secondary"
            onClick={() => append({ key: "", type: "Windows" })}
            className="w-full"
          >
            Append Key
          </Button>
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LicensesPage;
