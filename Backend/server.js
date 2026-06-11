const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("🌾 Organic Farming Backend Running");
});

// Routes (SAFE LOAD)
try {
  app.use("/api/crops", require("./routes/cropRoutes"));
} catch (err) {
  console.log("⚠ cropRoutes missing");
}

// MongoDB connection (SAFE)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err.message));

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});