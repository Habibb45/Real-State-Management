import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${isActive ? "bg-ink text-white" : "text-ink/80 hover:bg-white/70"}`;

export function PublicLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-hero-grid text-ink">
      <header className="sticky top-0 z-20 border-b border-white/60 bg-white/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-3 font-display text-xl font-black tracking-tight"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-white">
              RE
            </span>
            <span>Real Estate Hub</span>
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            <NavLink to="/properties" className={navLinkClass}>
              Properties
            </NavLink>
            <NavLink to="/favorites" className={navLinkClass}>
              Favorites
            </NavLink>
            <NavLink to="/profile" className={navLinkClass}>
              Profile
            </NavLink>
            {user?.role === "admin" && (
              <NavLink to="/admin" className={navLinkClass}>
                Admin
              </NavLink>
            )}
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="hidden rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slateSoft md:inline-flex">
                  {user.name}
                </span>
                <button
                  onClick={() => void logout()}
                  className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-moss"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-moss"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
