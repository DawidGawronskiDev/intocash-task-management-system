import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import axios from "axios";
import { FormEvent } from "react";

type FormDeleteProps = {
  taskId: string;
};

const FormDelete = ({ taskId }: FormDeleteProps) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(taskId);

    await axios.delete("/api/tasks/" + taskId);
  };

  return (
    <form onSubmit={handleSubmit} className="p-0">
      <Button variant="destructive">Confirm</Button>
    </form>
  );
};

export default FormDelete;
