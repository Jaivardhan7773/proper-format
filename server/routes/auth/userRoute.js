import express from "express";
import { checkAuth, loginUser, logoutUser, refreshedToken, registerUesr } from "../../controllers/auth/userAuthController.js";
import { loginValidation, registerValidation } from "../../middleware/validation/authValidation.js";

const router = express.Router()

router.post('/signup', registerValidation, registerUesr);
router.post('/login', loginValidation, loginUser);
router.post('/refresh', refreshedToken);
router.post('/logout', logoutUser);
router.get('/check', checkAuth);


export default router;