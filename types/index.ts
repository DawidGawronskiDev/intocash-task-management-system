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

export type TaskStatus =
  | "Not Started"
  | "Started"
  | "Cleaned"
  | "Packed"
  | "Sent"
  | "Completed";

export type KeyFor = "Windows" | "Office";

export type KeyStatus = "Unused" | "Used" | "On hold" | "Not working";

export type DeviceCondition = "New" | "Used" | "Retured";
