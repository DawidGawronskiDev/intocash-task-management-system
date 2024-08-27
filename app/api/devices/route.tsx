import { dbConnect } from "@/lib/dbConnect";
import DeviceModel from "@/models/device-model";
import DeviceSchema from "@/schemas/device-schema";

export const GET = async (request: Request) => {
  try {
    await dbConnect();

    const components = await DeviceModel.find({}).sort({ createdAt: -1 });

    if (!components) {
      return new Response(
        JSON.stringify({ message: "Failed to find components" }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify(components), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};

export const POST = async (req: Request) => {
  try {
    const data = await req.json();

    const validatedData = DeviceSchema.safeParse(data);

    if (!validatedData.success) {
      return new Response(
        JSON.stringify({
          message: "Validation failed",
          error: validatedData.error,
        }),
        {
          status: 400,
        }
      );
    }

    await dbConnect();

    console.log(validatedData);

    const newDevice = await DeviceModel.create({
      ...validatedData.data,
      components: validatedData.data.components?.map(
        (component) => component.componentId
      ),
    });

    if (!newDevice) {
      return new Response(
        JSON.stringify({
          message: "Failed to create device",
        }),
        {
          status: 500,
        }
      );
    }

    await newDevice.save();

    return new Response(
      JSON.stringify({
        message: "Device created successfully",
        data: validatedData,
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
