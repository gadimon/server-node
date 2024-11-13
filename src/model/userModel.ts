import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import { IOrg } from "./orgModel";



export interface IUser extends Document {
    username: string,
    password: string,
    org: string
    area: string;
    comparePassword(userPassword: string): Promise<Boolean>
};

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
        minLength: [4, "The password must contain at least 4 characters"],
    },
    org: {
        type: Schema.Types.ObjectId,
        ref: 'Org',
    },
    area: {
        type: String,
        require: true,
    }
});



//פונקצייה שמצפינה את הסיסמא
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


//מתודה להשוואת סיסמאות
UserSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
    return bcrypt.compare(userPassword, this.password)
}


export default mongoose.model<IUser>("User", UserSchema);