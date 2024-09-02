"use client";

import DeviceSchema from "@/schemas/device-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormContent from "./form-create-content";
import { Form } from "@/components/ui/form";
import z from "zod";
import axios from "axios";
import { Device } from "@/models/device-model";
import { Component } from "@/models/component-model";
import ButtonSubmit from "@/components/form/button-submit";

const FormUpdate = ({
  device,
  deviceId,
}: {
  device: Omit<Device, "components"> & { components: Component[] };
  deviceId: string;
}) => {
  const methods = useForm({
    resolver: zodResolver(DeviceSchema),
    defaultValues: {
      type: device.type,
      brand: device.brand,
      model: device.model,
      components: device.components.map((component) => ({
        type: component.type,
        componentId: component._id,
      })),
      os: device.os,
      drivers: device.drivers,
      office: device.office,
      activation: device.activation,
      condition: device.condition,
      shelf: device.shelf as string | undefined,
      quantity: device.quantity,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values: z.infer<typeof DeviceSchema>) => {
    try {
      await axios.put("/api/devices/" + deviceId, values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContent />
        <ButtonSubmit isSubmitting={isSubmitting} content="Update Device" />
      </form>
    </Form>
  );
};

export default FormUpdate;
