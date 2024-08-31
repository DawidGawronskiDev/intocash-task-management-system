import { dbConnect } from "@/lib/dbConnect";
import ComponentModel from "@/models/component-model";
import ComponentSchema from "@/schemas/component-schema";

export const GET = async (
  req: Request,
  { params }: { params: { componentId: string } }
) => {
  const { componentId } = params;

  try {
    await dbConnect();

    const filter = { _id: componentId };
    const existingComponent = await ComponentModel.findOne(filter);

    if (!existingComponent) {
      return new Response(
        JSON.stringify({ message: "There is no component with this id" }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Component found successfully",
        data: existingComponent,
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

export const PUT = async (
  req: Request,
  { params }: { params: { componentId: string } }
) => {
  const { componentId } = params;
  const reqData = await req.json();

  const validatedData = ComponentSchema.safeParse(reqData);

  if (!validatedData.success) {
    return new Response(
      JSON.stringify({
        message: "Validation failed",
        errors: validatedData.error.flatten(),
      }),
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const filter = { _id: componentId };
    const existingComponent = await ComponentModel.find(filter);

    if (!existingComponent) {
      return new Response(
        JSON.stringify({ message: "There is no component with this id" }),
        { status: 400 }
      );
    }

    const updatedComponent = await ComponentModel.findByIdAndUpdate(
      componentId,
      validatedData.data
    );

    return new Response(
      JSON.stringify({
        message: "Component updated successfully",
        data: updatedComponent,
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
