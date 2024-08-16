import dbConnect from "@/lib/dbConnect";
import DeviceModel from "@/models/device-model";
import DeviceSchema from "@/schemas/device-schema";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    await dbConnect();

    const devices = await DeviceModel.find({}).populate("components");

    if (!devices) {
      return new Response("Failed to fetch devices", { status: 500 });
    }

    return NextResponse.json(devices, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal server error", { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const validatedData = DeviceSchema.safeParse(body);

    if (!validatedData.success) {
      return new Response("Failed to validate data", { status: 400 });
    }

    await dbConnect();

    const { type, brand, model, components, quantity, shelf } =
      validatedData.data;

    const createdDevice = await DeviceModel.create({
      type,
      brand,
      model,
      components: components?.map((component) => component.componentId),
      quantity,
      shelf,
    });

    if (!createdDevice) {
      return new Response("Failed to create device", { status: 500 });
    }

    await createdDevice.save();

    return new Response("Device created successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
};
