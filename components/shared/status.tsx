import { taskStatuses } from "@/lib/config";
import { TaskStatus } from "@/types";

type StatusProps = {
  status: TaskStatus;
};

const Status = ({ status }: StatusProps) => {
  const statusIndex = taskStatuses.indexOf(status);
  const opacity = 0.7;

  return (
    <div
      style={{
        backgroundColor: `hsla(${statusIndex * 30}deg,100%,50%,${opacity})`,
      }}
      className="rounded-full text-xs font-medium text-white grid place-content-center px-2 py-1"
    >
      {status}
    </div>
  );
};

export default Status;
