import { useEffect, useState } from "react";

function pad(n) {
  return String(n).padStart(2, "0");
}

export default function TimerPanel() {
  const [minutes, setMinutes] = useState(10);
  const [secondsLeft, setSecondsLeft] = useState(10 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setSecondsLeft(minutes * 60);
  }, [minutes]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const mm = Math.floor(secondsLeft / 60);
  const ss = secondsLeft % 60;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
      <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
        Gym Timer
      </div>
      <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Simple countdown timer.
      </div>

      <div className="mt-6 text-center text-5xl font-extrabold tabular-nums text-slate-900 dark:text-white">
        {pad(mm)}:{pad(ss)}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Minutes:
        </label>

        <input
          type="number"
          min={1}
          max={180}
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value || 1))}
          className="w-24 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
        />

        <button
          onClick={() => setRunning(true)}
          disabled={running || secondsLeft === 0}
          className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          Start
        </button>

        <button
          onClick={() => setRunning(false)}
          disabled={!running}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50 dark:border-slate-800 dark:hover:bg-slate-900"
        >
          Pause
        </button>

        <button
          onClick={() => {
            setRunning(false);
            setSecondsLeft(minutes * 60);
          }}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
        >
          Reset
        </button>
      </div>
    </div>
  );
}