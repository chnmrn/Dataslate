"use client";

import { useState } from "react";
import NewProject from "@/components/projects/NewProject";
import NewTask from "@/components/tasks/NewTask";
import { GoProjectRoadmap } from "react-icons/go";
import { GoTasklist } from "react-icons/go";
import { GoListUnordered } from "react-icons/go";


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
          className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition"
          onClick={() => setOpenProject(true)}
        >
          <GoProjectRoadmap size={30} /> New Project 
        </button>

         <button
          className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition"
          onClick={() => setOpenTask(true)}
        > 
          <GoTasklist size={30} />New Task
        </button>

        <button
          className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition"
          onClick={() => window.location.href = "/github/projects"}
        >
         <GoListUnordered  size={30} /> View All Projects
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
