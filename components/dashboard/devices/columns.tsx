"use client";

import { Device } from "@/models/device-model";
import { ColumnDef } from "@tanstack/react-table";
import ColumnAction from "./column-actions";

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
  {
    accessorKey: "condition",
    header: "Condition",
  },
  {
    enableHiding: true,
    id: "actions",
    cell: ({ row }) => {
      const id = row.original._id;

      return (
        <div className="text-right">
          <ColumnAction id={id} />
        </div>
      );
    },
  },
];
