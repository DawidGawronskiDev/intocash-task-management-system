import { type KeyStatus } from "@/types";
import clsx from "clsx";

type StatusProps = {
  status: KeyStatus;
};

const Status = ({ status }: StatusProps) => {
  return (
    <div
      className={clsx(
        "rounded-full lg:w-auto lg:aspect-auto text-xs font-medium text-white grid place-content-center lg:px-2 lg:py-1 w-4 aspect-square",
        {
          "bg-green-500": status === "Unused",
          "bg-yellow-500": status === "On hold",
          "bg-red-500": status === "Not working" || status === "Used",
        }
      )}
    >
      <p className="hidden lg:block">{status}</p>
    </div>
  );
};

export default Status;
