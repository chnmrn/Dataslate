interface ProjectsProps {
  projects: any[];
  onSelectProject: (project: any) => void;
}

export default function Projects({ projects, onSelectProject }: ProjectsProps) {
  return (
    <section>
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Your Projects</h3>
          <button
            className="px-6 py-3 bg-gray-800 border border-white/20 rounded-lg hover:bg-white/20 transition"
            onClick={() => (window.location.href = "/github/projects")}
          >
            View All
          </button>
        </div>

        {/* Empty */}
        {projects.length === 0 ? (
          <div className="text-gray-400 text-sm py-6 text-center">
            No projects yet - start by creating your first one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p: any) => (
              <div
                key={p.id}
                className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition cursor-pointer"
                onClick={() => onSelectProject(p)} 
              >
                <h4 className="font-semibold">{p.projectName}</h4>
                <p className="text-gray-400 text-sm mt-1">{p.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

