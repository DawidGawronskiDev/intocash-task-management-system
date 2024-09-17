"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import FormContent from "./form-create-content";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Task } from "@/models/task-model";
import { Component } from "@/models/component-model";
import TaskSchema from "@/schemas/task-schema";

const FormUpdate = ({
  task,
}: {
  task: Omit<Task, "components"> & { components: Component[] };
}) => {
  const methods = useForm({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      device: task.device.toString(),
      components: task.components.map((component) => ({
        type: component.type,
        componentId: component._id,
      })),
      os: task.os,
      drivers: task.drivers,
      office: task.office,
      activation: task.activation,
      quantity: task.quantity,
      status: task.status,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: z.infer<typeof TaskSchema>) => {
    await axios.put("/api/tasks/" + task._id, values);
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
