import { useEffect, useState } from "react";
import { format } from "date-fns";

const categories = [
  { value: "study", label: "Study" },
  { value: "teaching", label: "Teaching" },
  { value: "gym", label: "Gym" },
  { value: "personal", label: "Personal" },
];

const priorities = ["high", "medium", "low"];

export default function TaskModal({ open, onClose, onSave, task, defaultDate }) {
  const isEdit = !!task;

  const [form, setForm] = useState({
    title: "",
    notes: "",
    date: format(defaultDate, "yyyy-MM-dd"),
    start: "",
    end: "",
    category: "study",
    priority: "medium",
  });

  useEffect(() => {
    if (!open) return;
    setForm({
      title: task?.title || "",
      notes: task?.notes || "",
      date: task?.date || format(defaultDate, "yyyy-MM-dd"),
      start: task?.start || "",
      end: task?.end || "",
      category: task?.category || "study",
      priority: task?.priority || "medium",
    });
  }, [open, task, defaultDate]);

  if (!open) return null;

  function update(k, v) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  function submit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;

    if (form.start && form.end && form.end < form.start) {
      alert("End time must be after start time");
      return;
    }

    onSave({
      ...task,
      ...form,
      title: form.title.trim(),
      notes: form.notes.trim(),
    });
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl dark:bg-slate-950">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {isEdit ? "Edit Task" : "New Task"}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Add details for your schedule.
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
          >
            Close
          </button>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <input
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="Task title"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200 dark:border-slate-800 dark:bg-slate-950"
          />

          <textarea
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Notes (optional)"
            rows={3}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200 dark:border-slate-800 dark:bg-slate-950"
          />

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              type="date"
              value={form.date}
              onChange={(e) => update("date", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
            />

            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>

            <input
              type="time"
              value={form.start}
              onChange={(e) => update("start", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
            />

            <input
              type="time"
              value={form.end}
              onChange={(e) => update("end", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
            />

            <select
              value={form.priority}
              onChange={(e) => update("priority", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 md:col-span-2"
            >
              {priorities.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              {isEdit ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}