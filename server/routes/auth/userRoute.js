import express from "express";
import { loginUser, registerUesr } from "../../controllers/auth/userAuthController.js";
import { loginValidation, registerValidation } from "../../middleware/validation/authValidation.js";

const router = express.Router()

router.post('/signup' ,registerValidation , registerUesr);
router.post('/login', loginValidation,loginUser);

export default router;