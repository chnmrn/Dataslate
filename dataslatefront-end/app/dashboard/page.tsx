"use client"; // State that this is a client-side component
import Image from "next/image";
import { useEffect, useState } from "react";
import { getProjects } from "@/lib/api/services";
import { useRouter } from "next/navigation";

{/* Configuration */}
// Home component, holds fetched projects and hooks for navigation
export default function Home() {
  const [projects, setProjects] = useState<any[]>([]); 
  const router = useRouter(); 

  // Fetch projects on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        if (!token) {
          router.push("/"); // Redirect to home if no token
          return;
        }
        const projectsData = await getProjects(token);
        setProjects(projectsData);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [router]); // Empty dependency array ensures this runs once on mount

  return (
    <main className="bg-gradient-to-br from-gray-100 to-gray-300 dark:from-black dark:to-gray-900">
      {/* Main Section */}
      <section className="flex min-h-screen items-center justify-center px-12 py-32">
        <div className="flex flex-row items-center gap-12">

        <Image
          src="/Dataslate.png"
          alt="Dataslate Logo"
          width={540}
          height={540}
          priority
        />

        <div className="flex flex-col gap-4">
          <h1 className="text-7xl font-bold text-gray-900 dark:text-white tracking-wide">
            DataSlate
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            A modern project management tool for handling projects, tasks,
            and user data. Improve your efficiency and team collaboration.
          </p>
        </div>
      </div>
      </section>

      {/* About Section */}
      <section className="flex min-h-screen items-center justify-center px-12 py-32">
        <div className="max-w-2xl text-center">
            <h2 className="text-white dark:text-black text-4xl font-bold mb-6">
            What is Dataslate?
          </h2>
          <p className="text-gray-200 dark:text-gray-700 text-xl max-w-3xl mx-auto">
            Dataslate is a modern project management tool that helps you organize
            projects, track tasks, and collaborate efficiently. Built with ASP.NET Core
            and Next.js, it offers a seamless experience for managing your workflow and data.
          </p>
          <div className="flex justify-center gap-6 mt-8">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
              Sign Up
            </button>
            <button className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg shadow hover:bg-gray-300 transition dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
              Link with GitHub
            </button>
          </div>
        </div>
      </section>



      {/* Details Section */}
      <section className="flex min-h-screen items-center justify-center px-12 py-32">
        <div className="max-w-2xl text-center">
          {/* Add an Image or Video here */}
          <h2 className="text-white dark:text-black text-4xl font-bold mb-6">
            Make your projects easier to manage
          </h2>
          <p className="text-gray-300 dark:text-gray-700 text-xl max-w-3xl mx-auto">
            Dataslate provides a user-friendly interface to manage your projects and tasks
            effectively. With features like task tracking, project timelines, and user
            management, you can streamline your workflow and enhance team collaboration.
            Experience the power of modern project management with Dataslate.
          </p>
          <div>
            <button> Sign Up</button>
            <button> Link with GitHub</button>
          </div>
        </div>
      </section>

      {/* Repo Section */}
      <section className="flex min-h-screen items-center justify-center px-12 py-32">
        <div className="max-w-2xl text-center">
          <h2 className="text-white dark:text-black text-4xl font-bold mb-6">
            Check your latest repos
          </h2>
          <ul className="space-y-4">
            {projects.map((project) => (
              <li key={project.id} className="p-4 border rounded-lg bg-white/10 dark:bg-black/10">
                <h3 className="text-xl font-semibold">{project.projectName}</h3>
                <p>{project.description}</p>
                <span className="text-sm text-gray-400">Owner: {project.userName}</span>
              </li>
            ))}
          </ul>

        </div>
      </section>
    </main>
  );
}




