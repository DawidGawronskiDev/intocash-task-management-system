import { dbConnect } from "@/lib/dbConnect";
import KeyModel from "@/models/key-model";
import KeysSchema from "@/schemas/keys-schema";

export const GET = async (req: Request) => {
  try {
    await dbConnect();

    const keys = await KeyModel.find({}).sort({ createdAt: -1 });

    if (!keys) {
      return new Response(JSON.stringify({ message: "Failed to get keys" }), {
        status: 400,
      });
    }

    return new Response(
      JSON.stringify({ message: "Keys found successfully", data: keys }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};

export const POST = async (req: Request) => {
  const reqData = await req.json();

  const validatedFields = KeysSchema.safeParse(reqData);

  if (!validatedFields.success) {
    return new Response(
      JSON.stringify({
        message: "Validation failed",
        errors: validatedFields.error.flatten(),
      }),
      {
        status: 400,
      }
    );
  }

  try {
    const insertedKeys = await KeyModel.insertMany(validatedFields.data.keys);

    if (!insertedKeys) {
      return new Response(
        JSON.stringify({
          message: "Failed to create keys",
          data: validatedFields.data,
        }),
        {
          status: 400,
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Keys created successfully",
        data: validatedFields.data,
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
