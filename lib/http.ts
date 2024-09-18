import ComponentModel, { Component } from "@/models/component-model";
import { dbConnect } from "./dbConnect";
import DeviceModel, { Device } from "@/models/device-model";
import KeyModel, { Key } from "@/models/key-model";
import TaskModel, { Task } from "@/models/task-model";

export const getComponent = async (componentId: string) => {
  await dbConnect();
  const component: Component | null = await ComponentModel.findOne({
    _id: componentId,
  });
  return component;
};

export const getComponents = async (): Promise<Component[] | null> => {
  await dbConnect();
  const components: Component[] = await ComponentModel.find({}).sort({
    createdAt: -1,
  });

  return components;
};

export const getDevice = async (deviceId: string) => {
  await dbConnect();
  const device:
    | (Omit<Device, "components"> & { components: Component[] })
    | null = await DeviceModel.findOne({ _id: deviceId })
    .populate("components")
    .lean();
  return device;
};

export const getDevices = async () => {
  await dbConnect();
  const devices: Device[] = await DeviceModel.find({}).sort({ createdAt: -1 });
  return devices;
};

export const getKey = async (keyId: string) => {
  await dbConnect();
  const key: Key | null = await KeyModel.findOne({ _id: keyId });
  return key;
};

export const getKeys = async () => {
  await dbConnect();
  const allKeys: Key[] | null = await KeyModel.find({}).sort({ createdAt: -1 });
  return allKeys;
};

export const getTask = async (taskId: string) => {
  await dbConnect();
  const task: Omit<Task, "device" | "components"> & {
    device: Device;
    components: Component[];
  } = await TaskModel.findOne({ _id: taskId }).populate([
    "device",
    "components",
  ]);

  return task;
};

export const getTasks = async () => {
  await dbConnect();
  const allTasks: Array<
    Omit<Task, "components"> & { components: Component[] }
  > = await TaskModel.find({})
    .sort({ createdAt: -1 })
    .populate("device")
    .lean();

  return allTasks;
};
