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
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    }
}, { versionKey: false, timestamps: true });

const User = mongoose.model("users", uesrSchema);

export default User;