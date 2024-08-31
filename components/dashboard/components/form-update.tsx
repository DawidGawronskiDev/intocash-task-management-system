"use client";

import { Form } from "@/components/ui/form";
import { Component } from "@/models/component-model";
import ComponentSchema from "@/schemas/component-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormContent from "./form-content";
import axios from "axios";
import z from "zod";

const FormUpdate = ({
  component,
  componentId,
}: {
  component: Component;
  componentId: string;
}) => {
  const methods = useForm({
    resolver: zodResolver(ComponentSchema),
    defaultValues: {
      type: component.type,
      name: component.name as string | undefined,
      size: component.size?.toString() as number | undefined,
      forDevice: component.forDevice,
      quantity: component.quantity,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: z.infer<typeof ComponentSchema>) => {
    try {
      await axios.put("/api/components/" + componentId, values);
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

export default FormUpdate;
