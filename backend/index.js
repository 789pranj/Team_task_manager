import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import projectRoutes from "./routes/project.route.js";
import taskRoutes from "./routes/task.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.set("trust proxy", 1);

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://team-task-manager-1-899j.onrender.com"
    ],
    credentials: true,
}));
connectDB();

app.get("/", (req, res) => {
    res.send("Welcome to the Task Manager API");
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
