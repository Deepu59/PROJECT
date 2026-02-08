import { Outlet } from "react-router-dom";
import SiteNavbar from "../components/SiteNavbar";

export default function SiteLayout() {
  return (
    <div>
      <SiteNavbar />
      <Outlet />
    </div>
  );
}