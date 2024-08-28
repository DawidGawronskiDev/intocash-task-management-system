import { dbConnect } from "@/lib/dbConnect";
import TaskModel from "@/models/task-model";

export const GET = async (
  req: Request,
  { params }: { params: { taskId: string } }
) => {
  try {
    const { taskId } = params;

    await dbConnect();

    const existingTask = await TaskModel.findOne({ _id: taskId }).populate(
      "components"
    );

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
