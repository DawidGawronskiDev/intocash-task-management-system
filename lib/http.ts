import { Component } from "@/types";
import axios from "axios";

export const getComponents = async () => {
  const resposne = await axios.get("/api/components");

  return resposne.data as Component[];
};
