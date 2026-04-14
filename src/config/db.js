import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${import.meta.env.VITE_MONGODB_URI}`,
    );
    console.log(`Mongodb connected!!!`);
  } catch (error) {
    console.log(`Mongodb connection Error`, error);
    process.exit(1);
  }
};

export { connectDB };
