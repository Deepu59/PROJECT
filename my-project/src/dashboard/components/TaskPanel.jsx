import { useMemo, useState } from "react";
import { format } from "date-fns";
import TaskModal from "./TaskModal";

const categoryLabels = {
  study: "Study",
  teaching: "Teaching",
  gym: "Gym",
  personal: "Personal",
};

function badgePriority(priority) {
  if (priority === "high") return "bg-rose-50 text-rose-700 border-rose-200";
  if (priority === "low") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  return "bg-amber-50 text-amber-800 border-amber-200";
}

export default function TaskPanel({ tasks, setTasks, selectedDate, query }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const selectedKey = format(selectedDate, "yyyy-MM-dd");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks
      .filter((t) => t.date === selectedKey)
      .filter((t) => (categoryFilter === "all" ? true : t.category === categoryFilter))
      .filter((t) => {
        if (!q) return true;
        return (
          t.title.toLowerCase().includes(q) ||
          (t.notes || "").toLowerCase().includes(q)
        );
      })
      .sort((a, b) => (a.start || "99:99").localeCompare(b.start || "99:99"));
  }, [tasks, selectedKey, query, categoryFilter]);

  function saveTask(payload) {
    if (payload.id) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === payload.id ? { ...t, ...payload, updatedAt: Date.now() } : t
        )
      );
    } else {
      const now = Date.now();
      setTasks((prev) => [
        {
          id: crypto.randomUUID(),
          title: payload.title,
          notes: payload.notes || "",
          date: payload.date,
          start: payload.start || "",
          end: payload.end || "",
          category: payload.category || "study",
          priority: payload.priority || "medium",
          done: false,
          createdAt: now,
          updatedAt: now,
        },
        ...prev,
      ]);
    }
    setOpen(false);
    setEditing(null);
  }

  function toggleDone(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function remove(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-base font-bold text-slate-900 dark:text-slate-100">
            Tasks for {selectedKey}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            {filtered.length} task(s)
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
          >
            <option value="all">All categories</option>
            <option value="study">Study</option>
            <option value="teaching">Teaching</option>
            <option value="gym">Gym</option>
            <option value="personal">Personal</option>
          </select>

          <button
            onClick={() => setOpen(true)}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            + Add Task
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 p-6 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
            No tasks for this day.
          </div>
        ) : (
          filtered.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-slate-200 p-3 dark:border-slate-800"
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleDone(t.id)}
                  className="mt-1 h-4 w-4"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <div
                      className={[
                        "truncate text-sm font-semibold",
                        t.done
                          ? "line-through text-slate-500"
                          : "text-slate-900 dark:text-slate-100",
                      ].join(" ")}
                    >
                      {t.title}
                    </div>

                    <span
                      className={[
                        "rounded-full border px-2 py-0.5 text-[11px] font-semibold",
                        badgePriority(t.priority),
                      ].join(" ")}
                    >
                      {t.priority}
                    </span>

                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {categoryLabels[t.category] || t.category}
                    </span>

                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {t.start && t.end
                        ? `${t.start}–${t.end}`
                        : t.start || "No time"}
                    </span>
                  </div>

                  {t.notes ? (
                    <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {t.notes}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2 md:flex-row">
                  <button
                    onClick={() => {
                      setEditing(t);
                      setOpen(true);
                    }}
                    className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => remove(t.id)}
                    className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <TaskModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSave={saveTask}
        task={editing}
        defaultDate={selectedDate}
      />
    </div>
  );
}