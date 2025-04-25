import express from "express";

const app = express();
const PORT = 5001;


app.get("/", (req, res) => {
    res.send("I just finished YOU season 5 kinda underwhelming")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})