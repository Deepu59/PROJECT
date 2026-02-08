import { NavLink, Link } from "react-router-dom";
import logo from "../pages/home/logo_png.png";

const navLink = ({ isActive }) =>
  (isActive ? "text-sky-700" : "text-slate-700") +
  " text-sm font-semibold hover:text-sky-700";

export default function SiteNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-sky-200 bg-sky-100/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="MyStudyLife"
            className="h-10 w-auto object-contain"   // ✅ (h-50/w-50 is not Tailwind default)
          />
        </NavLink>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navLink}>Home</NavLink>
          <NavLink to="/about" className={navLink}>About</NavLink>
          <NavLink to="/contact" className={navLink}>Contact</NavLink>
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/Login"
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
        </div>
      </div>
    </header>
  );
}