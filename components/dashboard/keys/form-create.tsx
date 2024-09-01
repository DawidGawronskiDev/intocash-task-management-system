"use client";

import { Form } from "@/components/ui/form";
import KeysSchema from "@/schemas/keys-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import FormContent from "./form-content";
import axios from "axios";

const FormCreate = () => {
  const methods = useForm({
    resolver: zodResolver(KeysSchema),
    defaultValues: {
      keys: [],
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: z.infer<typeof KeysSchema>) => {
    await axios.post("/api/keys", values);
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
