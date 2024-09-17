import { dbConnect } from "@/lib/dbConnect";
import { Component } from "@/models/component-model";
import TaskModel from "@/models/task-model";
import TaskSchema from "@/schemas/task-schema";

export const GET = async (
  req: Request,
  { params }: { params: { taskId: string } }
) => {
  try {
    const { taskId } = params;

    await dbConnect();

    const existingTask = await TaskModel.findOne({ _id: taskId }).populate([
      "device",
      "components",
    ]);

    if (!existingTask) {
      return new Response(JSON.stringify({ message: "Task does not exists" }), {
        status: 400,
      });
    }

    return new Response(
      JSON.stringify({
        message: "Task found successfully",
        data: existingTask,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { taskId: string } }
) => {
  try {
    await dbConnect();

    const { taskId } = params;

    const filter = { _id: taskId };
    const existingTask = await TaskModel.findOne(filter);

    if (!existingTask) {
      return new Response(
        JSON.stringify({ message: "There is no task with that id" }),
        {
          status: 400,
        }
      );
    }

    await TaskModel.findByIdAndDelete(taskId);

    return new Response(
      JSON.stringify({ message: "Task deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { taskId: string } }
) => {
  const body = await req.json();
  const taskId = params.taskId;

  const validation = TaskSchema.safeParse(body);

  if (!validation.success) {
    return new Response(JSON.stringify({ message: "Validation failed" }), {
      status: 400,
    });
  }

  try {
    await dbConnect();

    const existingTask = await TaskModel.findOne({ _id: taskId });

    if (!existingTask) {
      return new Response(
        JSON.stringify({ message: "Task with this id does not exists" }),
        {
          status: 400,
        }
      );
    }

    const update = {
      ...validation.data,
      components:
        validation.data.components?.map((component) => component.componentId) ||
        [],
    };
    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, update);

    if (!updatedTask) {
      return new Response(
        JSON.stringify({ message: "Failed to update task" }),
        {
          status: 500,
        }
      );
    }

    return new Response(
      JSON.stringify({ message: "Task updated successfully" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
