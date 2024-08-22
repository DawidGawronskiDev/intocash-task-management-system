"use client";

import { Form } from "@/components/ui/form";

import ComponentSchema from "@/schemas/component-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import FormContent from "./form-create-content";

const FormCreate = () => {
  const methods = useForm({
    resolver: zodResolver(ComponentSchema),
    defaultValues: {
      type: "",
      name: "",
      size: 0,
      forDevice: "",
      quantity: 0,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (values: z.infer<typeof ComponentSchema>) => {
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
