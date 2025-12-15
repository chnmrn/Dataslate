"use client";

interface GitHubUserHeaderProps {
  user: any;
}

export default function ProfileInfo({ user }: GitHubUserHeaderProps) {
  return (
    <section className="flex flex-col md:flex-row items-center md:items-start gap-6">

      {/* Avatar */}
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-40 h-40 rounded-full border border-white/20"
      />

      {/* User Info */}
      <div className="flex-1">
        <h1 className="text-3xl font-semibold mb-1">{user.login}</h1>

        {user.name && (
          <p className="text-gray-300 text-lg mb-2">{user.name}</p>
        )}

        <p className="text-gray-400 text-sm max-w-xl">
          {user.bio || "No bio available."}
        </p>

        {/* Stats */}
        <div className="flex gap-6 mt-4 text-gray-300 text-sm">
          <span>👥 Followers: {user.followers}</span>
          <span>⭐ Public Repos: {user.public_repos}</span>
          {user.location && <span>📍 {user.location}</span>}
        </div>
      </div>
    </section>
  );
}

