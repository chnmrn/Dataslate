"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/lib/api/services";
import EditTaskModal from "@/components/tasks/UpdateTask";
import DeleteTaskModal from "@/components/tasks/DeleteTask";

interface Task {
  id: number;
  taskTitle: string;
  status: boolean;
  projectId: number;
}

export default function TasksSection({ project }: { project: any }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token")!;
    getTasks(token)
      .then((data) => {
        const filtered = data.filter((t: Task) => t.projectId === project.id);
        setTasks(filtered);
      })
      .catch(() => setError("Failed to load tasks"));
  }, [project.id]);

  // Update Action
  const handleUpdate = (updated: Task) => {
    setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
  };

  // Delete Action
  const handleDelete = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
      <h2 className="text-xl font-semibold mb-4">
        Tasks for {project.projectName}
      </h2>

      {error && <p className="text-red-400">{error}</p>}

      {tasks.length === 0 ? (
        <p className="text-gray-400">No tasks yet for this project.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-white/5 p-4 rounded-lg border border-white/10 flex justify-between items-center"
            >
              <div>
                <h4 className="font-semibold">{task.taskTitle}</h4>
                <p className="text-gray-400 text-sm">
                  Status: {task.status ? "✅ Done" : "⏳ Pending"}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setEditingTask(task)}
                  className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeletingTask(task)}
                  className="px-4 py-2 bg-red-600/20 border border-red-600/40 rounded-lg hover:bg-red-600/30 transition text-red-400 text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modals */}
      {editingTask && (
        <EditTaskModal
          open={!!editingTask}
          onClose={() => setEditingTask(null)}
          task={editingTask}
          onUpdate={handleUpdate}
        />
      )}

      {deletingTask && (
        <DeleteTaskModal
          open={!!deletingTask}
          onClose={() => setDeletingTask(null)}
          task={deletingTask}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

