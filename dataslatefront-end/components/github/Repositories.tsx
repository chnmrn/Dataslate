"use client";

import { GoStarFill } from "react-icons/go";
import { GoRepoForked } from "react-icons/go";
import { FaLaptop } from "react-icons/fa";
import { GoLink } from "react-icons/go";

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
        <div className="flex justify-between items-center mb-4 gap-1">
              <GoStarFill />
              <span> {repo.stargazers_count} stars</span>
        </div>
        <div className="flex justify-between items-center mb-4 gap-1">
              <GoRepoForked />
              <span> {repo.forks_count}</span>
        </div>
        <div className="flex justify-between items-center mb-4 gap-1">
          <FaLaptop />
          {repo.language && <span> {repo.language}</span>}  
        </div>
      </div>

      {/* Link */}
      <div className="flex gap-4 text-sm mt-4">
        <a
          href={repo.html_url}
          target="_blank"
          className="px-6 py-3 bg-indigo-600/20 border border-indigo-400 rounded-lg hover:bg-indigo-600/30 transition text-indigo-300 font-medium inline-block"
        >
         <div className="flex items-center gap-3">
            <GoLink /> 
            View Repository
         </div> 
        </a>
      </div>

    </div>
  );
}
