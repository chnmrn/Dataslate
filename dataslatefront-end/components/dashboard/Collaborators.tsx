"use client";

import { useEffect, useState } from "react";

interface GitHubCollaboratorsProps {
  repoUrl: string; 
}

export default function Collaborators({ repoUrl }: GitHubCollaboratorsProps) {
  const [collaborators, setCollaborators] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Convert GitHub repo URL to API path
  const extractRepoPath = (url: string) => {
    try {
      const parts = url.split("github.com/")[1];
      return parts?.replace(".git", "");
    } catch {
      return null;
    }
  };

  const repoPath = extractRepoPath(repoUrl);

  // Fetch collaborators from GitHub API
  useEffect(() => {
    if (!repoPath) {
      setError("Invalid GitHub repository URL.");
      return;
    }
    
    const fetchCollaborators = async () => {
      try {
        const res = await fetch(`https://api.github.com/repos/${repoPath}/collaborators`);
        const json = await res.json();

        if (Array.isArray(json)) {
          setCollaborators(json);
        } else {
          setError("No collaborators found or API limit reached.");
        }
      } catch (err) {
        setError("Failed to load collaborators.");
      }
    };

    fetchCollaborators();
  }, [repoPath]);

  if (!repoUrl) {
    return (
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-gray-400 text-sm">
        No collaborators — add a repository link first.
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-red-400">
        {error}
      </div>
    );
  }
  
  // Show loading state
  if (!collaborators.length) {
    return (
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-gray-400">
        Loading collaborators...
      </div>
    );
  }

if (collaborators.length === 0) {
  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-gray-400 text-sm">
      No collaborators found for this repository.
    </div>
  );
}



  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
      <h3 className="text-xl font-semibold mb-4">Collaborators</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {collaborators.map((c: any, index: number) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white/5 p-3 rounded-lg border border-white/10"
          >
            <img
              src={c.avatar_url}
              alt={c.login}
              className="w-12 h-12 rounded-full border border-white/20"
            />

            <div>
              <p className="text-gray-200 font-medium">{c.login}</p>
              <a
                href={c.html_url}
                target="_blank"
                className="text-blue-400 text-sm hover:underline"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
