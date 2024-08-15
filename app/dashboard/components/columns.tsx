import { Button } from "@/components/ui/button";
import { Component } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Component>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "forDevice",
    header: "Device",
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Quantity
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const quantity = row.getValue("quantity") as number;

      return (
        <div
          className={clsx("text-right mx-4", {
            "text-red-500": quantity < 20,
          })}
        >
          {quantity}
        </div>
      );
    },
  },
];
