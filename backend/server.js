// server.js
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes"); // Add this line
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes); // Mount userRoutes at /api for routes like /api/account/:userId

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
