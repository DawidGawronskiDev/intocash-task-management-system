"use client";

import { Component } from "@/models/component-model";
import { Device } from "@/models/device-model";
import { Task } from "@/models/task-model";
import { TaskStatus } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import ColumnActions from "./column-actions";
import Status from "@/components/shared/task-status";

type ResTask = Task & {
  device: Device;
  components: Component[];
};

export const columns: ColumnDef<ResTask>[] = [
  {
    accessorKey: "device",
    header: "Device",
    cell: ({ row }) => {
      const device: Device = row.getValue("device");

      return (
        <div>
          {device.type} {device.brand} {device.model}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: TaskStatus = row.getValue("status");

      return <Status status={status} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Time",
    cell: ({ row }) => {
      const createdAt: string = row.getValue("createdAt");

      return <div>{`${formatDistanceToNow(createdAt)} ago`}</div>;
    },
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
