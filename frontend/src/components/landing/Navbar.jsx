import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import Logo from "../ui/Logo";
import { ChevronIcon, MenuIcon, XIcon } from "../ui/Icons";

const links = [
  ["Features", "#features"],
  ["How it works", "#how-it-works"],
  ["Compare", "#compare"],
  ["FAQ", "#faq"],
];

function UserMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="user-menu"
        className="flex items-center gap-1.5 rounded-full border border-line bg-white py-1 pl-1 pr-3 transition-shadow hover:shadow-md"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-lilac-100 font-medium text-brand">
          {user.name.charAt(0).toUpperCase()}
        </span>
        <ChevronIcon
          width={16}
          height={16}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          id="user-menu"
          role="menu"
          className="rise absolute right-0 top-full mt-2 w-64 rounded-2xl border border-line bg-white p-2 shadow-[0_16px_48px_rgba(70,30,140,0.15)]"
        >
          <div className="px-3 py-2.5">
            <p className="truncate font-medium">{user.name}</p>
            <p className="truncate text-sm text-muted">{user.email}</p>
          </div>
          <div className="my-1 border-t border-line" />
          <Link
            to="/app"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-3 py-2.5 text-[15px] transition-colors hover:bg-lilac-50"
          >
            Dashboard
          </Link>
          <button
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="block w-full rounded-xl px-3 py-2.5 text-left text-[15px] transition-colors hover:bg-lilac-50"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    toast.success("Logged out");
  };

  return (
    <header className="sticky top-0 z-50 px-3 pt-2 sm:px-6 sm:pt-3">
      <nav
        className={`mx-auto max-w-[1800px] rounded-[24px] px-3 py-2 transition-all duration-300 sm:px-8 ${
          scrolled || open
            ? "bg-white/70 shadow-[0_8px_32px_rgba(70,30,140,0.10)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link to="/">
              <Logo />
            </Link>
            <ul className="hidden items-center gap-8 lg:flex">
              {links.map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-[17px] text-ink/80 transition-colors hover:text-ink"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              {user ? (
                <>
                  <Button as={Link} to="/app">
                    Dashboard
                  </Button>
                  <UserMenu user={user} onLogout={handleLogout} />
                </>
              ) : (
                <>
                  <Button as={Link} to="/login" variant="light">
                    Log in
                  </Button>
                  <Button as={Link} to="/signup">
                    Get started
                  </Button>
                </>
              )}
            </div>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="landing-mobile-menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white lg:hidden"
            >
              {open ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {open && (
          <ul
            id="landing-mobile-menu"
            className="mt-3 space-y-1 border-t border-line pt-3 lg:hidden"
          >
            {links.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-lg"
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="border-t border-line pt-3 sm:hidden">
              {user && (
                <p className="truncate px-1 pb-3 text-sm text-muted">
                  Signed in as {user.email}
                </p>
              )}
              <div className="flex gap-2">
                {user ? (
                  <>
                    <Button
                      as={Link}
                      to="/app"
                      onClick={() => setOpen(false)}
                      className="flex-1"
                    >
                      Dashboard
                    </Button>
                    <Button
                      variant="light"
                      onClick={handleLogout}
                      className="flex-1"
                    >
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      as={Link}
                      to="/login"
                      variant="light"
                      className="flex-1"
                    >
                      Log in
                    </Button>
                    <Button as={Link} to="/signup" className="flex-1">
                      Get started
                    </Button>
                  </>
                )}
              </div>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
