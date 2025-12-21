"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProjects } from "@/lib/api/services";
import ProjectsSection from "@/components/projects/ViewProject";
import TasksSection from "@/components/tasks/ViewTasks";

interface Project {
  id: number;
  projectName: string;
  description: string;
  gitRepository: string;
}

export default function AllProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to view your projects.");
      setLoading(false);
      return;
    }

    getProjects(token)
      .then((data) => setProjects(data))
      .catch(() => setError("Failed to load projects."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

      <main className="pt-28 px-12 bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen text-white">
        <h1 className="text-4xl font-semibold mb-8">All Projects</h1>

        {/* Loading */}
        {loading && (
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-gray-300">
            Loading projects...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-red-400">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && projects.length === 0 && (
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-gray-300">
            You don't have any projects yet.
          </div>
        )}

        {/* Sections */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Side: Projects */}
            <ProjectsSection
              projects={projects}
              setProjects={setProjects}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
            />

            {/* Right Side: Tasks */}
            <div>
              {!selectedProject ? (
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-gray-400">
                  Select a project to view its tasks.
                </div>
              ) : (
                <TasksSection project={selectedProject} />
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
