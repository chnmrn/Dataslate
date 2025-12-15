"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProjects } from "@/lib/api/services";
import { jwtDecode } from "jwt-decode";

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

        {/* Projects Grid */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hover:bg-white/20 transition"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {project.projectName}
                </h2>

                <p className="text-gray-400 text-sm mb-4">
                  {project.description || "No description provided."}
                </p>

                {project.gitRepository && (
                  <a
                    href={project.gitRepository}
                    target="_blank"
                    className="text-indigo-400 text-sm hover:underline"
                  >
                    View Repository →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

