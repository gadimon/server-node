import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface IMissiles extends Document {
    name: string,
    description: string,
    speed: number,
    intercepts: string[];
    price: number,
};

const MissilesSchema: Schema = new Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        required: true,
    },
    speed: {
        type: Number,
        require: true,
    },
    intercepts:[ {
        type: String,
        require: true,
    }],
    price: {
        type: Number,
        require: true,
    },
});





export default mongoose.model<IMissiles>(" Missiles", MissilesSchema," Missiles");