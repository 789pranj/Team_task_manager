import Task from "../models/task.model.js";
import Project from "../models/project.model.js";

// ✅ CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { title, description, project, assignedTo, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      priority,
      dueDate,
      status: "todo",
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

// ✅ GET TASKS
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId,
    }).populate("assignedTo", "name email");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// ✅ UPDATE TASK (ROLE BASED)
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    const project = await Project.findById(task.project);

    if (!task) return res.status(404).json({ message: "Task not found" });

    // Admin can update anything
    const isAdmin =
      project.admin.toString() === req.user._id.toString();

    // Member can update only their task
    const isOwner =
      task.assignedTo.toString() === req.user._id.toString();

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

// ✅ DASHBOARD STATS (FIXED)
export const getStats = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user._id,
    }).select("_id");

    const projectIds = projects.map(p => p._id);

    const tasks = await Task.find({
      project: { $in: projectIds },
    });

    const stats = {
      total: tasks.length,
      todo: tasks.filter(t => t.status === "todo").length,
      inProgress: tasks.filter(t => t.status === "in-progress").length,
      done: tasks.filter(t => t.status === "done").length,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};