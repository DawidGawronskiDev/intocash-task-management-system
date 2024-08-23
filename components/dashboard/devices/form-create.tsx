"use client";

import DeviceSchema from "@/schemas/device-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormContent from "./form-create-content";
import { Form } from "@/components/ui/form";
import z from "zod";
import axios from "axios";

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

  const onSubmit = async (values: z.infer<typeof DeviceSchema>) => {
    try {
      console.log(values);
      const response = await axios.post("/api/devices/", values);

      console.log(values);
    } catch (error) {
      console.log(error);
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
