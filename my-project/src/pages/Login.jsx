import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Label({ children }) {
  return <div className="mb-2 text-sm font-semibold text-slate-800">{children}</div>;
}

function TextInput(props) {
  return (
    <input
      {...props}
      className="w-full rounded-xl bg-slate-100/70 px-4 py-3 outline-none ring-1 ring-slate-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-sky-300"
    />
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  function onSubmit(e) {
    e.preventDefault();

    // frontend-only demo
    localStorage.setItem("demo_user", JSON.stringify({ email, at: Date.now() }));
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-sky-200/70">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT: form */}
            <div className="p-8 sm:p-12">
              <h1 className="text-3xl font-extrabold text-slate-900">Login</h1>
              <p className="mt-2 text-slate-500">Built for busy students like you.</p>

              <form onSubmit={onSubmit} className="mt-10 space-y-6">
                <div>
                  <Label>Email</Label>
                  <TextInput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <Label>Password</Label>
                  <div className="relative">
                    <TextInput
                      type={show ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                      className="w-full rounded-xl bg-slate-100/70 px-4 py-3 pr-12 outline-none ring-1 ring-slate-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-sky-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShow((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                      aria-label={show ? "Hide password" : "Show password"}
                      title={show ? "Hide password" : "Show password"}
                    >
                      {/* eye icon */}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-3 text-center">
                    <Link to="#" className="text-sm font-semibold text-sky-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  Continue
                </button>

                <div className="flex items-center gap-4 pt-1">
                  <div className="h-px flex-1 bg-slate-200" />
                  <div className="text-sm text-slate-500">or sign in with</div>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    type="button"
                    className="grid h-14 w-14 place-items-center rounded-2xl bg-white ring-1 ring-slate-200 hover:bg-slate-50"
                    aria-label="Sign in with Google"
                  >
                    {/* Google icon */}
                    <svg width="22" height="22" viewBox="0 0 48 48">
                      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.7 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.1-.1-2.3-.4-3.5z"/>
                      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.7 6.1 29.6 4 24 4c-7.7 0-14.4 4.3-17.7 10.7z"/>
                      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.3 36 26.8 37 24 37c-5.2 0-9.6-3.3-11.2-7.9l-6.6 5.1C9.5 40 16.2 44 24 44z"/>
                      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.1-2.2 3.9-4 5.1l6.2 5.2C40.9 35 44 29.9 44 24c0-1.1-.1-2.3-.4-3.5z"/>
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="grid h-14 w-14 place-items-center rounded-2xl bg-white ring-1 ring-slate-200 hover:bg-slate-50"
                    aria-label="Sign in with Apple"
                  >
                    {/* Apple icon */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-slate-900">
                      <path d="M16.365 1.43c0 1.14-.417 2.2-1.247 3.03-.83.83-2.024 1.31-3.12 1.22-.14-1.1.4-2.27 1.19-3.07.84-.85 2.16-1.36 3.18-1.18zM20.5 17.2c-.6 1.36-.88 1.97-1.66 3.17-1.1 1.67-2.66 3.75-4.59 3.77-1.71.02-2.15-1.12-4.48-1.11-2.33.01-2.81 1.13-4.52 1.11-1.93-.02-3.41-1.89-4.51-3.56C.2 18.64-.94 14.3 1.3 11.6c1.29-1.57 3.33-2.49 5.24-2.49 1.95 0 3.18 1.12 4.8 1.12 1.57 0 2.52-1.13 4.78-1.13 1.7 0 3.49.93 4.77 2.53-4.2 2.3-3.52 8.25.61 9.57z"/>
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT: promo panel */}
            <div className="relative hidden lg:block">
              <div className="h-full w-full bg-gradient-to-br from-blue-700 via-sky-600 to-sky-400 p-12 text-white">
                <div className="text-sm/6 text-white/85">
                  Everything you need to stay on track.
                </div>

                <h2 className="mt-8 text-center text-4xl font-extrabold leading-tight">
                  Manage your classes, tasks, exams, and more. All in one place.
                </h2>

                {/* faint watermark */}
                <div className="pointer-events-none absolute inset-0 grid place-items-center">
                  <div className="h-72 w-72 rounded-full bg-white/10 blur-2xl" />
                </div>
              </div>
            </div>
            {/* end right */}
          </div>
        </div>
      </div>
    </div>
  );
}