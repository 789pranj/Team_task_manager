import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const createTask = (data) => api.post("/tasks", data);
export const getTasks = (projectId) => api.get(`/tasks/${projectId}`);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const getStats = () => api.get("/tasks/stats/overview");