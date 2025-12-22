"use client";

import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";

interface CollaboratorsProps {
  repoUrl: string;
}

export default function Collaborators({ repoUrl }: CollaboratorsProps) {
  const [collaborators, setCollaborators] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Extract owner/repo from ANY valid GitHub URL
  const extractRepoPath = (url: string) => {
    try {
      if (!url) return null;

      const clean = url
        .trim()
        .replace(/^https?:\/\//i, "") 
        .replace(/^www\./i, "")       
        .replace(/\/$/, "");         

      const idx = clean.toLowerCase().indexOf("github.com/");
      if (idx === -1) return null;

      const parts = clean.substring(idx + "github.com/".length);
      return parts.replace(".git", "");
    } catch {
      return null;
    }
  };

  const repoPath = extractRepoPath(repoUrl);

  // Debug logs
  console.log("Collaborators repoUrl:", repoUrl);
  console.log("Collaborators repoPath:", repoPath);

  useEffect(() => {
    if (!repoPath) {
      setError("Invalid GitHub repository URL.");
      return;
    }

    const fetchCollaborators = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${repoPath}/collaborators`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            },
          }
        );

        // GitHub returns 404 for repos without collaborators endpoint enabled
        if (!res.ok) {
          setError("Could not load collaborators.");
          return;
        }

        const data = await res.json();
        setCollaborators(data);
      } catch (err) {
        setError("Failed to load collaborators.");
      }
    };

    fetchCollaborators();
  }, [repoPath]);

  // No repo provided yet
  if (!repoUrl) {
    return (
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-gray-400 text-sm">
        No collaborator data available yet.
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-red-400">
        {error}
      </div>
    );
  }

  // Loading state
  if (!collaborators.length) {
    return (
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-gray-400">
        Loading collaborators...
      </div>
    );
  }

  // Final UI
  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
      <div className="flex gap-3 text-gray-300 text-sm mb-4">
        <h3 className="text-xl font-semibold mb-4">Collaborators</h3>
        <FaUsers className="mt-1" size={20} />
      </div>
      
      <ul className="space-y-3">
        {collaborators.map((col: any, index: number) => (
          <li key={index} className="flex items-center gap-3">
            <img
              src={col.avatar_url}
              alt={col.login}
              className="w-10 h-10 rounded-full border border-white/20"
            />
            <span className="text-gray-300">{col.login}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

