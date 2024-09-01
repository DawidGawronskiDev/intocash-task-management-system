"use client";

import Status from "@/components/shared/key-status";
import { type Key } from "@/models/key-model";
import { KeyStatus } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import ColumnActions from "./column-actions";

export const columns: ColumnDef<Key>[] = [
  {
    accessorKey: "content",
    header: "Key",
  },
  {
    accessorKey: "for",
    header: "For",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: KeyStatus = row.getValue("status");

      return <Status status={status} />;
    },
  },
  {
    id: "actions",
    enableHiding: true,
    cell: ({ row }) => {
      const id = row.original._id;

      return (
        <div className="text-right h-min">
          <ColumnActions id={id} />
        </div>
      );
    },
  },
];
