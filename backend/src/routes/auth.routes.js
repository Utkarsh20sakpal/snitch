import {Router} from "express";
import {validateRegister} from "../validator/auth.validator.js";
import { registerUser } from "../controller/auth.controller.js";

const router = Router();



router.post("/register", validateRegister , registerUser);

export default router;