import { type ReactNode } from "react";

export type ComponentType =
  | "RAM"
  | "SSD"
  | "HDD"
  | "Processor"
  | "Motherboard"
  | "Power Supply"
  | "Graphic Card"
  | "Case";

export type DeviceType = "Laptop" | "Desktop";

export type ComponentWithSize = {
  _id: string;
  type: ComponentType;
  size: string;
  forDevice: DeviceType;
};

export type ComponentWithName = {
  _id: string;
  type: ComponentType;
  name: string;
  forDevice: DeviceType;
};

export type Component = ComponentWithSize | ComponentWithName;

export type Layout = {
  children: ReactNode;
};
