import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Ellipsis, Eye, RefreshCcw } from "lucide-react";
import Link from "next/link";
import DialogDelete from "./task-dialog-delete";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { Component } from "@/models/component-model";

type ColumnActionsProps = {
  id: string;
};

const handleDuplicate = async (id: string) => {
  const {
    data: { data },
  } = await axios.get("/api/tasks/" + id);

  const duplicatedTask = {
    ...data,
    device: data.device._id.toString(),
    components: data.components.map((component: Component) => ({
      type: component.type,
      componentId: component._id,
    })),
  };

  await axios.post("/api/tasks", duplicatedTask);
};

const ColumnActions = ({ id }: ColumnActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 h-min">
          <Ellipsis className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="flex items-center gap-2">
          <Link href={"/tasks/" + id} className="flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            <span>View</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <Link href={"/tasks/" + id + "/update"} className="flex items-center">
            <RefreshCcw className="w-4 h-4 mr-2" />
            <span>Update</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <button
            onClick={() => handleDuplicate(id)}
            className="flex items-center"
          >
            <Copy className="w-4 h-4 mr-2" />
            <span>Duplicate</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <DialogDelete taskId={id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnActions;
