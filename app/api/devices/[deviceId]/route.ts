import { dbConnect } from "@/lib/dbConnect";
import DeviceModel from "@/models/device-model";
import DeviceSchema from "@/schemas/device-schema";

export const GET = async (
  req: Request,
  { params }: { params: { deviceId: string } }
) => {
  const { deviceId } = params;

  try {
    await dbConnect();

    const filter = { _id: deviceId };
    const existingDevice = await DeviceModel.findOne(filter).populate(
      "components"
    );

    if (!existingDevice) {
      return new Response(
        JSON.stringify({ message: "There is no device with this id" }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Device found successfully",
        data: existingDevice,
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
  { params }: { params: { deviceId: string } }
) => {
  const { deviceId } = params;

  const reqData = await req.json();

  const validatedFields = DeviceSchema.safeParse(reqData);

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
    await dbConnect();

    const filter = { _id: deviceId };
    const existingDevice = await DeviceModel.findOne(filter).populate(
      "components"
    );

    if (!existingDevice) {
      return new Response(
        JSON.stringify({ message: "There is no device with this id" }),
        { status: 400 }
      );
    }

    const updatedDevice = await DeviceModel.findByIdAndUpdate(deviceId, {
      ...validatedFields.data,
      components:
        validatedFields.data.components?.map(
          (component) => component.componentId
        ) || [],
    });

    if (!updatedDevice) {
      return new Response(
        JSON.stringify({ message: "Failed to update device" }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Device updated successfully",
        data: validatedFields.data,
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
