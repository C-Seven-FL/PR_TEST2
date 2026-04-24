import mongoose from 'mongoose';
import {UserRole} from "../types/user_role.js";

const UserProfileSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(UserRole),
        default: "client",
    },
    },
    {
        timestamps: true,
    }
);

export const UserProfile = mongoose.model("UserProfile", UserProfileSchema);
