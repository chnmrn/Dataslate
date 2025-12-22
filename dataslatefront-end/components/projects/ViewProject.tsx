"use client";

import { useState } from "react";
import EditProjectModal from "@/components/projects/UpdateProject";
import DeleteProjectModal from "@/components/projects/DeleteProject";
import { updateProject, deleteProject, getProjects } from "@/lib/api/services";
import { GoLink } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

interface Project {
  id: number;
  projectName: string;
  description: string;
  gitRepository: string;
}

export default function ProjectsSection({
  projects,
  setProjects,
  selectedProject,
  setSelectedProject,
}: {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  selectedProject: Project | null;
  setSelectedProject: (p: Project | null) => void;
}) {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  const handleUpdate = async (project: Project) => {
    const token = localStorage.getItem("token")!;
    await updateProject(project.id, project, token);
    const updated = await getProjects(token);
    setProjects(updated);
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token")!;
    await deleteProject(id, token);
    setProjects(projects.filter((p) => p.id !== id));
    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }
  };

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div
          key={project.id}
          onClick={() => setSelectedProject(project)}
          className={`cursor-pointer bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hover:bg-white/20 transition ${
            selectedProject?.id === project.id ? "ring-2 ring-indigo-400" : ""
          }`}
        >
          <h2 className="text-xl font-semibold mb-2">{project.projectName}</h2>
          <p className="text-gray-400 text-sm mb-4">
            {project.description || "No description provided."}
          </p>

          <div className="flex gap-4 text-sm mt-4">
              {project.gitRepository && (
              <a
                href={project.gitRepository}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-indigo-600/20 border border-indigo-400 rounded-lg hover:bg-indigo-600/30 transition text-indigo-300 font-medium inline-block"
              >
                <div className="flex items-center gap-3">
                  <GoLink /> 
                  View Repository
                </div> 
              </a>
            )}
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditingProject(project);
              }}
              className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition"
            >
              <div className="flex items-center gap-3">
                <MdEdit />
                Edit
              </div>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setDeletingProject(project);
              }}
              className="px-6 py-3 bg-red-600/20 border border-red-600/40 rounded-lg hover:bg-red-600/30 transition text-red-400 hover:text-red-300"
            >
              <div className="flex items-center gap-3">
                <MdDelete />
                Delete
              </div>   
            </button>
          </div>
        </div>
      ))}

      {/* Modals */}
      {editingProject && (
        <EditProjectModal
          open={!!editingProject}
          onClose={() => setEditingProject(null)}
          project={editingProject}
          onUpdate={handleUpdate}
        />
      )}

      {deletingProject && (
        <DeleteProjectModal
          open={!!deletingProject}
          onClose={() => setDeletingProject(null)}
          project={deletingProject}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
