import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";


async function sendTokenResponse(user, statusCode, res, message = "Success") {
    const token = jwt.sign(
        { id: user._id }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN || "1h",
    });

    res.cookie("token", token);

    return res.status(statusCode).json({
        message,
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
    const { email, contact, password, fullName, fullname, isSeller } = req.body;
    const resolvedFullName = fullName || fullname;

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
            fullName: resolvedFullName,
            role: isSeller ? "seller" : "buyer"
        });

        await sendTokenResponse(user, 201, res, "user registered successfully");
    }

    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }

}


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({message: "Invalid email "})
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(400).json({message: "Invalid password"})
    }

    await sendTokenResponse(user, 200, res, "user logged in successfully")
}

export const googleCallback = async (req, res) => {
    try {
        const { id, displayName, emails, photos } = req.user || {};
        const email = emails?.[0]?.value;
        const profilePic = photos?.[0]?.value || "";

        if (!email) {
            return res.redirect("http://localhost:5173/login?error=NoEmailProvided");
        }

        let user = await userModel.findOne({ email });

        if (!user) {
            user = await userModel.create({
                email,
                googleId: id,
                fullName: displayName || "Snitch Atelier Member",
                profilePic,
                role: "buyer"
            });
        } else if (!user.googleId) {
            user.googleId = id;
            if (!user.profilePic && profilePic) user.profilePic = profilePic;
            if (!user.fullName && displayName) user.fullName = displayName;
            await user.save();
        }

        const token = jwt.sign({
            id: user._id,
        }, config.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.cookie("token", token, {
            httpOnly: false,
            secure: config.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.redirect("http://localhost:5173/");
    } catch (err) {
        console.error("Google OAuth callback error:", err);
        return res.redirect("http://localhost:5173/login?error=OAuthFailed");
    }
}

export const getMe = async (req, res) => {
    const user = req.user;

    res.status(200).json({
        message: "User fetched successfully",
        success: true,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role
        }
    })
}