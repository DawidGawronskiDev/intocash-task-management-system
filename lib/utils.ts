import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { componentsWithSize } from "./config";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const hasSize = (type: string) => {
  return componentsWithSize.includes(type);
};
