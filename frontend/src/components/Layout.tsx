import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const baseNavItems = [
  { to: "/", label: "ホーム" },
  { to: "/members", label: "メンバー" },
  { to: "/lives", label: "ライブ" },
  { to: "/posts", label: "お知らせ" },
  { to: "/contact", label: "お問い合わせ" },
];

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const navItems = user?.is_admin
    ? [...baseNavItems, { to: "/admin", label: "管理" }]
    : baseNavItems;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-border">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="font-display text-3xl tracking-widest text-accent"
          >
            SLC
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-8 items-center">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `nav-link text-sm font-heading tracking-wider uppercase transition-colors ${
                        isActive
                          ? "text-accent"
                          : "text-text-secondary hover:text-text-primary"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="h-4 w-px bg-border" />

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-xs font-heading tracking-wider text-text-secondary">
                  {user.username}
                </span>
                <button
                  onClick={() => { logout(); navigate("/"); }}
                  className="text-xs font-heading tracking-wider uppercase text-text-muted hover:text-accent transition-colors"
                >
                  ログアウト
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-xs font-heading tracking-wider uppercase text-text-secondary hover:text-text-primary transition-colors"
                >
                  ログイン
                </Link>
                <Link
                  to="/register"
                  className="text-xs font-heading tracking-wider uppercase px-4 py-1.5 border border-accent text-accent hover:bg-accent hover:text-surface transition-all"
                >
                  新規登録
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span
              className={`block w-5 h-px bg-text-primary transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-text-primary transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-text-primary transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-surface-alt border-t border-border">
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `font-heading tracking-wider uppercase text-sm ${
                        isActive
                          ? "text-accent"
                          : "text-text-secondary hover:text-text-primary"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="border-t border-border pt-4 mt-2">
                {user ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-heading tracking-wider text-text-secondary">
                      {user.username}
                    </span>
                    <button
                      onClick={() => { logout(); setMenuOpen(false); navigate("/"); }}
                      className="text-sm font-heading tracking-wider uppercase text-text-muted hover:text-accent"
                    >
                      ログアウト
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="text-sm font-heading tracking-wider uppercase text-text-secondary hover:text-text-primary"
                    >
                      ログイン
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMenuOpen(false)}
                      className="text-sm font-heading tracking-wider uppercase text-accent"
                    >
                      新規登録
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface-alt">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-display text-2xl tracking-widest text-accent mb-1">
              SLC
            </p>
            <p className="text-text-muted text-xs tracking-wider uppercase">
              Light Music Club
            </p>
          </div>
          <div className="flex gap-8">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-text-muted text-xs tracking-wider uppercase hover:text-text-secondary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <p className="text-text-muted text-xs">
            &copy; 2026 SLC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
