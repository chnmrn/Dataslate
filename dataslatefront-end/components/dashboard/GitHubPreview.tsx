"use client";

import { useEffect, useState } from "react";

interface GitHubPreviewProps {
  repoUrl: string;
  projects: any[];
  onSelectProject: (project: any) => void;
}

export default function GitHubPreview({ repoUrl, projects, onSelectProject }: GitHubPreviewProps) {
  const [repoData, setRepoData] = useState<any>(null);
  const [commits, setCommits] = useState<any[]>([]);
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

  useEffect(() => {
    if (!repoPath) {
      setError("Invalid GitHub repository URL.");
      return;
    }

    // Fetch repo data and latest commits
    const fetchRepoData = async () => {
      try {
        const repoRes = await fetch(`https://api.github.com/repos/${repoPath}`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
        });

        const repoJson = await repoRes.json();

        // Fetch latest 3 commits
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

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">GitHub Activity</h3>

        {/* Projects */}
        <select
          className="bg-gray-800 text-white px-3 py-1 rounded-md border border-white/20"
          onChange={(e) => {
            const project = projects.find(p => p.id === Number(e.target.value));
            onSelectProject(project);
          }}
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.projectName}
            </option>
          ))}
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="text-red-400 mb-4">{error}</div>
      )}

      {/* Loading */}
      {!repoData && !error && (
        <div className="text-gray-400">Loading GitHub data...</div>
      )}

      {/* Repo info */}
      {repoData && (
        <>
          <p className="text-gray-300 text-sm mb-2">
            <span className="font-semibold">{repoData.full_name}</span>
          </p>

          <div className="flex gap-6 text-gray-300 text-sm mb-4">
            <span> {repoData.stargazers_count} stars</span>
            <span> {repoData.forks_count} forks</span>
            <span> {repoData.open_issues_count} issues</span>
          </div>

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
        </>
      )}
    </div>
  );
}

