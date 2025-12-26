"use client";

import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { getCollaborators } from "@/lib/api/services"; 
import { GoLink } from "react-icons/go";

interface CollaboratorsProps {
  repoUrl: string;
}

export default function Collaborators({ repoUrl }: CollaboratorsProps) {
  const [collaborators, setCollaborators] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Extract owner/repo from URL
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

  useEffect(() => {
    if (!repoPath) {
      setError("Invalid GitHub repository URL.");
      return;
    }

    const fetchCollaborators = async () => {
      try {
        const [owner, repo] = repoPath.split("/"); 
        const data = await getCollaborators(owner, repo);
        setCollaborators(data);
      } catch (err) {
        setError("Could not load collaborators.");
      }
    };

    fetchCollaborators();
  }, [repoPath]);

  // No repo URL
  if (!repoUrl) {
    return (
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-gray-400 text-sm">
        No collaborator data available yet.
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-red-400">
        {error}
      </div>
    );
  }

  // Loading
  if (!collaborators.length) {
    return (
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-gray-400">
        Loading collaborators...
      </div>
    );
  }

  // UI final
  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
      <div className="flex gap-3 text-gray-300 text-sm mb-4">
        <h3 className="text-xl font-semibold mb-4">Collaborators</h3>
        <FaUsers className="mt-1" size={20} />
      </div>

      <ul className="space-y-3 ">
        {collaborators.map((col: any, index: number) => (
          <li key={index} className="flex justify-between items-center gap-4 border-b border-white/10 pb-2">
            <div className="flex items-center gap-3">
              <img
                src={col.avatar_url}
                alt={col.login}
                className="w-10 h-10 rounded-full border border-white/20"
              />
              <span className="text-gray-300">{col.login}</span>
            </div>
            
            <div>
              <a
              href={col.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-indigo-600/20 border border-indigo-400 rounded-lg hover:bg-indigo-600/30 transition text-indigo-300 font-medium inline-block"
            >
              <div className="flex items-center gap-3">
                <GoLink /> 
                View Profile
              </div>
            </a>
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  );
}