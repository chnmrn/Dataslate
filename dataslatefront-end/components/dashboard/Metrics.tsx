export default function Metrics({ projects, tasks, }: {
  projects: any[];
  tasks: any[];
}) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {/* Active Projects */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
        <h3 className="text-gray-300 text-sm">Active Projects</h3>
        <p className="text-4xl font-ibm mt-2">{projects.length}</p>
      </div>

      {/* Pending Tasks */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
        <h3 className="text-gray-300 text-sm">Pending Tasks</h3>
        <p className="text-4xl font-ibm mt-2">{tasks.length}</p>
      </div>
    </section>
  );
}

