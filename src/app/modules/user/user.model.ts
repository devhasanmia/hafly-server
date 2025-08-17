import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const ProfileSchema = new Schema({
    profilePicture: { type: String },
    coverPhoto: { type: String },
    bio: { type: String },
}, {
    _id: false,
    versionKey: false
});

const VerifiedSchema = new Schema({
    isVerified: { type: Boolean, default: false },
    since: { type: Date },
    expiresAt: { type: Date },
}, {
    _id: false,
    versionKey: false
});

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        dob: { type: Date, required: true },
        gender: { type: String, enum: ['Female', 'Male', 'Other'], required: true },
        mobile: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        status: { type: String, enum: ['unverified', 'verified', 'suspended'], default: 'unverified' },
        address: { type: String },
        profile: { type: ProfileSchema },
        verified: { type: VerifiedSchema },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
    },
    { timestamps: true }
);

const User = model<IUser>("User", UserSchema);

export default User;
