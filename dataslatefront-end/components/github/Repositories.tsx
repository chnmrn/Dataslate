"use client";

interface Repositories {
  repo: any;
}

export default function Repositories({ repo }: Repositories) {
  return (
    <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition">
      {/* Repo name */}
      <h3 className="font-semibold text-white">{repo.name}</h3>

      {/* Description */}
      <p className="text-gray-400 text-sm mt-1">
        {repo.description || "No description available."}
      </p>

      {/* Stats */}
      <div className="flex gap-4 text-gray-300 text-sm mt-3">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
        {repo.language && <span>💻 {repo.language}</span>}
      </div>

      {/* Link */}
      <div className="mt-4">
        <a
          href={repo.html_url}
          target="_blank"
          className="px-6 py-3 bg-gray-800 border border-white/20 rounded-lg hover:bg-white/20 transition"
        >
          View on GitHub
        </a>
      </div>

    </div>
  );
}
