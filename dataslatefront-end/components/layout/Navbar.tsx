"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded: any = jwtDecode(token);
      const name =
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      setUsername(name);
    } catch (err) {
      console.error("Error decoding token", err);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const searchGitHubUser = async (e: any) => {
    if (e.key !== "Enter") return;
    if (!search.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(`https://api.github.com/users/${search}`);
      if (res.status === 404) {
        alert("User not found");
        setLoading(false);
        return;
      }

      const data = await res.json();
      router.push(`/github/user?username=${data.login}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/10 dark:bg-black/20 border-b border-white/20 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image src="/Dataslate.png" alt="Logo" width={40} height={40} />
          <span className="text-xl font-semibold text-white">Dataslate</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8 text-gray-200">
          <Link href="/dashboard" className="hover:text-white transition">
            Dashboard
          </Link>
          <Link href="/github/projects" className="hover:text-white transition">
            Projects
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search GitHub user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={searchGitHubUser}
            className="pl-10 pr-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition w-72"
          />
        </div>

        {/* User and Logout */}
        <div className="flex items-center gap-4">
          <span className="text-gray-200">Hi, {username}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white/20 text-white rounded-lg border border-white/30 hover:bg-white/30 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

