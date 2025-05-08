import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "@/utils/logger";

dotenv.config();

/**
 * ตรวจสอบว่า ENV ที่จำเป็นถูกกำหนดไว้หรือไม่
 */
const validateEnv = () => {
  if (!process.env.MONGO_URI) {
    logger.error("❌ Missing required environment variable: MONGO_URI");
    process.exit(1);
  }
};

export const connectDB = async (): Promise<void> => {
  validateEnv();

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    logger.info(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    logger.error("❌ MongoDB connection failed:");
    process.exit(1);
  }
};
