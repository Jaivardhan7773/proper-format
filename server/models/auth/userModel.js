import mongoose from "mongoose"

const uesrSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        select: false,
    },
    refreshToken: {
        type: String,
    },

    googleId: { type: String, index: { unique: true, sparse: true } },

    facebookId: { type: String, index: { unique: true, sparse: true } },

    githubId: { type: String, index: { unique: true, sparse: true } },

    avatar: { type: String },
    emailVerified: { type: Boolean, default: false },
}, { versionKey: false, timestamps: true });

const User = mongoose.model("users", uesrSchema);

export default User;