import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import User from "../../models/auth/userModel.js";
import { validationResult } from "express-validator";


export const registerUesr = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.status(400).json({ message: `${email} already exists` })
        }


        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltRound)

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

export const loginUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    const { email, password } = req.body;

    try {
        const findUser = await User.findOne({ email });

        if (!findUser) {
            return res.status(404).json({
                message: `cannot find ${email}`
            })
        }

        const isMatch = await bcrypt.compare(password, findUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.status(200).json({
            _id: findUser._id,
            name: findUser.name,
            email: findUser.email,
        });

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}