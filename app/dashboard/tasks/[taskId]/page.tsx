import InfoGrid from "@/components/info-grid";
import Status from "@/components/shared/status";
import { Separator } from "@/components/ui/separator";
import { Component } from "@/models/component-model";
import { Device } from "@/models/device-model";
import { Task } from "@/models/task-model";
import { TaskStatus } from "@/types";
import axios from "axios";

type ReqTask = Omit<Task, "device" | "components"> & {
  device: Device;
  components: Component[];
};

const TaskPage = async ({ params }: { params: { taskId: string } }) => {
  const { taskId } = params;
  const req = await axios.get("http://localhost:3000/api/tasks/" + taskId);

  const task: ReqTask = req.data.data;

  console.log(task);

  return (
    <div className="grid gap-16">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Task - {task.device.brand} {task.device.model}{" "}
        </h1>
        <Status status={task.status as TaskStatus} />
      </div>

      <InfoGrid
        title="General Information"
        items={[
          { heading: `${task.quantity}x`, body: "Quantity" },
          { heading: task.device.type, body: "Device Type" },
          { heading: task.device.brand, body: "Device Brand" },
          { heading: task.device.model, body: "Device Model" },
        ]}
      />

      <Separator />

      <InfoGrid
        title="Software"
        items={[
          { heading: task.os, body: "Operating System" },
          {
            heading: task.office ? "Required" : "Not Required",
            body: "Office",
          },
          {
            heading: task.drivers ? "Required" : "Not Required",
            body: "Drivers",
          },
          {
            heading: task.activation ? "Required" : "Not required",
            body: "Activation",
          },
        ]}
      />

      <Separator />

      <InfoGrid
        title="Hardware"
        items={task.components.map((component) => ({
          heading: component.type,
          body: `${component.size ? component.size + "GB" : component.name}`,
        }))}
      />
    </div>
  );
};

export default TaskPage;
