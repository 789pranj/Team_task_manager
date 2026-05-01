import { create } from "zustand";
import { getProjects, createProject } from "../api/project";

export const useProjectStore = create((set) => ({
  projects: [],

  fetchProjects: async () => {
    const res = await getProjects();
    set({ projects: res.data });
  },

  addProject: async (data) => {
    const res = await createProject(data);
    set((state) => ({
      projects: [...state.projects, res.data],
    }));
  },
}));