"use client";

import { taskStatuses } from "@/lib/config";
import { Component } from "@/models/component-model";
import { Device } from "@/models/device-model";
import { Task } from "@/models/task-model";
import { TaskStatus } from "@/types";
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
    cell: ({ row }) => {
      const status: TaskStatus = row.getValue("status");
      const statusIndex = taskStatuses.indexOf(status);
      const opacity = 0.7;

      return (
        <div
          style={{
            backgroundColor: `hsla(${statusIndex * 30}deg,100%,50%,${opacity})`,
          }}
          className="rounded-full text-xs font-medium text-white grid place-content-center px-2 py-1"
        >
          {status}
        </div>
      );
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
];
