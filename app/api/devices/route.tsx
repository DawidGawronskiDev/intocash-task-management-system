import { dbConnect } from "@/lib/dbConnect";
import DeviceModel from "@/models/device-model";

export const GET = async (request: Request) => {
  try {
    await dbConnect();

    const components = await DeviceModel.find({});

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
