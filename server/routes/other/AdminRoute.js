import express from 'express'
import {  GetUsers } from "../../controllers/other/adminController.js"
import { useAuthMiddleware } from '../../middleware/checker/userAuthMiddleware.js'
const router = express.Router()

router.get('/users', useAuthMiddleware, GetUsers);

export default router;