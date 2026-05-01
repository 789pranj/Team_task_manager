import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const createProject = (data) => api.post("/projects", data);
export const getProjects = () => api.get("/projects");
export const addMember = (id, userId) =>
  api.post(`/projects/${id}/add-member`, { userId });