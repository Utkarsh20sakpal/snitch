import { body, validationResult } from "express-validator";


function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}








export const validateRegister = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("contact").isMobilePhone().withMessage("Invalid contact number"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("fullName").notEmpty().withMessage("Full name is required"),
    body("role").isIn(["buyer", "seller"]).withMessage("Role must be either 'buyer' or 'seller'"),
    body("isSeller").isBoolean().withMessage("isSeller must be a boolean"),
    validateRequest
]