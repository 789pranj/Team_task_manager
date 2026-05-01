import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  getStats,
} from "../controller/task.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

// protect all routes
router.use(protectRoute);

router.post("/", createTask);
router.put("/:id", updateTask);
router.get("/stats/overview", getStats); 
router.get("/:projectId", getTasks);  

export default router;