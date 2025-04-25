const express = require('express');

const app = express();
const PORT = 5001;

app.get('/', (req, res) => {
    res.send("Im running and I see YOU")  
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})