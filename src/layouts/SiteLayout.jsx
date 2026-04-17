import { Outlet, useLocation } from "react-router-dom";
import SiteNavbar from "../components/SiteNavbar";

export default function SiteLayout() {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <div>
      {!isDashboard && <SiteNavbar />}
      <Outlet />
    </div>
  );
}