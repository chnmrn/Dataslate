"use client";

import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { deleteTask } from "@/lib/api/services";

interface Task {
  id: number;
  taskTitle: string;
  status: boolean;
  projectId: number;
}

export default function DeleteTaskModal({
  open,
  onClose,
  task,
  onDelete,
}: {
  open: boolean;
  onClose: () => void;
  task: Task;
  onDelete: (id: number) => void;
}) {
  const handleDelete = async () => {
    const token = localStorage.getItem("token")!;
    await deleteTask(task.id, token);
    onDelete(task.id);
    onClose();
  };

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} title="Delete Project">
      <p className="text-gray-300 mb-4">
        Are you sure you want to delete <strong>{task.taskTitle}</strong>?
        This action cannot be undone.
      </p>

      <div className="flex gap-4">
        <Button
          onClick={handleDelete}
          className="bg-red-600 text-white border border-red-400 hover:bg-red-500"
        >
          Delete
        </Button>
        <Button
          onClick={onClose}
          className="bg-gray-600 text-white border border-gray-400 hover:bg-gray-500"
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}

