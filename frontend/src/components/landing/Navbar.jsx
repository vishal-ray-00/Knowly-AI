import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import Logo from "../ui/Logo";
import { MenuIcon, XIcon } from "../ui/Icons";

const links = [
  ["Features", "#features"],
  ["How it works", "#how-it-works"],
  ["Compare", "#compare"],
  ["FAQ", "#faq"],
];

export default function Navbar() {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
                <Button as={Link} to="/app">
                  Open app
                </Button>
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
          <ul id="landing-mobile-menu" className="mt-3 space-y-1 border-t border-line pt-3 lg:hidden">
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
            <li className="flex gap-2 border-t border-line pt-3 sm:hidden">
              {user ? (
                <Button as={Link} to="/app" className="flex-1">
                  Open app
                </Button>
              ) : (
                <>
                  <Button as={Link} to="/login" variant="light" className="flex-1">
                    Log in
                  </Button>
                  <Button as={Link} to="/signup" className="flex-1">
                    Get started
                  </Button>
                </>
              )}
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
