import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getKeys = (s: string) => {
  const re =
    /([A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5})|(Windows|Office)/gi;

  const matches = s.match(re);
  const newArr = [];

  if (!matches) {
    return [];
  }

  for (let i = 0; i < matches.length; i += 2) {
    if (matches[i] && matches[i + 1]) {
      newArr.push({
        key: matches[i + 1],
        type: matches[i] as "Windows" | "Office",
      });
    }
  }

  return newArr;
};
