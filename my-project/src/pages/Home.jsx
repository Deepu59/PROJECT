import heroImg from "./home/hero.png";
function StoreBadge({ title, subtitle }) {
  return (
    <button className="flex items-center gap-3 rounded-2xl bg-black px-5 py-3 text-left text-white hover:bg-black/90">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
        <div className="h-5 w-5 rounded bg-white/60" />
      </div>
      <div>
        <div className="text-xs text-white/80">{subtitle}</div>
        <div className="text-base font-semibold leading-5">{title}</div>
      </div>
    </button>
  );
}

export default function Home() {
  return (
    <main className="bg-sky-100">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-14 lg:grid-cols-2 lg:py-20">
        {/* Left */}
        <div>
          <h1 className="text-5xl font-roman font-bold tracking-tight text-slate-900 sm:text-6xl">
            The Ultimate Student
            <br />
            Productivity Tool
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Most students struggle with procrastination, missed deadlines, and academic stress.
            Designed for real student life — plan, focus, and succeed.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button className="rounded-full bg-sky-600 px-7 py-3 text-sm font-semibold text-white hover:bg-sky-700">
              Continue
            </button>
          </div>
        </div>

<div className="relative flex justify-center lg:justify-end">
  <img
    src={heroImg}
    alt="Hero"
    className="w-full max-w-2xl rounded-3xl shadow-2xl ring-1 ring-black/10"
  />
</div>
      </div>
    </main>
  );
}