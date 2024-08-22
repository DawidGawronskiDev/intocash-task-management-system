import mongoose from "mongoose";

let isConnected = false; // Track the connection status

export const dbConnect = async () => {
  if (isConnected) {
    console.log("Already connected to the database.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!);

    isConnected = !!db.connections[0].readyState;
    console.log("Connected to the database.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw new Error("Database connection failed");
  }
};
