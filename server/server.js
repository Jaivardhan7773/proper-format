import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectDB } from "./config/db.js";
import userRoute from "./routes/auth/userRoute.js"

dotenv.config();
connectDB();

const app = express();
app.use(express.json());


// app.use(cookieParser());
// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true
// }))

app.use('/api' , userRoute)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server is running of ${PORT}`))