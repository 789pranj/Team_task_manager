import { useEffect, useState } from "react";
import { useProjectStore } from "../store/projectStore";
import AddTask from "../components/AddTask";
import TaskBoard from "../components/TaskBoard";
import Stats from "../components/Stats";
import { FolderPlus } from "lucide-react";

export const Dashboard = () => {
  const { projects, fetchProjects, addProject } = useProjectStore();
  const [name, setName] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchProjects();
    setRefreshKey(p => p + 1);
  }, []);

  const handleCreate = async () => {
    if (!name) return;
    await addProject({ name });
    setName("");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Your Projects
      </h1>

      {/* Stats */}
      <Stats refreshKey={refreshKey}/>

      {/* Create Project */}
      <div className="flex gap-3 mb-6">
        <input
          className="border p-2 rounded w-64"
          placeholder="New project"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FolderPlus size={18} />
          Create
        </button>
      </div>

      {/* Project List */}
      <div className="grid grid-cols-3 gap-4">
        {projects.map((p) => (
          <div
            key={p._id}
            onClick={() => setSelectedProject(p)}
            className={`p-4 rounded shadow cursor-pointer ${
              selectedProject?._id === p._id
                ? "bg-green-200"
                : "bg-green-50"
            }`}
          >
            <h2 className="font-semibold text-lg">{p.name}</h2>
          </div>
        ))}
      </div>

      {/* Task Section */}
      {selectedProject && (
        <>
          <h2 className="text-2xl mt-8 font-bold text-green-700">
            Tasks for {selectedProject.name}
          </h2>

          <AddTask projectId={selectedProject._id} onTaskChange={() => setRefreshKey(p => p + 1)} />
          <TaskBoard projectId={selectedProject._id} onTaskChange={() => setRefreshKey(p => p + 1)} />
        </>
      )}
    </div>
  );
}

export default Dashboard;