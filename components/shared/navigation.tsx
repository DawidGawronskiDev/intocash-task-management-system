import { Button } from "../ui/button";
import { Cpu, Eye, FilePlus } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import Link from "next/link";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-12 h-12">
                <Cpu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Components</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  <Link href="/dashboard/components">View</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FilePlus className="mr-2 h-4 w-4" />
                  <Link href="/dashboard/components/create">Create</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
