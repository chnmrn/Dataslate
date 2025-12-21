"use client";

import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";

interface DeleteProjectModalProps {
  open: boolean;
  onClose: () => void;
  project: any;
  onDelete: (id: number) => void;
}

export default function DeleteProjectModal({
  open,
  onClose,
  project,
  onDelete,
}: DeleteProjectModalProps) {
  const handleDelete = async () => {
    await onDelete(project.id);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Delete Project">
      <p className="text-gray-300 mb-4">
        Are you sure you want to delete <strong>{project.projectName}</strong>?
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

