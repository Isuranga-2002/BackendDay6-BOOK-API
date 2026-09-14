const express = require("express");
require("dotenv").config();

const PORT = process.env.BE_PORT || 3000;
const app = express();

const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require("./routes/userRoutes");
const documentRoutes = require("./routes/documentRoutes");

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
    res.send("Server is running!")
});

app.use("/books", bookRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/documents", documentRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});