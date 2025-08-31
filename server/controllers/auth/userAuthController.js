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
            return res.status(400).json({ message: "Incorrect password" });
        }


        const accessToken = generateAccessToken(findUser._id);
        const refreshToken = generateRefreshToken(findUser._id);

        // Save refresh token in DB
        findUser.refreshToken = refreshToken;

        await findUser.save();

        // Send tokens as cookies
        res.cookie("accesstoken", accessToken, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
            secure: process.env.NODE_ENV !== "DEVELOPMENT",
            maxAge: 2 * 60 * 1000, // 15 min
        });

        res.cookie("refreshtoken", refreshToken, {
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
    const { refreshtoken } = req.cookies;


    if (!refreshtoken) {
        return res.status(401).json({ message: "no refresh token provided" });
    }

    try {

        const decoded = jwt.verify(refreshtoken, process.env.JWT_REFRESH_SECRET);

        const user = await User.findById(decoded.userId)

        if (!user || user.refreshToken !== refreshtoken) {
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

    const { refreshtoken } = req.cookies;
    let result = null;
    // console.log("Cookies on logout:", req.cookies);

    if (refreshtoken) {
        try {
            const decoded = jwt.verify(refreshtoken, process.env.JWT_REFRESH_SECRET);

            const userId = decoded.userId || decoded._id || decoded.id;

            if (userId) {
                result = await User.findByIdAndUpdate(userId, { $unset: { refreshToken: "" } });
            } else {
                console.log("User ID not found in token payload");
            }

        } catch (error) {
            console.error("Error verifying token:", error);
            return res.status(401).json({ message: "Invalid refresh token" });
        }
    }

    res.clearCookie("accesstoken", {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
        secure: process.env.NODE_ENV !== "DEVELOPMENT",
    });

    res.clearCookie("refreshtoken", {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
        secure: process.env.NODE_ENV !== "DEVELOPMENT",
    });

    res.status(200).json({ message: `email ${result?.email || ""} logged out successfully` });
}

export const checkAuth = async (req, res) => {

    const accessToken = req.cookies.accesstoken;

    if (!accessToken) return res.status(401).json({ message: "Not logged in" });

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ _id: user._id, name: user.name, email: user.email });
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired access token" });
    }


}