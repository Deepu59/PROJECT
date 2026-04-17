import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

import Sidebar from "../dashboard/components/Sidebar";
import TopBar from "../dashboard/components/TopBar";
import CalendarMonth from "../dashboard/components/CalendarMonth";
import TaskPanel from "../dashboard/components/TaskPanel";
import TimerPanel from "../dashboard/components/TimerPanel";
import MonthlySummary from "../dashboard/components/MonthlySummary";

import { useUserStorage } from "../dashboard/hooks/useUserStorage";
import { useTheme } from "../dashboard/hooks/useTheme";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("tasks");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthDate, setMonthDate] = useState(new Date());
  const [query, setQuery] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const uid = user?.uid;

  // tasks per user (localStorage)
  const [tasks, setTasks] = useUserStorage(uid, "ts_tasks_v1", []);

  // preferences per user (theme)
  const [prefs, setPrefs] = useUserStorage(uid, "ts_prefs_v1", { theme: "light" });
  const theme = prefs?.theme || "light";
  useTheme(theme);

  const taskCountByDate = useMemo(() => {
    const map = {};
    for (const t of tasks) map[t.date] = (map[t.date] || 0) + 1;
    return map;
  }, [tasks]);

  async function logout() {
    await signOut(auth);
  }

  function toggleTheme() {
    setPrefs((p) => ({
      ...p,
      theme: (p?.theme || "light") === "dark" ? "light" : "dark",
    }));
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-sky-50 p-6 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col md:flex-row">
        <Sidebar active={active} setActive={setActive} />

        <main className="flex-1">
          <TopBar
            selectedDate={selectedDate}
            onToday={() => {
              const now = new Date();
              setSelectedDate(now);
              setMonthDate(now);
            }}
            query={query}
            setQuery={setQuery}
            theme={theme}
            toggleTheme={toggleTheme}
            user={user}
            onLogout={logout}
            showSearch={active === "tasks"}
          />

          <div className="p-4">
            {active === "tasks" ? (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <CalendarMonth
                  monthDate={monthDate}
                  setMonthDate={setMonthDate}
                  selectedDate={selectedDate}
                  onSelectDate={(d) => {
                    setSelectedDate(d);
                    setMonthDate(d);
                  }}
                  taskCountByDate={taskCountByDate}
                />

                <TaskPanel
                  tasks={tasks}
                  setTasks={setTasks}
                  selectedDate={selectedDate}
                  query={query}
                />
              </div>
            ) : null}

            {active === "timer" ? <TimerPanel /> : null}

            {active === "summary" ? (
              <MonthlySummary tasks={tasks} monthDate={monthDate} />
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
}
