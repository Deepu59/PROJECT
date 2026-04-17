import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CalendarMonth({
  monthDate,
  setMonthDate,
  selectedDate,
  onSelectDate,
  taskCountByDate,
}) {
  const start = startOfWeek(startOfMonth(monthDate), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(monthDate), { weekStartsOn: 1 });

  const days = [];
  for (let d = start; d <= end; d = addDays(d, 1)) days.push(d);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-3 flex items-center justify-between">
        <button
          onClick={() => setMonthDate((m) => subMonths(m, 1))}
          className="rounded-xl border border-slate-200 px-2 py-1 text-sm hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
        >
          {"<"}
        </button>

        <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
          {format(monthDate, "MMMM yyyy")}
        </div>

        <button
          onClick={() => setMonthDate((m) => addMonths(m, 1))}
          className="rounded-xl border border-slate-200 px-2 py-1 text-sm hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
        >
          {">"}
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-semibold text-slate-500 dark:text-slate-400">
        {weekDays.map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-2">
        {days.map((d) => {
          const key = format(d, "yyyy-MM-dd");
          const count = taskCountByDate?.[key] || 0;

          const inMonth = isSameMonth(d, monthDate);
          const selected = isSameDay(d, selectedDate);

          return (
            <button
              key={key}
              onClick={() => onSelectDate(d)}
              className={[
                "relative rounded-xl px-2 py-2 text-sm transition",
                inMonth
                  ? "text-slate-900 dark:text-slate-100"
                  : "text-slate-400 dark:text-slate-600",
                selected
                  ? "bg-sky-600 text-white"
                  : "hover:bg-slate-100 dark:hover:bg-slate-900",
              ].join(" ")}
            >
              <div className={selected ? "text-white" : ""}>{format(d, "d")}</div>

              {count > 0 ? (
                <span
                  className={[
                    "absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full",
                    selected ? "bg-white" : "bg-sky-500",
                  ].join(" ")}
                  title={`${count} task(s)`}
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}