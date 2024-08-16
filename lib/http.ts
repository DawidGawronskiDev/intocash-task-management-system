import { Component } from "@/types";
import DeviceSchema from "@/schemas/device-schema";
import axios from "axios";
import z from "zod";

export const getComponents = async () => {
  const resposne = await axios.get("/api/components");

  return resposne.data as Component[];
};

export const getDevices = async () => {
  const response = await axios.get("/api/devices");

  return response.data as z.infer<typeof DeviceSchema>[];
};
