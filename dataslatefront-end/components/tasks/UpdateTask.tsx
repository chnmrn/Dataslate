"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateTask } from "@/lib/api/services";

interface Task {
  id: number;
  taskTitle: string;
  status: boolean;
  projectId: number;
}

interface EditTaskModalProps {
  open: boolean;
  onClose: () => void;
  task: Task;
  onUpdate: (task: Task) => void;
}

export default function EditTaskModal({
  open,
  onClose,
  task,
  onUpdate,
}: EditTaskModalProps) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  // sync when task changes
  useEffect(() => {
    if (task) {
      setTitle(task.taskTitle || "");
      setStatus(task.status || false);
    }
  }, [task]);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    setLoading(true);

    const token = localStorage.getItem("token")!;
    await updateTask(task.id, { taskTitle: title, status }, token);

    onUpdate({ ...task, taskTitle: title, status });
    setLoading(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Task">
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="flex items-center gap-2 text-gray-300">
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
          Completed
        </label>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-white/20 text-white border border-white/30 hover:bg-white/30"
        >
          {loading ? "Updating..." : "Save Changes"}
        </Button>
      </div>
    </Modal>
  );
}

