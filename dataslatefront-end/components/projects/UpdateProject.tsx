"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EditProjectModalProps {
  open: boolean;
  onClose: () => void;
  project: any; 
  onUpdate: (project: any) => void;
}

export default function EditProjectModal({
  open,
  onClose,
  project,
  onUpdate,
}: EditProjectModalProps) {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setProjectName(project.projectName || "");
      setDescription(project.description || "");
      setRepoUrl(project.gitRepository || "");
    }
  }, [project]);

  const handleSubmit = async () => {
    if (!projectName.trim()) return;

    setLoading(true);

    const updatedProject = {
      ...project,
      projectName,
      description,
      gitRepository: repoUrl,
    };

    await onUpdate(updatedProject);
    setLoading(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Project">
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Input
          placeholder="GitHub Repository URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-indigo-600 text-white border border-indigo-400 hover:bg-indigo-500"
        >
          {loading ? "Updating..." : "Save Changes"}
        </Button>
      </div>
    </Modal>
  );
}

