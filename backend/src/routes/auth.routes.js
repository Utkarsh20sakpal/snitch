import { Router } from "express";
import { validateRegister, validateLogin } from "../validator/auth.validator.js";
import { registerUser, loginUser, googleCallback } from "../controller/auth.controller.js";
import passport from "passport";
import { config } from "../config/config.js";

const router = Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

router.get("/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.post("/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: config.NODE_ENV == "development" ? "http://localhost:5173/login" : "/login"
    }),
    googleCallback,
)


export default router;