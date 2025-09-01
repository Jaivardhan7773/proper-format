import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectDB } from "./config/db.js";
import userRoute from "./routes/auth/userRoute.js"
import AdminRoute from "./routes/other/AdminRoute.js"

dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', userRoute)
app.use('/api' , AdminRoute)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server is running of ${PORT}`))