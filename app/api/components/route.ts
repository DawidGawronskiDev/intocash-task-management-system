import dbConnect from "@/lib/dbConnect";
import ComponentModel from "@/models/component-model";
import ComponentSchema from "@/schemas/component-schema";
import { Component } from "@/types";
import { hasSize } from "@/utils";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  await dbConnect();

  const components = (await ComponentModel.find({})) as Component[];

  if (!components) {
    return new Response("Internal server error", { status: 500 });
  }

  return NextResponse.json(components, { status: 200 });
};

export const POST = async (request: Request) => {
  const requestData = await request.json();

  const validatedData = ComponentSchema.safeParse(requestData);
  if (!validatedData.success) {
    return new Response("Invalid request data", { status: 404 });
  }

  const component = validatedData.data;

  await dbConnect();

  const existingComponent = await ComponentModel.findOne({
    $or: [
      {
        type: component.type,
        size: component.size,
        forDevice: component.forDevice,
      },
      {
        type: component.type,
        name: component.name,
        forDevice: component.forDevice,
      },
    ],
  });

  if (existingComponent) {
    await ComponentModel.findByIdAndUpdate(existingComponent.id, {
      quantity: existingComponent.quantity + component.quantity,
    });

    return new Response("Component quantity updated successfully", {
      status: 200,
    });
  }

  let createdComponent;

  if (hasSize(component.type)) {
    createdComponent = await ComponentModel.create({
      type: component.type,
      size: component.size,
      forDevice: component.forDevice,
      quantity: component.quantity,
    });
  } else {
    createdComponent = await ComponentModel.create({
      type: component.type,
      name: component.name,
      forDevice: component.forDevice,
      quantity: component.quantity,
    });
  }

  if (!createdComponent) {
    return new Response("Failed to create component", { status: 500 });
  }

  console.log(createdComponent);

  return new Response("Component created successfully", { status: 200 });
};
