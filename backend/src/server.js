import express from "express";
import dotenv from "dotenv";
dotenv.config();


import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, (req, res) => {
    console.log(`Server is running port ${PORT}`);
    connectDB();
})