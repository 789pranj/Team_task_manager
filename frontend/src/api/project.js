import axios from "axios";

const api = axios.create({
  baseURL: "https://team-task-manager-2ybh.onrender.com/api",
  withCredentials: true,
});

export const createProject = (data) => api.post("/projects", data);
export const getProjects = () => api.get("/projects");
export const addMember = (id, userId) =>
  api.post(`/projects/${id}/add-member`, { userId });