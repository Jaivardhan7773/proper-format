import jwt from "jsonwebtoken";




export const useAuthMiddleware = (req, res, next) => {
    const accessToken = req.cookies.accesstoken
    if (!accessToken) {
        return res.status(400).json({ message: "NO accesstoken found" });
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        if (!decoded) {
            return res.status(400).json({
                message: "Invalid token"
            })
        }
        // console.log("User has passed userAuthMiddleware.js")
        next();
    } catch (error) {
        res.status(400).json({ message: "Error in userAuthMiddleware.js" })
    }
}