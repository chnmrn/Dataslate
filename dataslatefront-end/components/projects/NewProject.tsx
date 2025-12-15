"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NewProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (project: any) => void;
}

export default function NewProjectModal({
  open,
  onClose,
  onCreate,
}: NewProjectModalProps) {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!projectName.trim()) return;

    setLoading(true);

    const newProject = {
      projectName,
      description,
      gitRepository: repoUrl,
    };

    onCreate(newProject);
    setLoading(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Create New Project">
      <div className="flex flex-col gap-4">

        <Input
          placeholder="Project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <Input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Input
          placeholder="GitHub Repository URL (optional)"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-white/20 text-white border border-white/30 hover:bg-white/30"
        >
          {loading ? "Creating..." : "Create Project"}
        </Button>
      </div>
    </Modal>
  );
}
