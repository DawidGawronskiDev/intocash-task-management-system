"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import FormContent from "./form-create-content";
import z from "zod";
import TaskSchema from "@/schemas/task-schema";
import { zodResolver } from "@hookform/resolvers/zod";

const FormCreate = () => {
  const methods = useForm({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      device: "",
      components: [],
      os: "",
      drivers: true,
      office: false,
      activation: false,
      quantity: 0,
      status: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (values: z.infer<typeof TaskSchema>) => {
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
