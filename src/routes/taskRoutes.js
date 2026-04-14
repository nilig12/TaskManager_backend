import { Router } from "express"
import { createTask, deleteTask, getAllTask, getTaskById, updateTask } from "../controllers/taskController.js";
import { jwtVerify } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", jwtVerify, createTask)
router.get("/", jwtVerify, getAllTask)
router.get("/:id", jwtVerify, getTaskById)
router.put("/:id", jwtVerify, updateTask)
router.delete("/:id", jwtVerify, deleteTask)


export default router
