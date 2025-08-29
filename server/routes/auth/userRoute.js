import express from "express";
import { registerUesr } from "../../controllers/auth/userAuthController.js";

const router = express.Router()

router.post('/signup' , registerUesr);

export default router;