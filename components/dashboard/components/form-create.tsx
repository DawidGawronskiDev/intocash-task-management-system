"use client";

import { Form } from "@/components/ui/form";

import ComponentSchema from "@/schemas/component-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import FormContent from "./form-create-content";
import axios from "axios";

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

  const onSubmit = async (values: z.infer<typeof ComponentSchema>) => {
    try {
      const response = await axios.post("/api/components/", values);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
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
