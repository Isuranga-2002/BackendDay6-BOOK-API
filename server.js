const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load('./docs/openapi.yaml');

require("dotenv").config();

const PORT = process.env.BE_PORT || 3000;
const app = express();

const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require("./routes/userRoutes");
const documentRoutes = require("./routes/documentRoutes");


//Middlewear
app.use(cors());
app.use(express.json());

//Health Check
app.get("/", (req, res) => {
    res.send("Server is running!")
});
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK"
    });
});

//APIs
app.use("/books", bookRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/documents", documentRoutes);
app.use("/uploads", express.static("uploads"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 404
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        message: "Internal server error"
    });

});


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});