function StoreBadge({ title, subtitle }) {
  return (
    <button className="flex items-center gap-3 rounded-xl bg-black px-4 py-3 text-left text-white hover:bg-black/90">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/10">
        {/* simple icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 20h10a2 2 0 0 0 2-2v-7H5v7a2 2 0 0 0 2 2Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M8 11l4-7 4 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <div className="text-xs text-white/70">{subtitle}</div>
        <div className="text-base font-semibold leading-5">{title}</div>
      </div>
    </button>
  );
}

function PhoneMock() {
  // placeholder “phone” on the right (no image needed)
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -left-10 top-16 hidden md:block h-72 w-52 rotate-[-12deg] rounded-[2rem] border border-black/10 bg-white shadow-xl" />
      <div className="ml-auto h-[420px] w-[280px] rotate-[10deg] rounded-[2.5rem] border border-black/10 bg-white shadow-2xl">
        <div className="mx-auto mt-4 h-6 w-28 rounded-full bg-black/10" />
        <div className="p-5">
          <div className="h-20 rounded-2xl bg-sky-100" />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="h-24 rounded-2xl bg-pink-100" />
            <div className="h-24 rounded-2xl bg-emerald-100" />
          </div>
          <div className="mt-4 h-40 rounded-2xl bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="bg-sky-100">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* Left */}
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              The Ultimate Student
              <br />
              Productivity Tool
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-700 sm:text-lg">
              Most students struggle with procrastination, missed deadlines, and academic
              stress. This is a clean landing page style for your scheduler app.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700">
                Get started for free
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <StoreBadge subtitle="Download on the" title="App Store" />
              <StoreBadge subtitle="GET IT ON" title="Google Play" />
            </div>
          </div>

          {/* Right */}
          <div className="lg:flex lg:justify-end">
            <PhoneMock />
          </div>
        </div>
      </div>
    </section>
  );
}