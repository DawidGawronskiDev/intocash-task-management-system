import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import FormDelete from "./task-form-delete";

type DialogDeleteProps = {
  taskId: string;
};

const DialogDelete = ({ taskId }: DialogDeleteProps) => {
  return (
    <div className="text-destructive">
      <Dialog>
        <DialogTrigger asChild>
          <button type="button" className="flex items-center">
            <Trash className="w-4 h-4 mr-2" />
            <span>Delete</span>
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-destructive">Delete task</DialogTitle>
            <DialogDescription>
              This action canno&apos;t be undone. Are you sure you want to
              delete this task?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <FormDelete taskId={taskId} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogDelete;
