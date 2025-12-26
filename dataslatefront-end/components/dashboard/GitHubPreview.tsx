"use client";

import { useEffect, useState } from "react";
import { IoLogoGithub } from "react-icons/io5";
import { GoStarFill, GoRepoForked, GoIssueTracks } from "react-icons/go";
import { getGitHubCommits, getGitHubIssues } from "@/lib/api/services";

interface GitHubPreviewProps {
  repoUrl: string;
  projects: any[];
  onSelectProject: (project: any) => void;
}

export default function GitHubPreview({ repoUrl, projects, onSelectProject }: GitHubPreviewProps) {
  const [repoData, setRepoData] = useState<any>(null);
  const [commits, setCommits] = useState<any[]>([]);
  const [issues, setIssues] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Extract owner/repo from URL
  const extractRepoPath = (url: string) => {
    try {
      if (!url) return null;
      const clean = url.trim().replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/$/, "");
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

    const fetchRepoData = async () => {
      try {
        const [owner, repo] = repoPath.split("/");

        const commitsData = await getGitHubCommits(owner, repo);
        const issuesData = await getGitHubIssues(owner, repo);

        setRepoData({
          full_name: `${owner}/${repo}`,
          stargazers_count: 0, 
          forks_count: 0,
          open_issues_count: issuesData.length,
        });

        setCommits(commitsData);
        setIssues(issuesData);
      } catch (err) {
        setError("Failed to load GitHub data.");
      }
    };

    fetchRepoData();
  }, [repoPath]);

  if (error) return <div className="text-red-400 mb-4">{error}</div>;
  if (!repoData && !error) return <div className="text-gray-400">Loading GitHub data...</div>;

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">GitHub Activity</h3>
        <IoLogoGithub size={25} />
      </div>

      <p className="text-gray-300 text-sm mb-2">
        <span className="font-semibold">{repoData.full_name}</span>
      </p>

      <div className="flex gap-6 text-gray-300 text-sm mb-4">
        <div className="flex items-center gap-1">
          <GoStarFill />
          <span>{repoData.stargazers_count} stars</span>
        </div>
        <div className="flex items-center gap-1">
          <GoRepoForked />
          <span>{repoData.forks_count} forks</span>
        </div>
        <div className="flex items-center gap-1">
          <GoIssueTracks />
          <span>{repoData.open_issues_count} issues</span>
        </div>
      </div>

      <h4 className="font-semibold text-gray-200 mb-2">Latest commits</h4>
      <ul className="space-y-2 text-gray-400 text-sm">
        {commits.slice(0, 3).map((c: any, index: number) => (
          <li key={index} className="border-b border-white/10 pb-2">
            <p className="text-gray-300">{c.commit.message}</p>
            <p className="text-xs text-gray-500 mt-1">
              {c.commit.author.name} — {new Date(c.commit.author.date).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}