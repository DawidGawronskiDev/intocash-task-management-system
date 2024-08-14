import { componentTypesWithSize } from "@/lib/config";

// Checks if a component has a size
export const hasSize = (type: string) => {
  return componentTypesWithSize.includes(type);
};
