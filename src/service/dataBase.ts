import mongoose from "mongoose";
import dotenv from "dotenv";
import User,{ IUser } from "../model/userModel";

dotenv.config();

export const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION as string);
        console.log("connected to the mongoDB");

    } catch (error) {
        console.error("Failed to connect to database", error);

    }
};

// פונקציה ליצירת נתון חדש
export const createUser = async (userData:any): Promise<IUser> => {
    const user = new User({
        ...userData,
    });
  
    return await user.save();
  };
  