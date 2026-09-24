import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";


async function sendTokenResponse(user, statusCode, res) {
    const token = jwt.sign(
        { id: user._id }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN || "1h",
    });



    res.cookie("token", token)

    res.status(200).json({
        mwessage: "Login successful",
        success: true,
        token,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullName: user.fullName,
            role: user.role
        }
    });
}




export const registerUser = async (req, res) => {
    const { email, contact, password, fullName, role, isSeller } = req.body;


    try {
        const userExists = await userModel.findOne({
            $or: [{ email }, { contact }]
        });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await userModel.create({
            email,
            contact,
            password,
            fullName,
            role: isSeller ? "seller" : "buyer"
        })

        await sendTokenResponse(user, res, "user registered successfully");
    }

    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }

}