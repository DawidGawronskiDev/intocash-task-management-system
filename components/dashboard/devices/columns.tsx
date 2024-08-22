import { Device } from "@/models/device-model";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Device>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "shelf",
    header: "Shelf",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
];
