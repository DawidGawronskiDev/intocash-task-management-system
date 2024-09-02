"use client";

import DeviceSchema from "@/schemas/device-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormContent from "./form-create-content";
import { Form } from "@/components/ui/form";
import z from "zod";
import axios from "axios";
import ButtonSubmit from "@/components/form/button-submit";

const FormCreate = () => {
  const methods = useForm({
    resolver: zodResolver(DeviceSchema),
    defaultValues: {
      type: "",
      brand: "",
      model: "",
      components: [],
      os: "",
      drivers: true,
      office: false,
      activation: true,
      condition: "",
      shelf: "",
      quantity: 0,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values: z.infer<typeof DeviceSchema>) => {
    try {
      await axios.post("/api/devices/", values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContent />
        <ButtonSubmit isSubmitting={isSubmitting} content="Create Device" />
      </form>
    </Form>
  );
};

export default FormCreate;
