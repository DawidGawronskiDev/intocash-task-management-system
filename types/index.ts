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
  type: ComponentType;
  size: string;
  forDevice: DeviceType;
};

export type ComponentWithName = {
  type: ComponentType;
  name: string;
  forDevice: DeviceType;
};

export type Component = ComponentWithSize | ComponentWithName;
