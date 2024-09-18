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
    accessorKey: "forDevice",
    header: "For",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => {
      const size = row.getValue("size");

      return size === 0 ? "" : size + "GB";
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original._id;

      return (
        <div className="text-right">
          <ColumnActions id={id} />
        </div>
      );
    },
  },
];
