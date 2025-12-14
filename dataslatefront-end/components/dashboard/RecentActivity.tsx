export default function RecentActivity({ activity }: { activity: any[] }) {
  return (
    <section className="mb-16">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>

        {activity.length === 0 ? (
          <p className="text-gray-400 text-sm">No recent activity yet.</p>
        ) : (
          <ul className="space-y-3 text-gray-300 text-sm max-h-48 overflow-y-auto pr-2">
            {activity.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.message}</span>
                <span className="text-gray-500 text-xs">{item.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

