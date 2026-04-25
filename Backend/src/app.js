const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/db");
const authRoutes = require("./routes/auth.routes");
const musicRoutes = require("./routes/music.routes");
const cors = require("cors");

if (process.env.NODE_ENV !== "test") {
  connectDB();
}

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);

module.exports = app;