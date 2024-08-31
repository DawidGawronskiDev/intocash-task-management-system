"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Component } from "@/models/component-model";
import ColumnActions from "./column-actions";

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
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <ColumnActions />
        </div>
      );
    },
  },
];
