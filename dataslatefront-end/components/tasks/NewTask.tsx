"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NewTaskModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (task: any) => void;
  projects: any[]; // List of projects to associate the task with
}

export default function NewTask({
  open,
  onClose,
  onCreate,
  projects,
}: NewTaskModalProps) {
  const [taskTitle, setTaskTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!taskTitle.trim() || !projectId) return;

    setLoading(true);

    const newTask = {
      taskTitle,
      status: false,
      projectId: Number(projectId),
    };

    onCreate(newTask);
    setLoading(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Create New Task">
      <div className="flex flex-col gap-4">

        <Input
          placeholder="Task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />

        {/* Select project */}
        <select
          className="bg-white/10 border border-white/20 rounded-lg p-3 text-white"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        >
          <option value="">Select a project</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id} className="text-black">
              {p.projectName}
            </option>
          ))}
        </select>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-white/20 text-white border border-white/30 hover:bg-white/30"
        >
          {loading ? "Creating..." : "Create Task"}
        </Button>
      </div>
    </Modal>
  );
}
