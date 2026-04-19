import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div className="bg-blue-500">
      <Outlet />
    </div>
  );
}
