const itemBase = "w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition";
const itemActive = "bg-sky-600 text-white";
const itemInactive =
  "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900";

export default function Sidebar({ active, setActive }) {
  return (
    <aside className="w-full border-r border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950 md:w-64">
      <div className="mb-3 px-2">
        <div className="text-sm font-extrabold text-slate-900 dark:text-white">
          Dashboard
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Tasks • Timer • Summary
        </div>
      </div>

      <div className="space-y-2">
        <button
          className={`${itemBase} ${active === "tasks" ? itemActive : itemInactive}`}
          onClick={() => setActive("tasks")}
        >
          Tasks
        </button>

        <button
          className={`${itemBase} ${active === "timer" ? itemActive : itemInactive}`}
          onClick={() => setActive("timer")}
        >
          Gym Timer
        </button>

        <button
          className={`${itemBase} ${active === "summary" ? itemActive : itemInactive}`}
          onClick={() => setActive("summary")}
        >
          Monthly Summary
        </button>
      </div>
    </aside>
  );
}