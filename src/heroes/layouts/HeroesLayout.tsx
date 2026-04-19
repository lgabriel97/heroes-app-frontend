import { NavBar } from "@/components/custom/NavBar";
import { Outlet } from "react-router";

export default function HeroesLayout() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-6">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
}
