import mongoose from "mongoose";

export function dataBaseConnection() {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.DB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB Connection Failed", error);
  }
}
