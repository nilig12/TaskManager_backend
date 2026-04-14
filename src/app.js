import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

import UserRoute from "./routes/userRoutes.js"
import TaskRoute from "./routes/taskRoutes.js"

app.use("/api/auth", UserRoute)
app.use("/api/tasks", TaskRoute)


export default app;