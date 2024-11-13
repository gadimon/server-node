import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from './userModel'

export interface Resources{
    name: string,
    amount: number,
}

export interface IOrg extends Document {
    orgName: string,
    resources: Resources[],
    budget: number,
};


const orgSchema: Schema = new Schema ({
    orgName: {
        type: String,
        require: true, 
    },

    resources: [{
        name: {
            type: String,
            require: true,
        },
        amount: {
            type: Number,
            require: true,
        }
    }],
    budget: {
        type: Number,
        require: true,
    }


});

export default mongoose.model<IOrg>("Org", orgSchema);