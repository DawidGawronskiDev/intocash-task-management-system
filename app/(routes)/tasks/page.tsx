import { columns } from "@/components/dashboard/tasks/columns";
import { DataTable } from "@/components/dashboard/tasks/data-table";
import { Component } from "@/models/component-model";
import TaskModel, { Task } from "@/models/task-model";

const TasksPage = async () => {
  const allTasks: Array<
    Omit<Task, "components"> & { components: Component[] }
  > = await TaskModel.find({})
    .sort({ createdAt: -1 })
    .populate("device")
    .lean();

  return (
    <div>
      <DataTable columns={columns} data={allTasks} />
    </div>
  );
};

export default TasksPage;
