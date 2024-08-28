"use client";

import Status from "@/components/shared/status";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Component } from "@/models/component-model";
import { Device } from "@/models/device-model";
import { Task } from "@/models/task-model";
import { TaskStatus } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { Ellipsis, Eye } from "lucide-react";
import Link from "next/link";

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <Ellipsis className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="flex items-center gap-2">
              <Link
                href={"/dashboard/tasks/" + id}
                className="flex items-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                <span>View</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
