import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Logo from "../ui/Logo";

export default function CtaFooter() {
  return (
    <footer className="px-3 pb-3 sm:px-6 sm:pb-6">
      <div className="grain-frame mx-auto max-w-[1800px] rounded-[32px] px-5 pt-10 text-white sm:px-10 sm:pt-14">
        <div className="grid gap-7 lg:grid-cols-2 lg:items-end">
          <h2 className="font-serif text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.03em]">
            Stop searching.
            <br />
            Start asking.
          </h2>
          <div>
            <p className="max-w-lg text-lg text-white/85">
              Upload a PDF, ask a question, and see exactly where the answer
              came from.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button as={Link} to="/signup" variant="white">
                Get started
              </Button>
              <Button as={Link} to="/login" variant="glass">
                Log in
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 py-6 text-sm text-white/80">
          <Logo size="sm" />
          <nav className="flex flex-wrap gap-6">
            {[
              ["Features", "#features"],
              ["How it works", "#how-it-works"],
              ["Compare", "#compare"],
              ["FAQ", "#faq"],
            ].map(([l, h]) => (
              <a key={h} href={h} className="hover:text-white">
                {l}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span>Made by Vishal Ray</span>
            <a
              href="https://github.com/vishal-ray-00"
              target="_blank"
              rel="noreferrer"
              aria-label="Vishal Ray on GitHub"
              className="rounded-full p-1 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.01-.7.08-.69.08-.69 1.12.08 1.71 1.15 1.71 1.15 1 .1.75 2.26 4.08 1.6.1-.73.39-1.22.7-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.29-2.61 5.24-5.1 5.51.4.35.75 1.02.75 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/vishal-ray-864564322/"
              target="_blank"
              rel="noreferrer"
              aria-label="Vishal Ray on LinkedIn"
              className="rounded-full p-1 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.85 0 1.55-.68 1.55-1.52V3.52c0-.84-.7-1.52-1.55-1.52ZM7.93 18.9H4.99V9.43h2.94v9.47ZM6.46 8.14a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4Zm12.45 10.76h-2.93v-4.61c0-1.1-.02-2.52-1.54-2.52-1.54 0-1.78 1.2-1.78 2.44v4.69H9.73V9.43h2.81v1.29h.04c.39-.74 1.35-1.53 2.78-1.53 2.97 0 3.55 1.96 3.55 4.5v5.21Z" />
              </svg>
            </a>
            <span className="ml-1 border-l border-white/25 pl-4">
              © 2026 Knowly
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
