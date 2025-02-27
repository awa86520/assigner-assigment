require("./config/dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const itemRoutes = require("./routes/itemRoutes");
const limiter = require("./config/rateLimit");


const app = express();
app.use(express.json());
app.use(cors());
app.use(limiter);
app.use("/api/v1", itemRoutes);

connectDB(); // Connect to database

module.exports = app;
