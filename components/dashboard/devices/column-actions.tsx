import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Eye, RefreshCcw } from "lucide-react";
import Link from "next/link";

type ColumnActionProps = {
  id: string;
};

const ColumnAction = ({ id }: ColumnActionProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 h-min">
          <Ellipsis className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={"/devices/" + id} className="flex items-center gap-2">
            <Eye className="w-4 h-4" /> View
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={"/devices/" + id + "/update"}
            className="flex items-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" /> Update
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnAction;
