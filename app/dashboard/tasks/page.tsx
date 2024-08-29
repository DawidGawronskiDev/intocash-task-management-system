import TasksTable from "@/components/dashboard/tasks/tasks-table";
import Breadcrubs from "@/components/shared/breadcrubs";

const TasksPage = () => {
  return (
    <div>
      <Breadcrubs items={["dashboard", "tasks", "create"]} />
      <TasksTable />
    </div>
  );
};

export default TasksPage;
