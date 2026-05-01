import Project from "../models/project.model.js";

// Create Project
export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      admin: req.user._id,
      members: [req.user._id],
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error creating project" });
  }
};

// Get My Projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user._id,
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects" });
  }
};

// Add Member (Admin only)
export const addMember = async (req, res) => {
  try {
    const { userId } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (!project.members.includes(userId)) {
      project.members.push(userId);
    }

    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error adding member" });
  }
};