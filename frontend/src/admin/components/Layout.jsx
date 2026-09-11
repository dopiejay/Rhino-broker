import { NavLink, Navigate, Outlet } from "react-router-dom";
import { LayoutDashboard, FileText, MailQuestion, Users, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/quotes", label: "Quote Requests", icon: MailQuestion },
  { to: "/admin/content", label: "Site Content", icon: FileText },
  { to: "/admin/users", label: "Admin Users", icon: Users },
];

export default function Layout() {
  const { isAuthenticated, username, logout } = useAuth();

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 shrink-0 bg-navy text-white flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 64 64" aria-hidden="true">
              <rect width="64" height="64" rx="10" fill="#C6923A" />
              <circle cx="32" cy="32" r="20" fill="none" stroke="#3F0E17" strokeWidth="2" />
              <circle cx="32" cy="32" r="13" fill="none" stroke="#3F0E17" strokeWidth="1.5" opacity="0.75" />
              <circle cx="32" cy="32" r="6" fill="#9E3542" />
            </svg>
            <div>
              <p className="font-display text-sm leading-tight">Rhino</p>
              <p className="text-[10px] uppercase tracking-widest text-brass">Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-colors focus-ring ${
                  isActive ? "bg-white/10 text-white" : "text-white/65 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <item.icon size={17} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <p className="px-3 pb-2 text-xs text-white/40 truncate">Signed in as {username}</p>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium text-white/65 hover:bg-white/5 hover:text-white transition-colors focus-ring"
          >
            <LogOut size={17} /> Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
