import { format, isSameMonth, parseISO } from "date-fns";

const cats = ["study", "teaching", "gym", "personal"];
const pris = ["high", "medium", "low"];

export default function MonthlySummary({ tasks, monthDate }) {
  const monthTasks = tasks.filter((t) => isSameMonth(parseISO(t.date), monthDate));
  const done = monthTasks.filter((t) => t.done).length;

  const byCategory = Object.fromEntries(cats.map((c) => [c, 0]));
  const byPriority = Object.fromEntries(pris.map((p) => [p, 0]));

  monthTasks.forEach((t) => {
    if (byCategory[t.category] !== undefined) byCategory[t.category]++;
    if (byPriority[t.priority] !== undefined) byPriority[t.priority]++;
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
      <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
        Monthly Summary
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-400">
        {format(monthDate, "MMMM yyyy")}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
        <Stat label="Total tasks" value={monthTasks.length} />
        <Stat label="Completed" value={done} />
        <Stat label="Left" value={monthTasks.length - done} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Box title="By Category" data={byCategory} />
        <Box title="By Priority" data={byPriority} />
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
        {label}
      </div>
      <div className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white">
        {value}
      </div>
    </div>
  );
}

function Box({ title, data }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
      <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
        {title}
      </div>
      <div className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
        {Object.entries(data).map(([k, v]) => (
          <div key={k} className="flex items-center justify-between">
            <span className="capitalize">{k}</span>
            <span className="font-semibold">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}