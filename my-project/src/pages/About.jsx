import problemImg from "./about/problem.png";
import solutionImg from "./about/solution.png";
import diversityImg from "./about/diversity.png";
function Kicker({ children }) {
  return (
    <div className="text-sm font-extrabold uppercase tracking-widest text-slate-800">
      {children}
    </div>
  );
}

function CollageLeft({ src, alt = "" }) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-contain"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function CollageRight({ src, alt = "" }) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-contain"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function Stat({ title, sub }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 h-9 w-9 rounded-xl bg-slate-100 ring-1 ring-slate-200" />
      <div>
        <div className="text-lg font-semibold text-slate-800">{title}</div>
        {sub ? <div className="text-sm text-slate-500">{sub}</div> : null}
      </div>
    </div>
  );
}

function WaveQuote() {
  return (
    <section className="relative overflow-hidden bg-sky-50">
      {/* wave on top */}
      <svg
        className="absolute left-0 top-0 w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,0 L0,0 Z"
          fill="white"
        />
      </svg>

      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <div className="text-6xl font-extrabold text-cyan-400">“</div>
        <p className="mx-auto mt-2 max-w-4xl text-2xl font-semibold leading-snug text-slate-800">
          Education is a passport to freedom. Nothing can strip you of your education.
        </p>
        <div className="mt-6 text-lg font-semibold text-slate-800">
          Gabriella Crick Lewis
        </div>
        <div className="mt-1 text-sm text-slate-600">
          Co‑Founder and Director of Innovation and Strategy
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top banner */}
      <section className="bg-sky-100">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h1 className="text-6xl font-extrabold tracking-tight text-slate-900">
            About
          </h1>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 lg:grid-cols-2">
          <CollageLeft src={problemImg} alt="Problem collage" />

          <div>
            <Kicker>THE PROBLEM.</Kicker>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900">
              lack of organisation 🤝 poor productivity
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              Students across the world are facing a major barrier to academic success:
            </p>

            <ol className="mt-4 list-decimal space-y-2 pl-6 text-lg text-slate-700">
              <li>Their lack of organisation is hindering their productivity.</li>
              <li>
                As a result, their input ≠ output. Student efficiency needs
                revolutionizing.
              </li>
            </ol>

            <p className="mt-6 text-lg text-slate-700">
              We are on a mission to solve this 🚀
            </p>
          </div>
        </div>
      </section>

      {/* Solution (flip) */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 lg:grid-cols-2">
          <div>
            <Kicker>THE SOLUTION.</Kicker>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900">
              boosting academic performance through the power of organisation ⚡
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              With better organisation comes increased productivity. Productive and efficient
              work frees up time and gives students the freedom to focus on what matters.
            </p>
          </div>

          <CollageRight src={solutionImg} alt="Solution collage" />
        </div>
      </section>

      {/* Diversity (like your screenshot) */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 lg:grid-cols-2">
          <CollageLeft src={diversityImg} alt="Diversity collage" />

          <div>
            <h2 className="text-4xl font-extrabold text-slate-900">
              the power of diversity 🌍
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              We are committed to integrating diversity, equity, inclusion, and a sense of
              belonging into every aspect of our product and our team’s practices.
            </p>

            <a
              href="#"
              className="mt-6 inline-flex items-center gap-3 text-lg font-semibold text-cyan-500 hover:text-cyan-600"
            >
              learn more <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Quote with wave */}
      <WaveQuote />
    </div>
  );
}