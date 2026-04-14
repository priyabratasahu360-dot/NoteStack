import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import noteRoutes from "./routes/note.route.js";
import userRoutes from "./routes/user.route.js";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/note", noteRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, (req, res) => {
    console.log(`Server is running port ${PORT}`);
    connectDB();
})