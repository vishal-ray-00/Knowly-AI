import Logo from "../ui/Logo";
import { CheckIcon, XIcon } from "../ui/Icons";

const rows = [
  [
    "Answers from your own documents",
    ["Exact word matches only", false],
    ["Answers from general training data", false],
  ],
  [
    "Cites the page for every answer",
    ["Shows matches, not answers", false],
    ["Rarely shows a source", false],
  ],
  [
    "Finds passages even when worded differently",
    ["Misses anything phrased differently", false],
    ["Understands wording, but not your file", true],
  ],
  [
    "Streams answers in seconds",
    ["Slow across long files", false],
    ["Fast, but hard to check", true],
  ],
  [
    "Files stay in your private account",
    ["Stays on your device", true],
    ["Depends on the tool", false],
  ],
];

function Mark({ ok, dark }) {
  return (
    <span
      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
        dark
          ? "bg-brand/80 text-white"
          : ok
            ? "bg-white text-emerald-600"
            : "bg-white text-red-500"
      }`}
    >
      {ok || dark ? (
        <CheckIcon width={16} height={16} />
      ) : (
        <XIcon width={16} height={16} />
      )}
    </span>
  );
}

function Column({ title, items, dark }) {
  return (
    <div
      className={`rounded-[36px] p-8 ${
        dark
          ? "bg-gradient-to-br from-[#2e1363] to-night text-white"
          : "bg-lilac-50"
      }`}
    >
      <h3 className={`text-xl font-medium ${dark ? "mb-8" : "mb-8 pt-1"}`}>
        {title}
      </h3>
      <ul>
        {items.map(([text, ok], i) => (
          <li
            key={text}
            className={`flex items-center gap-3 py-5 ${
              i > 0
                ? dark
                  ? "border-t border-white/10"
                  : "border-t border-ink/10"
                : ""
            }`}
          >
            <Mark ok={ok} dark={dark} />
            <span className={dark ? "text-white" : "text-muted"}>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Compare() {
  return (
    <section
      id="compare"
      className="mx-auto max-w-[1800px] scroll-mt-28 px-4 py-20 sm:px-8"
    >
      <h2 className="font-serif text-[42px] leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[72px]">
        Why skim 200 pages when Knowly can?
      </h2>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        <div className="rounded-[36px] bg-gradient-to-br from-[#2e1363] to-night p-8 text-white">
          <Logo size="sm" className="mb-8 block" />
          <ul>
            {rows.map(([text], i) => (
              <li
                key={text}
                className={`flex items-center gap-3 py-5 ${i > 0 ? "border-t border-white/10" : ""}`}
              >
                <Mark dark />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <Column title="Ctrl + F search" items={rows.map((r) => r[1])} />
        <Column title="General chatbots" items={rows.map((r) => r[2])} />
      </div>
    </section>
  );
}
