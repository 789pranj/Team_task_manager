import express from "express";
import {
  createProject,
  getProjects,
  addMember,
} from "../controller/project.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

// protect all routes
router.use(protectRoute);

router.post("/", createProject);
router.get("/", getProjects);
router.post("/:id/add-member", addMember);

export default router;
