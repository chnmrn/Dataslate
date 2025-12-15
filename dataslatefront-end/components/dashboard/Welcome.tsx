"use client";

import { useState } from "react";
import NewProject from "@/components/projects/NewProject";
import NewTask from "@/components/tasks/NewTask";

interface WelcomeProps {
  username: string;
  onCreateProject: (project: any) => void;
  onCreateTask: (task: any) => void;
  projects: any[];
}

export default function Welcome({
  username,
  onCreateProject,
  onCreateTask,
  projects,
}: WelcomeProps) {
  const [openProject, setOpenProject] = useState(false);
  const [openTask, setOpenTask] = useState(false);

  return (
    <section className="mb-16">
      <div className="mb-6">
        <h1 className="text-5xl font-anta mb-2">
          Welcome, {username}
        </h1>
        <p className="text-gray-400 text-lg">
          Check on your latest projects and tasks below.
        </p>
      </div>



      <div className="flex gap-4">
        <button
          className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
          onClick={() => setOpenProject(true)}
        >
          New Project
        </button>

         <button
          className="px-6 py-3 bg-cyan-600 rounded-lg hover:bg-cyan-700 transition"
          onClick={() => setOpenTask(true)}
        >
          New Task
        </button>

        <button
          className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition"
          onClick={() => window.location.href = "/github/projects"}
        >
          View All Projects
        </button>


      </div>

      <NewProject
        open={openProject}
        onClose={() => setOpenProject(false)}
        onCreate={onCreateProject}
      />

      <NewTask
        open={openTask}
        onClose={() => setOpenTask(false)}
        onCreate={onCreateTask}
        projects={projects}
      />

    </section>
  );
}
