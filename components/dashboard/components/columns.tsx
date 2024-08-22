import { ColumnDef } from "@tanstack/react-table";
import { Component } from "@/models/component-model";

export const columns: ColumnDef<Component>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "size",
    header: "size",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
];
