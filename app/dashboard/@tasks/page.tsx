import TasksChart from "@/components/dashboard/tasks/tasks-chart";
import TaskModel from "@/models/task-model";
import { differenceInDays } from "date-fns";

const Page = async () => {
  const tasks = await TaskModel.find({});

  const todaysTask = tasks.filter(
    (task) => differenceInDays(new Date(), task.createdAt) === 0
  );

  const tasksUncompletedToday = todaysTask.filter(
    (task) => task.status !== "Completed"
  );

  const tasksCompletedToday = todaysTask.filter(
    (task) => task.status === "Completed"
  );

  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(224px,1fr))] gap-4">
        <div className="border p-4 rounded-2xl">
          <div>
            <h3 className="tracking-tight text-sm font-medium">
              Today&apos;s Tasks
            </h3>
            <div className="text-2xl font-bold">{todaysTask.length}</div>
          </div>
        </div>
        <div className="border p-4 rounded-2xl">
          <div>
            <h3 className="tracking-tight text-sm font-medium">
              Tasks completed today
            </h3>
            <div className="text-2xl font-bold">
              {tasksCompletedToday.length}
            </div>
          </div>
        </div>
        <div className="border p-4 rounded-2xl">
          <div>
            <h3 className="tracking-tight text-sm font-medium">
              Today&apos;s uncompleted tasks
            </h3>
            <div className="text-2xl font-bold">
              {tasksUncompletedToday.length}
            </div>
          </div>
        </div>
      </div>
      <TasksChart tasks={tasks} />
    </div>
  );
};

export default Page;
