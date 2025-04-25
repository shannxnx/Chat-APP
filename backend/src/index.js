import express from "express";

const app = express();
const PORT = 5001;


// app.get("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("I hope your a fuckery okay")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})