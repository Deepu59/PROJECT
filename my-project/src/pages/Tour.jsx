import { useEffect, useMemo, useState } from "react";

const SECTIONS = [
  {
    id: "scheduling",
    title: "Scheduling",
    blocks: [
      {
        heading: "The dashboard.",
        body:
          "Your dashboard lets you quickly see what’s next—classes, assignments, and upcoming events—so you always know where you need to be.",
      },
      {
        heading: "All schedule types.",
        body:
          "Daily, weekly, and monthly views help you plan short-term and long-term. Add times, dates, and keep everything organized.",
      },
    ],
  },
  {
    id: "tasks",
    title: "Tasks",
    blocks: [
      {
        heading: "Not just another to‑do list.",
        body:
          "Tasks are connected to your schedule. Track due dates and prioritize work without losing context.",
      },
      {
        heading: "Tasks, at a glance.",
        body:
          "See your tasks clearly with status and progress. Know what’s due soon and what can wait.",
      },
      {
        heading: "Repeated tasks.",
        body:
          "Set tasks to repeat automatically so you don’t have to add the same work again and again.",
      },
    ],
  },
  {
    id: "reminders",
    title: "Reminders",
    blocks: [
      {
        heading: "Never forget a thing",
        body:
          "Enable reminders for classes, exams, and tasks. Get notified before something starts or before a deadline is due.",
      },
    ],
  },
];

function Sidebar({ activeId }) {
  const items = useMemo(
    () => [
      { id: "scheduling", label: "Scheduling", icon: BookIcon },
      { id: "tasks", label: "Tasks", icon: ListIcon },
      { id: "reminders", label: "Reminders", icon: ClockIcon },
    ],
    []
  );

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24">
        <h3 className="text-4xl font-extrabold text-slate-800">Scheduling</h3>

        <div className="mt-6 space-y-5">
          {items.map((it) => {
            const Icon = it.icon;
            const active = activeId === it.id;

            return (
              <a
                key={it.id}
                href={`#${it.id}`}
                className={[
                  "flex items-center gap-4 rounded-2xl bg-white px-6 py-6 shadow-sm ring-1 ring-slate-100",
                  "hover:shadow-md transition",
                  active ? "ring-2 ring-sky-300" : "",
                ].join(" ")}
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-50 text-slate-700">
                  <Icon />
                </div>
                <div className="text-xl font-semibold text-slate-700">{it.label}</div>
              </a>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function Block({ flip, heading, body }) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100 md:grid-cols-2">
      <div className={flip ? "md:order-2" : ""}>
        <h3 className="text-4xl font-extrabold tracking-tight text-slate-800">
          {heading}
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-600">{body}</p>
        <div className="mt-6 h-px w-full bg-slate-100" />
      </div>

      {/* Image / mock screenshot placeholder */}
      <div className={flip ? "md:order-1" : ""}>
        <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-sky-200 via-sky-100 to-white ring-1 ring-slate-200" />
        <p className="mt-3 text-sm text-slate-400">
          Replace this box with your screenshot/image.
        </p>
      </div>
    </div>
  );
}

export default function Tour() {
  const [activeId, setActiveId] = useState("scheduling");

  // Highlight active section while scrolling
  useEffect(() => {
    const ids = SECTIONS.map((s) => s.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // pick the most visible entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5],
        rootMargin: "-20% 0px -65% 0px",
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top hero header like “Tour” */}
      <section className="bg-sky-100">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="text-6xl font-extrabold tracking-tight text-slate-800">
            Tour
          </h1>
        </div>
      </section>

      {/* Big title section */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-5xl font-extrabold leading-tight text-slate-800 md:text-6xl">
            <span className="text-slate-800">How to use our</span>{" "}
            <span className="text-sky-700">daily school planner and schedule maker</span>
          </h2>
          <p className="mt-6 max-w-4xl text-lg text-slate-600">
            When is that exam? Do I have any homework? Use your schedule, tasks,
            and reminders to stay on top of everything.
          </p>
        </div>
      </section>

      {/* Main layout: left sticky sidebar + right content */}
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 pb-24 lg:grid-cols-[360px_1fr]">
        <Sidebar activeId={activeId} />

        <div className="space-y-14">
          {SECTIONS.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28"
            >
              <h2 className="text-5xl font-extrabold text-slate-800">
                {section.title}
              </h2>

              <div className="mt-8 space-y-10">
                {section.blocks.map((b, idx) => (
                  <Block
                    key={b.heading}
                    flip={idx % 2 === 1}
                    heading={b.heading}
                    body={b.body}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Floating back-to-top button */}
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="fixed bottom-6 right-6 grid h-14 w-14 place-items-center rounded-full bg-white shadow-lg ring-1 ring-slate-200 hover:bg-slate-50"
        aria-label="Back to top"
        title="Back to top"
      >
        ↑
      </a>

      {/* anchor target for top */}
      <div id="top" />
    </div>
  );
}

/* Simple icons */
function BookIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-slate-700">
      <path d="M4 19a2 2 0 0 1 2-2h14" stroke="currentColor" strokeWidth="2" />
      <path d="M6 17V5a2 2 0 0 1 2-2h12v14" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function ListIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-slate-700">
      <path d="M8 6h13M8 12h13M8 18h13" stroke="currentColor" strokeWidth="2" />
      <path d="M3 6h1M3 12h1M3 18h1" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-slate-700">
      <path
        d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}