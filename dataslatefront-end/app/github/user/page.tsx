"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProfileInfo from "@/components/github/ProfileInfo";
import Repositories from "@/components/github/Repositories";



export default function GitHubUserPage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const [user, setUser] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!username) {
      setError("No username provided.");
      setLoading(false);
      return;
    }

    // Fetch GitHub user data and repositories
    const fetchData = async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (userRes.status === 404) {
          setError("User not found.");
          setLoading(false);
          return;
        }
        
        const userJson = await userRes.json();

        // Fetch repositories
        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated`
        );
        const reposJson = await reposRes.json();

        setUser(userJson);
        setRepos(reposJson);
      } catch (err) {
        setError("Failed to load GitHub data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  // Loading state
  if (loading) {
    return (
      <main className="pt-28 px-12 text-white">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-gray-300">
          Loading GitHub profile...
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="pt-28 px-12 text-white">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-red-400">
          {error}
        </div>
      </main>
    );
  }

  return (
    <>
      <Navbar /> 
        <main className="pt-28 px-12 text-white min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">

        {/* Header */}
        <section className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 mb-8">
            <ProfileInfo user={user} />
        </section>

        {/* Repositories */}
        <section className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map((repo: any) => (
                <Repositories key={repo.id} repo={repo} />
            ))}
            </div>
        </section>
        </main>
      <Footer />
    </>
  );
}
