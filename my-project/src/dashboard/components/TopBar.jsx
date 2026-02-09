import { format } from "date-fns";

export default function TopBar({
  selectedDate,
  onToday,
  query,
  setQuery,
  theme,
  toggleTheme,
  user,
  onLogout,
  showSearch = true,
}) {
  const dayName = format(selectedDate, "EEEE");
  const fullDate = format(selectedDate, "dd MMM yyyy");

  return (
    <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {dayName}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            {fullDate}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onToday}
            className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
          >
            Today
          </button>

          {showSearch && (
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-56 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200 dark:border-slate-800 dark:bg-slate-950"
            />
          )}

          <button
            onClick={toggleTheme}
            className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>

          <div className="ml-1 flex items-center gap-2">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="profile" className="h-9 w-9 rounded-full" />
            ) : null}

            <div className="hidden max-w-[180px] truncate text-sm font-semibold text-slate-700 dark:text-slate-200 md:block">
              {user?.displayName || user?.email}
            </div>

            <button
              onClick={onLogout}
              className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}