import axios from "axios";

const api = axios.create({
  baseURL: "https://team-task-manager-2ybh.onrender.com/api",
  withCredentials: true,
});

export const createTask = (data) => api.post("/tasks", data);
export const getTasks = (projectId) => api.get(`/tasks/${projectId}`);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const getStats = () => api.get("/tasks/stats/overview");