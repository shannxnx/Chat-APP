import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./lib/socket.js";
import chatBgRoutes from "./routes/chatBg.route.js";
import chatNn from "./routes/chatNickName.route.js"


dotenv.config();                        //because of this we can use (process.env.PORT)

const PORT = process.env.PORT;    

app.use(cors({                          //important because this will allow the backend to talk to the frontend
    origin : "http://localhost:5173",
    credentials : true
}));

app.use(express.json());                //so we can get json in the body
app.use(cookieParser());                //allows to parse the cookie

app.use("/api/auth", authRoutes);       //for authentication (login, signup, logout);
app.use("/api/message", messageRoutes); //for message
app.use("/api/chatBg", chatBgRoutes);
app.use("api/chat-nickname", chatNn);

app.get("/", (req, res) => {
    res.send("I hope your a fuckery okay");
    
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();                      //connect to the mongoDB
})