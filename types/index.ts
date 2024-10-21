export type ComponentType =
  | "RAM"
  | "SSD"
  | "HDD"
  | "CPU"
  | "CPU Fan"
  | "Power Supply"
  | "Cable"
  | "Case";

export type License = {
  key: string;
  type: "Windows" | "Office";
};
