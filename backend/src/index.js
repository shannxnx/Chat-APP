// import express from "express";
// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import dotenv from "dotenv";
// import { connectDB } from "./lib/db.js";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import { app, server } from "./lib/socket.js";
// import chatBgRoutes from "./routes/chatBg.route.js";
// import chatNn from "./routes/chatNickName.route.js";

// import path from "path";


// dotenv.config();                        //because of this we can use (process.env.PORT)

// const PORT = process.env.PORT;    
// const __dirname = path.resolve();

// app.use(express.json());                //so we can get json in the body
// app.use(cookieParser());                //allows to parse the cookie

// app.use(cors({                          //important because this will allow the backend to talk to the frontend
//     origin : "http://localhost:5173",
//     credentials : true
// }));



// app.use("/api/auth", authRoutes);       //for authentication (login, signup, logout);
// app.use("/api/message", messageRoutes); //for message
// app.use("/api/chatBg", chatBgRoutes);
// app.use("/api/chat-nickname", chatNn);

// if (process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));

//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
//     })
// }

// app.get("/", (req, res) => {
//     res.send("I hope your a fuckery okay");
    
// })

// server.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//     connectDB();       //connect to the mongoDB
    
// })


//-------------------------TEST---------------------------------
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

// Initialize environment variables first
dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

console.log("=== STARTING SERVER INITIALIZATION ===");

// Step 1: Initialize socket (this might be where the error occurs)
console.log("Step 1: Importing socket.js...");
try {
    const { app, server } = await import("./lib/socket.js");
    console.log("✓ Socket.js imported successfully");
    
    // Step 2: Setup middleware
    console.log("Step 2: Setting up middleware...");
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true
    }));
    console.log("✓ Middleware setup complete");

    // Step 3: Import and setup routes one by one
    console.log("Step 3: Setting up routes...");
    
    console.log("3a: Importing auth routes...");
    try {
        const authRoutes = await import("./routes/auth.route.js");
        app.use("/api/auth", authRoutes.default);
        console.log("✓ Auth routes setup complete");
    } catch (error) {
        console.error("❌ Error in auth routes:", error.message);
        throw error;
    }

    console.log("3b: Importing message routes...");
    try {
        const messageRoutes = await import("./routes/message.route.js");
        app.use("/api/message", messageRoutes.default);
        console.log("✓ Message routes setup complete");
    } catch (error) {
        console.error("❌ Error in message routes:", error.message);
        throw error;
    }

    console.log("3c: Importing chatBg routes...");
    try {
        const chatBgRoutes = await import("./routes/chatBg.route.js");
        app.use("/api/chatBg", chatBgRoutes.default);
        console.log("✓ ChatBg routes setup complete");
    } catch (error) {
        console.error("❌ Error in chatBg routes:", error.message);
        throw error;
    }

    console.log("3d: Importing chat nickname routes...");
    try {
        const chatNn = await import("./routes/chatNickName.route.js");
        app.use("/api/chat-nickname", chatNn.default);
        console.log("✓ Chat nickname routes setup complete");
    } catch (error) {
        console.error("❌ Error in chat nickname routes:", error.message);
        throw error;
    }

    // Step 4: Setup production static files
    console.log("Step 4: Setting up production static files...");
    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../frontend/dist")));
        
        app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
        });
        console.log("✓ Production static files setup complete");
    }

    // Step 5: Setup default route
    console.log("Step 5: Setting up default route...");
    app.get("/", (req, res) => {
        res.send("Server is running successfully!");
    });
    console.log("✓ Default route setup complete");

    // Step 6: Start server
    console.log("Step 6: Starting server...");
    server.listen(PORT, () => {
        console.log(`✓ Server is running on http://localhost:${PORT}`);
        connectDB();
    });

} catch (error) {
    console.error("=== SERVER INITIALIZATION FAILED ===");
    console.error("Error details:", error);
    console.error("Stack trace:", error.stack);
    process.exit(1);
}