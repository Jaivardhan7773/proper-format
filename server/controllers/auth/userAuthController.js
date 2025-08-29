import mongoose from "mongoose";
import bcrypt  from "bcryptjs"
import User from "../../models/auth/userModel.js";

export const registerUesr = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ message: "All fields are required" })
    }
    try {
        const findUser = await User.findOne({ email });
        if (findUser) {
            res.status(400).json({ message: `${email} already exists` })
        }


        const saltRound = await bcrypt .genSalt(10);
        const hashedPassword = await bcrypt .hash(password, saltRound)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            message: "User registered successfully",
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });

    } catch (error) {
res.status(500).json({ message: 'Server Error' });
    }
}