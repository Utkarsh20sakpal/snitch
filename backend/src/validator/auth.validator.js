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
    body("contact")
        .customSanitizer((value) => (typeof value === "string" ? value.replace(/\s+/g, "") : value))
        .isMobilePhone()
        .withMessage("Invalid contact number"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body().custom((value, { req }) => {
        const name = req.body?.fullname || req.body?.fullName;
        if (!name || (typeof name === "string" && !name.trim())) {
            throw new Error("Full name is required");
        }
        return true;
    }),
    body("isSeller").isBoolean().withMessage("isSeller must be a boolean"),
    validateRequest
]

export const validateLogin = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    validateRequest
]