import { Router } from "express"
import { getUser, getUserById, loginUser, registerUser } from "../controllers/userController.js"


const router = Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/", getUser)
router.get("/:id", getUserById)




export default router