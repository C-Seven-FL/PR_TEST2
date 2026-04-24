import { UserProfile } from "../models/profile.model.js";

export async function createProfile(dto) {
    const { uid, role } = dto;

    if (!uid) {
        throw new Error("Missing uid");
    }

    const existing = await UserProfile.findOne({ uid });

    if (existing) {
        return null;
    }

    const profile = await UserProfile.create({
        uid,
        role: role
    });
    return profile;
}

export async function getProfile(uid) {
    const profile = await UserProfile.findOne({ uid });

    if (!profile) {
        console.log(`ProfileService     getProfile      Profile not found   [uid = ${uid}]`);
        return null;
    }

    return profile;
}

export async function updateProfile(dto) {
    const { uid, role } = dto;

    if (!uid) {
        throw new Error("Missing uid");
    }

    const updated = await UserProfile.findOneAndUpdate(
        { uid },
        { $set: { role } },
        {
            new: true,
            runValidators: true
        }
    );

    if (!updated) {
        throw new Error("Profile not found");
    }

    return updated;
}

export async function deleteProfile(uid) {
    if (!uid) {
        throw new Error("Missing uid");
    }

    const deleted = await UserProfile.findOneAndDelete({ uid });

    if (!deleted) {
        throw new Error("Profile not found");
    }

    return true;
}