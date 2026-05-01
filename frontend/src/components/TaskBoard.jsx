import { useEffect } from "react";
import { useTaskStore } from "../store/taskStore";
import { CheckCircle, Clock, ListTodo, Calendar } from "lucide-react";

export const TaskBoard = ({ projectId, onTaskChange }) => {
  const { tasks, fetchTasks, updateTask } = useTaskStore();

  useEffect(() => {
    fetchTasks(projectId);
  }, [projectId]);

  const moveTask = async (task, status) => {
    await updateTask(task._id, { status });
    await fetchTasks(projectId);
    onTaskChange();
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const columns = [
    {
      key: "todo",
      title: "To Do",
      color: "bg-red-100",
      icon: <ListTodo size={18} />,
    },
    {
      key: "in-progress",
      title: "In Progress",
      color: "bg-yellow-100",
      icon: <Clock size={18} />,
    },
    {
      key: "done",
      title: "Done",
      color: "bg-green-100",
      icon: <CheckCircle size={18} />,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 mt-6">
      {columns.map((col) => (
        <div key={col.key} className={`${col.color} p-4 rounded-xl shadow`}>
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            {col.icon}
            <h3 className="font-bold text-lg">{col.title}</h3>
          </div>

          {/* Tasks */}
          {tasks
            .filter((t) => t.status === col.key)
            .map((task) => (
              <div
                key={task._id}
                className={`bg-white p-4 mb-3 rounded-lg shadow transition hover:shadow-md ${
                  isOverdue(task.dueDate) ? "border-l-4 border-red-500" : ""
                }`}
              >
                {/* Title */}
                <p className="font-semibold text-gray-800">
                  {task.title}
                </p>

                {/* Meta Info */}
                <div className="text-xs text-gray-500 mt-2 space-y-1">
                  <p>👤 {task.assignedTo?.name || "Unassigned"}</p>
                  <p>⚡ {task.priority}</p>

                  {/* 📅 DATE FEATURE ADDED */}
                  {task.dueDate && (
                    <p
                      className={`flex items-center gap-1 ${
                        isOverdue(task.dueDate)
                          ? "text-red-600 font-semibold"
                          : ""
                      }`}
                    >
                      <Calendar size={12} />
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                      {isOverdue(task.dueDate) && " (Overdue)"}
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-3 flex-wrap">
                  {columns.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => moveTask(task, c.key)}
                      className="text-xs px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      {c.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;