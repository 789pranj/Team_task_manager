import { useState } from "react";
import PropTypes from "prop-types";
import { useTaskStore } from "../store/taskStore";
import { useAuthStore } from "../store/auth";
import { PlusCircle, FileText, Calendar, Flag } from "lucide-react";

export const AddTask = ({ projectId, onTaskChange }) => {
  const { addTask } = useTaskStore();
  const user = useAuthStore((s) => s.user);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  const handleAdd = async () => {
    if (!form.title) return;

    await addTask({
      title: form.title,
      description: form.description,
      project: projectId,
      assignedTo: user._id,
      priority: form.priority,
      dueDate: form.dueDate,
      status: "todo",
    });

    onTaskChange();

    setForm({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mt-6 max-w-xl">
      
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        ✨ Create New Task
      </h2>

      {/* Task Title */}
      <div className="relative mb-4">
        <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Task title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
        />
      </div>

      {/* Description */}
      <textarea
        placeholder="Task description..."
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
        className="w-full border p-3 rounded-lg mb-4 focus:ring-2 focus:ring-green-400 outline-none"
      />

      {/* Priority + Date */}
      <div className="flex gap-4 mb-4">
        
        {/* Priority */}
        <div className="relative w-1/2">
          <Flag className="absolute left-3 top-3 text-gray-400" size={16} />
          <select
            value={form.priority}
            onChange={(e) =>
              setForm({ ...form, priority: e.target.value })
            }
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>

        {/* Due Date */}
        <div className="relative w-1/2">
          <Calendar className="absolute left-3 top-3 text-gray-400" size={16} />
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) =>
              setForm({ ...form, dueDate: e.target.value })
            }
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>
      </div>

      {/* Button */}
      <button
        onClick={handleAdd}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition"
      >
        <PlusCircle size={18} />
        Add Task
      </button>
    </div>
  );
};

AddTask.propTypes = {
  projectId: PropTypes.string.isRequired,
  onTaskChange: PropTypes.func.isRequired,
};

export default AddTask;