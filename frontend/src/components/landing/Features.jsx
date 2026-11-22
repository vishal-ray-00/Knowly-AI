import { useState } from "react";
import Logo from "../ui/Logo";
import { ChatIcon, CheckIcon, DocIcon } from "../ui/Icons";

const tabs = [
  {
    tag: "Ask",
    Icon: ChatIcon,
    title: "Chat with any PDF",
    text: "Ask in plain language. Knowly finds the right passages and answers from them only.",
  },
  {
    tag: "Verify",
    Icon: CheckIcon,
    title: "Citations you can open",
    text: "Every answer lists the pages it came from, so you can check it in seconds.",
  },
];

function MockWindow({ view }) {
  return (
    <div className="flex h-full overflow-hidden rounded-[28px] bg-white text-ink shadow-[0_20px_60px_rgba(40,10,100,0.25)]">
      <aside className="hidden w-52 shrink-0 border-r border-line p-5 md:block">
        <Logo size="sm" />
        <p className="mt-8 text-xs font-medium uppercase tracking-wide text-muted">
          Documents
        </p>
        <ul className="mt-3 space-y-1">
          {["Operating Systems Notes", "Thesis draft", "Lease agreement"].map(
            (name, i) => (
              <li
                key={name}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
                  i === 0 ? "bg-lilac-100 font-medium" : "text-muted"
                }`}
              >
                <DocIcon width={16} height={16} />
                <span className="truncate">{name}</span>
              </li>
            ),
          )}
        </ul>
      </aside>

      <div className="min-w-0 flex-1 p-4 sm:p-5">
        <h4 className="font-serif text-xl tracking-tight sm:text-[26px]">
          Operating Systems Notes
        </h4>
        <p className="mt-1 text-xs text-muted sm:text-sm">Sample document</p>

        <div className="mt-3 flex gap-2 text-xs sm:text-sm">
          <span
            className={`rounded-full px-3 py-1.5 font-medium ${view === 0 ? "bg-brand text-white" : "bg-[#f2f1f3]"}`}
          >
            Chat
          </span>
          <span
            className={`rounded-full px-3 py-1.5 font-medium ${view === 1 ? "bg-brand text-white" : "bg-[#f2f1f3]"}`}
          >
            Sources
          </span>
          <span className="rounded-full bg-[#f2f1f3] px-3 py-1.5 font-medium">
            Settings
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-lilac-100 p-3 text-xs sm:grid-cols-4 sm:text-sm">
          {[
            ["Status", "Ready"],
            ["Pages", "42"],
            ["Passages", "71"],
            ["Index", "Up to date"],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-muted">{k}</p>
              <p className="font-medium">{v}</p>
            </div>
          ))}
        </div>

        {view === 0 ? (
          <div className="mt-3 space-y-2">
            <div className="rounded-2xl bg-[#f8f7f9] p-3">
              <p className="text-xs uppercase tracking-wide text-muted">
                Question
              </p>
              <p className="mt-1 text-sm">
                What are the conditions for deadlock?
              </p>
            </div>
            <div className="rounded-2xl bg-[#f8f7f9] p-3">
              <p className="text-xs uppercase tracking-wide text-muted">
                Answer
              </p>
              <p className="mt-1 font-serif text-base leading-snug sm:text-lg">
                Four conditions must hold at once: mutual exclusion, hold and
                wait, no preemption, and circular wait.
              </p>
              <div className="mt-3 flex gap-2 text-xs font-medium text-brand">
                <span className="rounded-full bg-lilac-100 px-2.5 py-1">
                  p. 14
                </span>
                <span className="rounded-full bg-lilac-100 px-2.5 py-1">
                  p. 15
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {[
              [
                "Page 14",
                "A deadlock occurs when processes are blocked forever, each waiting for a resource held by another.",
              ],
              [
                "Page 15",
                "The four necessary conditions are mutual exclusion, hold and wait, no preemption, and circular wait.",
              ],
            ].map(([page, text]) => (
              <div key={page} className="rounded-2xl bg-[#f8f7f9] p-3">
                <span className="rounded-full bg-lilac-100 px-2.5 py-1 text-xs font-medium text-brand">
                  {page}
                </span>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Features() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="features"
      className="scroll-mt-24 bg-[radial-gradient(60%_50%_at_100%_0%,#efe6fb_0%,transparent_70%)] py-12 sm:py-16"
    >
      <div className="mx-auto max-w-[1800px] px-4 sm:px-8">
        <h2 className="max-w-[18ch] font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] tracking-[-0.03em]">
          One place to ask, one place to check
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2 sm:mt-10 sm:gap-8">
          {tabs.map((tab, i) => (
            <button
              key={tab.tag}
              onClick={() => setActive(i)}
              className={`text-left transition-opacity duration-500 ${
                active === i ? "opacity-100" : "opacity-45 hover:opacity-70"
              }`}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-2 text-[15px] text-brand">
                <tab.Icon width={18} height={18} /> {tab.tag}
              </span>
              <h3 className="mt-4 font-serif text-[28px] leading-tight tracking-[-0.02em] sm:text-[36px]">
                {tab.title}
              </h3>
              <div className="mt-3 flex items-end justify-between gap-6">
                <p className="max-w-[32rem] text-base leading-relaxed text-muted sm:text-lg">
                  {tab.text}
                </p>
                <span className="mb-2 hidden h-2.5 w-[60px] shrink-0 overflow-hidden rounded-full bg-ink/10 sm:block">
                  {active === i && (
                    <span
                      className="block h-full rounded-full bg-night"
                      style={{ animation: "fill 7s linear forwards" }}
                      onAnimationEnd={() => setActive((i + 1) % tabs.length)}
                    />
                  )}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="grain-frame mt-8 rounded-[32px] p-3 sm:mt-10 sm:p-6">
          <div className="relative h-[470px] md:h-[420px]">
            {[0, 1].map((i) => (
              <div
                key={i}
                className={`absolute top-0 h-full w-full transition-all duration-700 ease-out md:w-[82%] ${
                  active === i
                    ? "left-0 z-10 opacity-100"
                    : "pointer-events-none left-0 z-0 opacity-0 md:left-[18%] md:scale-[0.97] md:opacity-60"
                }`}
              >
                <MockWindow view={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
