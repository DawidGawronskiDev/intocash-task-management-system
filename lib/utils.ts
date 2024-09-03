import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { componentsWithSize } from "./config";
import { getMonth, isSameMonth, isSameYear, format } from "date-fns";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const hasSize = (type: string) => {
  return componentsWithSize.includes(type);
};

export const getThisYearItems = <T extends { createdAt: Date }>(
  items: T[]
): T[] => {
  return items.filter((item) => isSameYear(item.createdAt, new Date()));
};

export const getThisMonthItems = <T extends { createdAt: Date }>(
  items: T[]
): T[] => {
  return items.filter((item) => isSameMonth(item.createdAt, new Date()));
};

export const collectThisMonthItems = <
  T extends { createdAt: Date },
  Shape extends { day: number; tasks: number }
>(
  items: T[],
  shape: Shape[]
): Shape[] => {
  return items.reduce((acc, cur) => {
    const currentItemDay = Number(format(cur.createdAt, "d"));
    const existingDay = acc.find((item) => item.day === currentItemDay);

    if (existingDay) {
      existingDay.tasks += 1;
    } else {
      acc.push({ day: currentItemDay, tasks: 1 } as Shape);
    }

    return acc;
  }, shape);
};

export const collectTasksByMonth = <
  T extends { createdAt: Date },
  Shape extends { month: number; tasks: number }
>(
  items: T[],
  shape: Shape[]
): Shape[] => {
  return items.reduce((acc, cur) => {
    const currentTaskMonth = getMonth(cur.createdAt);
    const existingMonth = acc.find((item) => item.month === currentTaskMonth);

    if (existingMonth) {
      existingMonth.tasks += 1;
    } else {
      acc.push({ month: currentTaskMonth, tasks: 1 } as Shape);
    }

    return acc;
  }, shape);
};
