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
    <div
      className="
        sticky top-0 z-10
        border-b border-sky-200
        bg-sky-50/90 backdrop-blur
        px-4 py-3
        dark:border-slate-700
        dark:bg-slate-900/90
      "
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Date */}
        <div>
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {dayName}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            {fullDate}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Today */}
          <button
            onClick={onToday}
            className="
              rounded-xl border border-slate-200
              bg-white px-3 py-2 text-xs font-semibold
              hover:bg-slate-100
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-100
              dark:hover:bg-slate-700
            "
          >
            Today
          </button>

          {/* Search */}
          {showSearch && (
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks..."
              className="
                w-56 rounded-xl
                border border-slate-200
                bg-white px-3 py-2 text-sm
                outline-none
                focus:ring-2 focus:ring-sky-300
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-100
                dark:focus:ring-sky-600
              "
            />
          )}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="
              rounded-xl border border-slate-200
              bg-white px-3 py-2 text-xs font-semibold
              hover:bg-slate-100
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-100
              dark:hover:bg-slate-700
            "
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>

          {/* User */}
          <div className="ml-1 flex items-center gap-2">
            {user?.photoURL && (
              <img
                src={user.photoURL}
                alt="profile"
                className="h-9 w-9 rounded-full border border-slate-300 dark:border-slate-600"
              />
            )}

            <div className="hidden max-w-[180px] truncate text-sm font-semibold text-slate-700 dark:text-slate-200 md:block">
              {user?.displayName || user?.email}
            </div>

            <button
              onClick={onLogout}
              className="
                rounded-xl
                bg-sky-600 px-3 py-2 text-xs font-semibold text-white
                hover:bg-sky-700
                dark:bg-sky-500
                dark:hover:bg-sky-600
              "
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
