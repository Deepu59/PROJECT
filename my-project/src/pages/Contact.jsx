import { useState } from "react";
import mapImg from "./contact/map.png"; // ✅ map location: src/pages/contact/map.png

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
      />
    </label>
  );
}

function Textarea({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800">
        {label}
      </span>
      <textarea
        {...props}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
      />
    </label>
  );
}

function InfoCard({ title, children }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="text-sm font-extrabold uppercase tracking-widest text-slate-500">
        {title}
      </div>
      <div className="mt-2 text-slate-800">{children}</div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function update(key) {
    return (e) => setForm((p) => ({ ...p, [key]: e.target.value }));
  }

  function onSubmit(e) {
    e.preventDefault();

    // frontend-only action:
    console.log("Contact form:", form);
    alert("Message sent (frontend-only demo). Check console.");

    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top banner */}
      <section className="bg-sky-100">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h1 className="text-6xl font-extrabold tracking-tight text-slate-900">
            Contact
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Questions, feedback, or partnership ideas? Send us a message.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-16 lg:grid-cols-2">
          {/* Left info */}
          <div className="space-y-5">
            <InfoCard title="Email">
              <a
                className="font-semibold text-sky-700 hover:underline"
                href="mailto:dc7090210@gmail.com"
              >
                dc7090210@gmail.com
              </a>
              <div className="mt-1 text-sm text-slate-500">
                We usually reply within 24–48 hours.
              </div>
            </InfoCard>

            <InfoCard title="STUDENT OF">
              <div className="font-semibold">
                Nepalgunj Campus of Management & Technology
              </div>
              <div className="mt-1 text-sm text-slate-500">
                (For more detail visit Nepalgunj Campus, Nepalgunj, Banke)
              </div>
            </InfoCard>

            <InfoCard title="Social">
              <div className="flex flex-wrap gap-3">
                <a
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                  href="https://www.facebook.com/deepak.chaudhary.354114"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
                <a
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                  href="#"
                >
                  Instagram
                </a>
                <a
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                  href="#"
                >
                  LinkedIn
                </a>
              </div>
            </InfoCard>

            {/* Map image */}
            <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-100">
              <div className="text-sm font-semibold text-slate-700">Map</div>

              <div className="mt-3 overflow-hidden rounded-xl ring-1 ring-slate-200">
                <img
                  src={mapImg}
                  alt="Map"
                  className="aspect-[16/9] w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="mt-2 text-sm text-slate-500">
                Our location (image placeholder).
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Send a message
            </h2>
            <p className="mt-2 text-slate-600">
              Fill in the form and we’ll get back to you.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-5">
              <Input
                label="Full name"
                value={form.name}
                onChange={update("name")}
                placeholder="Your name"
                required
              />

              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="you@example.com"
                required
              />

              <Input
                label="Subject"
                value={form.subject}
                onChange={update("subject")}
                placeholder="How can we help?"
                required
              />

              <Textarea
                label="Message"
                rows={6}
                value={form.message}
                onChange={update("message")}
                placeholder="Write your message..."
                required
              />

              <button
                type="submit"
                className="w-full rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700"
              >
                Send message
              </button>

              <div className="text-center text-xs text-slate-500">
                Frontend-only demo: no backend is connected.
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}