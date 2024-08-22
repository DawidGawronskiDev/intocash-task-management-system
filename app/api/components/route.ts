import { componentsWithSize } from "@/lib/config";
import { dbConnect } from "@/lib/dbConnect";
import ComponentModel from "@/models/component-model";
import ComponentSchema from "@/schemas/component-schema";
import mongoose from "mongoose";

export const GET = async (request: Request) => {
  try {
    await dbConnect();

    const components = await ComponentModel.find({});

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

export const POST = async (request: Request) => {
  try {
    const requestData = await request.json();
    const validatedData = ComponentSchema.safeParse(requestData);

    if (!validatedData.success) {
      return new Response(
        JSON.stringify({
          message: "Validation failed",
          error: validatedData.error,
        }),
        { status: 400 }
      );
    }

    const { type, size, name, forDevice, quantity } = validatedData.data;

    await dbConnect();

    const filter = componentsWithSize.includes(type)
      ? { type, size, forDevice }
      : { type, name, forDevice };

    const existingComponent = await ComponentModel.findOne(filter);

    if (existingComponent) {
      existingComponent.quantity += quantity;
      await existingComponent.save();

      return new Response(
        JSON.stringify({ message: "Component updated successfully" }),
        { status: 200 }
      );
    }

    const newComponent = await ComponentModel.create(validatedData.data);

    if (!newComponent) {
      return new Response(
        JSON.stringify({ message: "Failed to create component" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Component created successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
