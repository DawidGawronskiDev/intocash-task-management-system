import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Eye } from "lucide-react";
import Link from "next/link";
import DialogDelete from "./task-dialog-delete";

type ColumnActionsProps = {
  id: string;
};

const ColumnActions = ({ id }: ColumnActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Ellipsis className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="flex items-center gap-2">
          <Link href={"/dashboard/tasks/" + id} className="flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            <span>View</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <DialogDelete taskId={id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnActions;
