require("./config/dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const itemRoutes = require("./routes/itemRoutes");
const limiter = require("./config/rateLimit");
const authRoutes = require("./routes/authRoutes");
const sanitizationRoutes = require("./routes/sanitizationRoutes");
const productRoutes = require('./routes/productRoutes');


const app = express();
app.use(express.json());
app.use(cors());
app.use(limiter);
app.use("/api/v1", itemRoutes);
app.use("/api/v1/user", authRoutes);
app.use("/api/v1/santise", sanitizationRoutes);
app.use('/api/v1', productRoutes);

connectDB(); // Connect to database

module.exports = app;
