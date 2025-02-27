require("./config/dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const itemRoutes = require("./routes/itemRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", itemRoutes);

connectDB(); // Connect to database

module.exports = app;
