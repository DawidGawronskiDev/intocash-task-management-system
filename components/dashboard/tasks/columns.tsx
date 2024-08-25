"use client";

import { Component } from "@/models/component-model";
import { Device } from "@/models/device-model";
import { Task } from "@/models/task-model";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";

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
  },
  {
    accessorKey: "createdAt",
    header: "Time",
    cell: ({ row }) => {
      const createdAt: string = row.getValue("createdAt");

      return <div>{`${formatDistanceToNow(createdAt)} ago`}</div>;
    },
  },
];
