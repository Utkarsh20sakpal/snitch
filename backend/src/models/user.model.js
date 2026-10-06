import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: false, sparse: true },
    password: { type: String, required: false },
    fullName: { type: String, required: false },
    googleId: { type: String, unique: true, sparse: true },
    profilePic: { type: String },
    role: {
        type: String,
        enum: ["buyer", "seller"],
        default: "buyer"
    }
}, { timestamps: true });


// Pre middleware to hash password before saving if present and modified
userSchema.pre("save", async function () {
    if (!this.password || !this.isModified("password")) {
        return;
    }

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

userSchema.methods.comparePassword = async function (password) {
    if (!this.password) return false;
    return await bcrypt.compare(password, this.password);
};




const userModel = mongoose.model("User", userSchema);

export default userModel;