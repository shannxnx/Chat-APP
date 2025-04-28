import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";


dotenv.config();                     //because of this we can use (process.env.PORT)
const app = express();
const PORT = process.env.PORT;    

app.use(cors());                     //important because this will allow the backend to talk to the frontend
app.use(express.json());             //so we can get json in the body
app.use(cookieParser());             //allows to parse the cookie

app.use("/api/auth", authRoutes);    //for authentication (login, signup, logout);

app.get("/", (req, res) => {
    res.send("I hope your a fuckery okay")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();                      //connect to the mongoDB
})