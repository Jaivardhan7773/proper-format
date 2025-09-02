import User from "../../models/auth/userModel.js"

export const GetUsers = async (req, res) => {
    try {
        const data = await User.find({},"-password");
         res.status(200).json(data);
        // console.log("what the hell")
    } catch (error) {
         res.status(500).json({ message: "looks like there is an issue in adminController.js", error })
    }
}