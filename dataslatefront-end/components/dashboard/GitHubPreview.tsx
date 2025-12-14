"use client";

import { useEffect, useState } from "react";

interface GitHubPreviewProps {
  repoUrl: string; 
}

export default function GitHubPreview({ repoUrl }: GitHubPreviewProps) {
  const [repoData, setRepoData] = useState<any>(null);
  const [commits, setCommits] = useState<any[]>([]);
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

  // Fetch repo data and latest commits from GitHub API
  useEffect(() => {
    if (!repoPath) {
      setError("Invalid GitHub repository URL.");
      return;
    }
    // Fetch repo details and commits
    const fetchRepoData = async () => {
      try {
        const repoRes = await fetch(`https://api.github.com/repos/${repoPath}`);
        const repoJson = await repoRes.json();

        const commitsRes = await fetch(
          `https://api.github.com/repos/${repoPath}/commits?per_page=3`
        );
        const commitsJson = await commitsRes.json();

        setRepoData(repoJson);
        setCommits(commitsJson);
      } catch (err) {
        setError("Failed to load GitHub data.");
      }
    };

    fetchRepoData();
  }, [repoPath]);

  if (!repoUrl) {
    return (
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-gray-400 text-sm">
        No GitHub data available yet - Create a project with a repository link.
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

  if (!repoData) {
    return (
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-gray-400">
        Loading GitHub data...
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
      <h3 className="text-xl font-semibold mb-4">GitHub Activity</h3>

      {/* Repo name */}
      <p className="text-gray-300 text-sm mb-2">
        <span className="font-semibold">{repoData.full_name}</span>
      </p>

      {/* Stats */}
      <div className="flex gap-6 text-gray-300 text-sm mb-4">
        <span>⭐ {repoData.stargazers_count}</span>
        <span>🍴 {repoData.forks_count}</span>
        <span>🐛 {repoData.open_issues_count} issues</span>
      </div>

      {/* Latest commits */}
      <h4 className="font-semibold text-gray-200 mb-2">Latest commits</h4>
      <ul className="space-y-2 text-gray-400 text-sm">
        {commits.map((c: any, index: number) => (
          <li key={index} className="border-b border-white/10 pb-2">
            <p className="text-gray-300">{c.commit.message}</p>
            <p className="text-xs text-gray-500 mt-1">
              {c.commit.author.name} —{" "}
              {new Date(c.commit.author.date).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

