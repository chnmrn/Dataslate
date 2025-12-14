"use client";

import Navbar from "@/components/layout/Navbar";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getProjects, getTasks } from "@/lib/api/services";
import Welcome from "@/components/dashboard/Welcome";
import Projects from "@/components/dashboard/Projects";
import Metrics from "@/components/dashboard/Metrics";
import TaskStatus from "@/components/dashboard/TaskStatus";
import GitHubPreview from "@/components/dashboard/GitHubPreview";
import Collaborators from "@/components/dashboard/Collaborators";
import Footer from "@/components/layout/Footer";



// The Interfaces are for TypeScript type checking
interface Project {
  id: number;
  projectName: string;
  description: string;
  gitRepository: string;
}

interface Task {
  id: number;
  taskTitle: string;
  status: boolean;
  projectId: number;
}

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  // On component mount, decode token and fetch data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Decode username
    const decoded: any = jwtDecode(token);
    const name =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    setUsername(name);

    // Fetch data
    getProjects(token).then(setProjects);
    getTasks(token).then(setTasks);
  }, []);

  return (
    <>
      <Navbar /> 

      <main className="pt-28 px-12 bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen text-white">

        {/* Welcome, Metrics and Buttons */}
        <section className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
          <Welcome username={username} />

          <div className="w-full md:w-auto">
            <Metrics projects={projects} tasks={tasks} />
          </div>
        </section>

        {/* Dashboard part 1 */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <TaskStatus tasks={tasks} />

          <div className="md:col-span-2">
            <Projects projects={projects} />
          </div>

        </section>

       {/* Dashboard part 2 */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="md:col-span-2">
              <GitHubPreview repoUrl={projects[0]?.gitRepository} />
          </div>

          <div>
              <Collaborators repoUrl={projects[0]?.gitRepository} />
          </div>

        </section>
      </main>
      <Footer />
    </>
  );
};
