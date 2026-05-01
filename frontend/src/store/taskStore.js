import { create } from "zustand";
import { getTasks, createTask, updateTask } from "../api/task";

export const useTaskStore = create((set) => ({
  tasks: [],

  fetchTasks: async (projectId) => {
    const res = await getTasks(projectId);
    set({ tasks: res.data });
  },

  addTask: async (data) => {
    const res = await createTask(data);
    set((state) => ({
      tasks: [...state.tasks, res.data],
    }));
  },

  updateTask: async (id, data) => {
    const res = await updateTask(id, data);
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t._id === id ? res.data : t
      ),
    }));
  },
}));