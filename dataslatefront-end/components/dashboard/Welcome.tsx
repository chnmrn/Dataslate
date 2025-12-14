export default function Welcome({ username }: { username: string }) {
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
        <button className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">
          New Project
        </button>
        <button className="px-6 py-3 bg-cyan-600 rounded-lg hover:bg-cyan-700 transition">
          New Task
        </button>
        <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition">
          View All Projects
        </button>
      </div>


    </section>
  );
}
