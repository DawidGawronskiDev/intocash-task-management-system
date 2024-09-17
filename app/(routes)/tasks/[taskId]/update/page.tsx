import FormUpdate from "@/components/dashboard/tasks/form-update";
import { dbConnect } from "@/lib/dbConnect";
import { Component } from "@/models/component-model";
import TaskModel, { Task } from "@/models/task-model";

const Page = async ({ params }: { params: { taskId: string } }) => {
  await dbConnect();
  const task: (Omit<Task, "components"> & { components: Component[] }) | null =
    await TaskModel.findOne({ _id: params.taskId })
      .populate("components")
      .lean();

  if (!task) {
    return <p className="text-destructive">Task not found</p>;
  }

  return <FormUpdate task={task} />;
};

export default Page;
