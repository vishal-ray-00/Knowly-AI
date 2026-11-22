import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { DocIcon } from "../ui/Icons";

const conversation = [
  {
    side: "ai",
    position: "right-4 top-[5%]",
    content: "Hi, ask me anything about Operating Systems Notes.",
  },
  {
    side: "user",
    position: "left-4 top-[28%]",
    content: "What are the conditions for deadlock?",
  },
  {
    side: "ai",
    position: "right-4 top-[50%]",
    content: (
      <>
        Four must hold at once: mutual exclusion, hold and wait, no preemption,
        and circular wait.
        <span className="ml-2 inline-flex rounded-full bg-lilac-100 px-2.5 py-0.5 text-xs font-medium text-brand">
          p. 14
        </span>
      </>
    ),
  },
  {
    side: "user",
    position: "left-4 top-[76%]",
    content: "Open that page.",
  },
];

function Stat({ value, label }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-4xl font-medium tracking-tight sm:text-5xl">
        {value}
      </span>
      <span className="text-sm leading-tight text-muted sm:text-base">{label}</span>
    </div>
  );
}

function Bubble({ side, position, children }) {
  const user = side === "user";
  return (
    <div
      className={`rise absolute z-10 max-w-[84%] rounded-[22px] px-4 py-3 text-[13px] leading-snug shadow-[0_8px_24px_rgba(70,30,140,0.12)] sm:text-[15px] ${
        user
          ? "bg-lilac-100 text-[#3b2a63]"
          : "bg-white text-ink"
      } ${position}`}
    >
      {children}
    </div>
  );
}

function HeroDemo() {
  const [visibleCount, setVisibleCount] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? conversation.length
      : 1,
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timeoutId;
    let count = 1;

    const revealNext = () => {
      if (count < conversation.length) {
        timeoutId = window.setTimeout(() => {
          count += 1;
          setVisibleCount(count);
          revealNext();
        }, 1900);
        return;
      }

      timeoutId = window.setTimeout(() => {
        setVisibleCount(0);
        timeoutId = window.setTimeout(() => {
          count = 1;
          setVisibleCount(count);
          revealNext();
        }, 400);
      }, 2600);
    };

    timeoutId = window.setTimeout(revealNext, 1600);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="grain-frame relative h-[390px] rounded-[32px] p-2.5 pt-12 sm:h-[430px] lg:h-[min(58vh,500px)]">
      <span className="absolute left-5 top-3.5 z-10 text-sm font-semibold text-white sm:text-base">
        Try it yourself
      </span>
      <div className="relative h-full min-h-0 overflow-hidden rounded-[24px] bg-white">
        <div className="orb absolute left-1/2 top-[46%] aspect-square w-[58%] max-w-[360px] -translate-x-1/2 -translate-y-1/2" />

        <div
          aria-label="Example conversation"
          className={`absolute inset-x-0 top-0 bottom-[68px] transition-opacity duration-300 ${
            visibleCount === 0 ? "opacity-0" : "opacity-100"
          }`}
        >
          {conversation.slice(0, visibleCount).map((message, index) => (
            <Bubble
              key={index}
              side={message.side}
              position={message.position}
            >
              {message.content}
            </Bubble>
          ))}
        </div>

        <Button
          as={Link}
          to="/signup"
          className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap !px-5 !py-3 text-sm sm:bottom-5"
        >
          <DocIcon /> Try it with your PDF
        </Button>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-[1800px] items-center gap-8 px-4 pb-12 pt-7 sm:px-8 lg:min-h-[calc(100svh-5.5rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-8">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 py-1.5 pl-1.5 pr-4 text-sm">
          <span className="grid h-5 w-5 place-items-center rounded-md bg-brand text-[11px] font-bold text-white">
            K
          </span>
          Answers grounded in your own PDFs
        </span>

        <h1 className="mt-5 font-serif text-[clamp(2.5rem,5vw,4.25rem)] font-normal leading-[1.02] tracking-[-0.03em]">
          Answers from your documents, with the page to prove it.
        </h1>

        <p className="mt-5 max-w-[34rem] text-base leading-relaxed text-muted sm:text-lg lg:text-[18px]">
          Knowly reads your PDFs, finds the passages that matter, and answers in
          seconds. Every answer cites the exact page it came from.
        </p>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 sm:gap-x-10">
          <Stat
            value="Top 4"
            label={
              <>
                passages retrieved
                <br />
                per question
              </>
            }
          />
          <Stat
            value="p. 14"
            label={
              <>
                page cited on
                <br />
                every answer
              </>
            }
          />
        </div>
      </div>

      <HeroDemo />
    </section>
  );
}
