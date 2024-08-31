import { dbConnect } from "@/lib/dbConnect";
import DeviceModel from "@/models/device-model";

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
