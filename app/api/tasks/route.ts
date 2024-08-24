import { dbConnect } from "@/lib/dbConnect";
import TaskModel from "@/models/task-model";
import TaskSchema from "@/schemas/task-schema";

export const POST = async (req: Request) => {
  const reqData = await req.json();

  const validation = TaskSchema.safeParse(reqData);

  if (!validation.success) {
    return new Response(
      JSON.stringify({ message: "Validation failed", error: validation.error }),
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const newTask = await TaskModel.create({
      ...validation.data,
      components:
        validation.data.components?.map((component) => component.componentId) ||
        [],
    });

    if (!newTask) {
      return new Response(
        JSON.stringify({ message: "Failed to create task" }),
        { status: 400 }
      );
    }

    await newTask.save();

    return new Response(
      JSON.stringify({
        message: "Task created successfully",
        data: validation.data,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);

    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
