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
      className="rounded-full lg:w-auto lg:aspect-auto text-xs font-medium text-white grid place-content-center lg:px-2 lg:py-1 w-4 aspect-square"
    >
      <p className="hidden lg:block">{status}</p>
    </div>
  );
};

export default Status;
