import Breadcrubs from "@/components/shared/breadcrubs";
import { Layout } from "@/types";

const TasksLayout = ({ children }: Layout) => {
  return (
    <div>
      <Breadcrubs items={["tasks", "create"]} />
      {children}
    </div>
  );
};

export default TasksLayout;
