import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "../lib/firebase";
import logo from "../pages/home/logo_png.png";

const navLink = ({ isActive }) =>
  (isActive ? "text-sky-700" : "text-slate-700") +
  " text-sm font-semibold hover:text-sky-700";

export default function SiteNavbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);
      localStorage.removeItem("demo_user"); // optional
      navigate("/"); // after logout go public home
    } catch (err) {
      console.error(err);
      alert(err?.message || "Logout failed");
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-sky-200 bg-sky-100/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="MyStudyLife"
            className="h-10 w-auto object-contain"
          />
        </NavLink>

        {/* Links (public always) */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navLink}>Home</NavLink>
          <NavLink to="/about" className={navLink}>About</NavLink>
          <NavLink to="/contact" className={navLink}>Contact</NavLink>

          {/* Dashboard only when logged in */}
          {user ? (
            <NavLink to="/dashboard" className={navLink}>
              Dashboard
            </NavLink>
          ) : null}
        </nav>

        {/* Right buttons */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              {/* If you don't have a separate signup page, point Sign Up to /login */}
              <Link
                to="/login"
                className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-700"
              >
                Sign Up
              </Link>

              <Link
                to="/login"
                className="rounded-full border border-sky-600 px-5 py-2 text-sm font-semibold text-sky-700 hover:bg-white/60"
              >
                Log in
              </Link>
            </>
          ) : (
            <>
              <div className="hidden sm:flex items-center gap-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="h-9 w-9 rounded-full"
                  />
                ) : null}
                <span className="max-w-[160px] truncate text-sm font-semibold text-slate-700">
                  {user.displayName || user.email}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}