"use client";

import DeviceSchema from "@/schemas/device-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormContent from "./form-create-content";
import { Form } from "@/components/ui/form";
import z from "zod";

const FormCreate = () => {
  const methods = useForm({
    resolver: zodResolver(DeviceSchema),
    defaultValues: {
      type: "",
      brand: "",
      model: "",
      components: [],
      shelf: "",
      quantity: 0,
    },
  });

  const { watch, handleSubmit } = methods;

  console.log(watch("components"));

  const onSubmit = (values: z.infer<typeof DeviceSchema>) => {
    console.log(values);
  };

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContent />
      </form>
    </Form>
  );
};

export default FormCreate;
