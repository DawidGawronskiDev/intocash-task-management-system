"use client";

import { Form } from "@/components/ui/form";
import { type Key } from "@/models/key-model";
import KeySchema from "@/schemas/key-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import FormContent from "./form-update-content";
import axios from "axios";

type FormUpdateProps = {
  data: Key;
};

const FormUpdate = ({ data }: FormUpdateProps) => {
  const methods = useForm({
    resolver: zodResolver(KeySchema),
    defaultValues: {
      for: data.for,
      content: data.content,
      status: data.status,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: z.infer<typeof KeySchema>) => {
    console.log(values);
    try {
      await axios.put("/api/keys/" + data._id, values);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Form {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormContent />
        </form>
      </Form>
    </div>
  );
};

export default FormUpdate;
