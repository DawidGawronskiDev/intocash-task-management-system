import { dbConnect } from "@/lib/dbConnect";
import KeyModel from "@/models/key-model";
import KeySchema from "@/schemas/key-schema";

export const GET = async (
  req: Request,
  { params }: { params: { keyId: string } }
) => {
  const { keyId } = params;

  try {
    await dbConnect();

    const filter = { _id: keyId };
    const existingKey = await KeyModel.findOne(filter);

    if (!existingKey) {
      return new Response(
        JSON.stringify({ message: "Key with that id does not exists" }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Key found successfully", data: existingKey }),
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
  { params }: { params: { keyId: string } }
) => {
  const { keyId } = params;
  const reqData = await req.json();

  const validatedFields = KeySchema.safeParse(reqData);

  if (!validatedFields.success) {
    return new Response(
      JSON.stringify({
        message: "Validation failed",
        errors: validatedFields.error.flatten(),
      }),
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const filter = { _id: keyId };
    const existingKey = await KeyModel.findOne(filter);

    if (!existingKey) {
      return new Response(
        JSON.stringify({ message: "Key with that id does not exists" }),
        { status: 400 }
      );
    }

    const updatedKey = await KeyModel.findByIdAndUpdate(
      keyId,
      validatedFields.data
    );

    if (!updatedKey) {
      return new Response(JSON.stringify({ message: "Failed to update key" }), {
        status: 400,
      });
    }

    return new Response(
      JSON.stringify({ message: "Key updated successfully", data: updatedKey }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
