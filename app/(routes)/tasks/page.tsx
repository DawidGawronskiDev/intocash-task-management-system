import { columns } from "@/components/dashboard/tasks/columns";
import { DataTable } from "@/components/dashboard/tasks/data-table";
import { getTasks } from "@/lib/http";

export default async function TasksPage() {
  const allTasks = await getTasks();

  return (
    <div>
      <DataTable columns={columns} data={allTasks} />
    </div>
  );
}
