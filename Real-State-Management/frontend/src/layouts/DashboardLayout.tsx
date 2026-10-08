import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-2xl px-4 py-3 text-sm font-semibold transition ${isActive ? "bg-ink text-white" : "text-ink/80 hover:bg-sand"}`;

export function DashboardLayout() {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#edf2f7, #f8f3ea)] text-ink">
      <header className="border-b border-white/60 bg-white/75 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="font-display text-xl font-black">
            Real Estate Hub
          </Link>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-sand px-4 py-2 text-sm font-semibold">
              {user?.name}
            </span>
            <button
              onClick={() => void logout()}
              className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside className="rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-glow backdrop-blur">
          <div className="space-y-2">
            <NavLink to="/admin" end className={navClass}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/properties" className={navClass}>
              Manage Properties
            </NavLink>
            <NavLink to="/admin/users" className={navClass}>
              Manage Users
            </NavLink>
          </div>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
