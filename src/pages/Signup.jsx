import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

function Label({ children }) {
  return (
    <div className="mb-2 text-sm font-semibold text-slate-800">{children}</div>
  );
}

function TextInput({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-xl bg-slate-100/70 px-4 py-3 outline-none ring-1 ring-slate-200 placeholder:text-slate-400",
        "focus:bg-white focus:ring-2 focus:ring-sky-300",
        className,
      ].join(" ")}
    />
  );
}

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/dashboard", { replace: true });
    });
    return () => unsub();
  }, [navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Password र Confirm Password मिलेन");
      return;
    }
    if (password.length < 6) {
      alert("Password कम्तीमा 6 characters हुनुपर्छ");
      return;
    }

    try {
      setLoading(true);

      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // Optional: set display name
      if (name.trim()) {
        await updateProfile(cred.user, { displayName: name.trim() });
      }

      // Debug (provider check)
      console.log("Signed up UID:", cred.user.uid);
      console.log("providerData:", cred.user.providerData); // should include providerId: "password"

      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error(err.code, err.message);
      alert(err.code); // auth/email-already-in-use, auth/invalid-email, auth/weak-password
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-200/70">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT */}
            <div className="p-8 sm:p-12">
              <h1 className="text-3xl font-extrabold text-slate-900">
                Create Account
              </h1>
              <p className="mt-2 text-slate-500">
                Sign up using Email & Password.
              </p>

              <form onSubmit={onSubmit} className="mt-10 space-y-6">
                <div>
                  <Label>Full Name (optional)</Label>
                  <TextInput
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>

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
                      placeholder="Min 6 characters"
                      required
                      className="pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShow((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                      aria-label={show ? "Hide password" : "Show password"}
                      title={show ? "Hide password" : "Show password"}
                    >
                      {show ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div>
                  <Label>Confirm Password</Label>
                  <TextInput
                    type={show ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Re-enter password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-60"
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>

                <p className="text-center text-sm text-slate-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-sky-600 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>

            {/* RIGHT */}
            <div className="relative hidden lg:block">
              <div className="h-full w-full bg-gradient-to-br from-blue-700 via-sky-600 to-sky-400 p-12 text-white">
                <div className="text-sm/6 text-white/85">
                  Create your account to manage tasks.
                </div>

                <h2 className="mt-8 text-center text-4xl font-extrabold leading-tight">
                  Stay organized. Stay productive.
                </h2>

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