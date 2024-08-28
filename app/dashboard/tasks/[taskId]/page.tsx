import Status from "@/components/shared/status";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Component } from "@/models/component-model";
import { Device } from "@/models/device-model";
import { Task } from "@/models/task-model";
import { TaskStatus } from "@/types";
import axios from "axios";

type ReqTask = Task & { device: Device; components: Component[] };

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

      <div className="grid gap-4">
        <h2 className="text-2xl font-bold tracking-tight">
          General Information
        </h2>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(224px,1fr))] gap-8">
          <div className="grid">
            <h3 className="text-xl font-bold tracking-tight">
              {task.quantity}x
            </h3>
            <p className="opacity-50 text-base leading-none">Quantity</p>
          </div>

          <div className="grid">
            <h3 className="text-xl font-bold tracking-tight">
              {task.device.type}
            </h3>
            <p className="opacity-50 text-base leading-none">Device Type</p>
          </div>

          <div className="grid">
            <h3 className="text-xl font-bold tracking-tight">
              {task.device.brand}
            </h3>
            <p className="opacity-50 text-base leading-none">Device Brand</p>
          </div>

          <div className="grid">
            <h3 className="text-xl font-bold tracking-tight">
              {task.device.model}
            </h3>
            <p className="opacity-50 text-base leading-none">Device Model</p>
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid gap-6">
        <h2 className="text-2xl font-bold tracking-tight">Software</h2>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(224px,1fr))] gap-8">
          <div className="grid">
            <h3 className="text-xl font-bold tracking-tight">{task.os}</h3>
            <p className="opacity-50 text-base leading-none">
              Operating System
            </p>
          </div>

          <div className="grid">
            <h3 className="text-xl font-bold tracking-tight">
              {task.office ? "Required" : "Not Required"}
            </h3>
            <p className="opacity-50 text-base leading-none">Office</p>
          </div>

          <div className="grid">
            <h3 className="text-xl font-bold tracking-tight">
              {task.drivers ? "Required" : "Not Required"}
            </h3>
            <p className="opacity-50 text-base leading-none">Drivers</p>
          </div>

          <div className="grid">
            <h3 className="text-xl font-bold tracking-tight">
              {task.activation ? "Required" : "Not required"}
            </h3>
            <p className="opacity-50 text-base leading-none">Activation</p>
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid gap-6">
        <h2 className="text-2xl font-bold tracking-tight">Hardware</h2>

        <ul className="grid grid-cols-[repeat(auto-fill,minmax(224px,1fr))] gap-8">
          {task.components.map((component) => (
            <li key={component._id}>
              <div className="grid">
                <h3 className="text-xl font-bold tracking-tight">
                  {component.type}{" "}
                  {component.size ? component.size + "GB" : component.name}
                </h3>
                <p className="opacity-50 text-base leading-none">Component</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskPage;
