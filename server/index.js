import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import packageRoutes from "./routes/packages.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

import fs from "fs";
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/packages", packageRoutes);

app.get("/", (req, res) => {
  res.send("RRB Vacations API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
