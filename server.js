const express = require("express");
require("dotenv").config();

const PORT = process.env.BE_PORT || 3000;
const app = express();
const bookRoutes = require('./routes/bookRoutes');

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running!")
});

app.use("/books", bookRoutes);

app.listen(PORT, () => {
    console.log("Server running");
});