import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import User from "../../models/auth/userModel.js";
import { validationResult } from "express-validator";
import { generateAccessToken, generateRefreshToken } from "../../utils/cookie.js"
import jwt from "jsonwebtoken";


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
        console.log(findUser)


        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltRound);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            message: "User registered successfully",
        });


        const accesstoken = generateAccessToken(user._id);
        const refreshtoken = generateRefreshToken(user._id);

        user.refreshToken = refreshtoken;

        await user.save();


        res.cookie("accesstoken", accesstoken, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
            secure: process.env.NODE_ENV !== "DEVELOPMENT",
            maxAge: 15 * 60 * 1000,
        });

        res.cookie("refreshtoken", refreshtoken, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
            secure: process.env.NODE_ENV !== "DEVELOPMENT",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

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


        const accessToken = generateAccessToken(findUser._id);
        const refreshToken = generateRefreshToken(findUser._id);

        // Save refresh token in DB
        findUser.refreshToken = refreshToken;

        await findUser.save();

        // Send tokens as cookies
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
            secure: process.env.NODE_ENV !== "DEVELOPMENT",
            maxAge: 15 * 60 * 1000, // 15 min
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
            secure: process.env.NODE_ENV !== "DEVELOPMENT",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({
            _id: findUser._id,
            name: findUser.name,
            email: findUser.email,
        });

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export const refreshedToken = async (req, res) => {
    const { refreshedToken } = req.cookies;


    if (!refreshedToken) {
        return res.status(401).json({ message: "no refresh token provided" });
    }

    try {

        const decoded = jwt.verify(refreshedToken, process.env.JWT_REFRESH_SECRET);

        const user = await User.findById(decoded.userId)

        if (!user || user.refreshToken !== refreshedToken) {
            return res.status(403).json({ message: "Invalid refresh token" })
        }

        const newAccesstoken = generateAccessToken(user._id);

        res.cookie("accesstoken", newAccesstoken, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
            secure: process.env.NODE_ENV !== "DEVELOPMENT",
            maxAge: 15 * 60 * 1000,
        });

        res.status(200).json({ message: "cookie resfreshed successfully" })
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired refresh token" });
    }
}

export const logoutUser = async (req, res) => {
    const { refreshtoken  } = req.cookies;
    console.log("Cookies received:", req.cookies);


    console.log("req came")
    if (refreshtoken) {
        try {
            const decoded = jwt.verify(refreshtoken, process.env.JWT_REFRESH_SECRET);
            console.log(decoded);
            await User.findByIdAndUpdate(decoded._id || decoded.id || decoded.userId, { $unset: { refreshToken: "" } });
    console.log("refreshToken deleted")
            
        } catch (error) {
            return res.status(500).json({ message: "invalid refresh token" });
        }
    }
    console.log("ended")

    res.clearCookie("accesstoken");
    res.clearCookie("refreshtoken");

    res.status(200).json({ message: "logged out successfully" });
}