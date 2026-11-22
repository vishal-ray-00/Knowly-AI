import { CheckIcon, DocIcon, PlusIcon } from "../ui/Icons";

function Panel({ children }) {
  return (
    <div className="w-full space-y-2 rounded-[24px] bg-white p-2.5 text-ink sm:space-y-2.5">
      {children}
    </div>
  );
}

function UploadPanel() {
  return (
    <Panel>
      <div className="rounded-3xl border border-line p-4 sm:p-5">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#f2f1f3]">
          <PlusIcon />
        </span>
        <p className="mt-5 font-medium">Add a document</p>
        <p className="mt-1 text-sm text-muted">
          Drop a PDF here, or browse your files.
        </p>
      </div>
      <div className="rounded-3xl border border-brand/50 bg-lilac-100 p-4 sm:p-5">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white">
          <DocIcon />
        </span>
        <p className="mt-5 font-medium">Your documents</p>
        <p className="mt-1 text-sm text-muted">
          Each one gets its own chat and history.
        </p>
      </div>
    </Panel>
  );
}

function IndexPanel() {
  const rows = [
    ["Extract text", "Read every page of the PDF", "Done"],
    ["Split into passages", "Short, overlapping pieces", "Done"],
    ["Index by meaning", "Embeddings stored for search", "Running"],
  ];
  return (
    <Panel>
      {rows.map(([title, desc, status]) => (
        <div
          key={title}
          className="flex items-center gap-3 rounded-3xl border border-line p-3 sm:gap-4 sm:p-4"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lilac-100 text-brand">
            <CheckIcon />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-medium">{title}</p>
            <p className="text-sm text-muted">{desc}</p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              status === "Done"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-lilac-100 text-brand"
            }`}
          >
            {status}
          </span>
        </div>
      ))}
    </Panel>
  );
}

function AskPanel() {
  return (
    <Panel>
      <div className="rounded-full border border-line px-4 py-2.5 text-sm text-muted">
        Ask a question about this document
      </div>
      <div className="rounded-3xl bg-[#f8f7f9] p-4">
        <p className="text-xs uppercase tracking-wide text-muted">Answer</p>
        <p className="mt-2 font-serif text-base leading-snug sm:text-lg">
          Four conditions must hold at once: mutual exclusion, hold and wait, no
          preemption, and circular wait.
          <sup className="ml-0.5 text-brand">1</sup>
        </p>
        <p className="mt-3 border-t border-line pt-2.5 text-xs text-muted">
          1 · Operating Systems Notes, page 14
        </p>
      </div>
    </Panel>
  );
}

const steps = [
  {
    title: "Upload a PDF",
    text: "Drop in lecture notes, a paper, a contract or a manual. PDFs need selectable text; scanned images aren't supported yet.",
    tone: "bg-lilac-100 text-ink",
    pill: "border-ink/15",
    panel: <UploadPanel />,
  },
  {
    title: "Knowly reads it",
    text: "The text is split into passages and indexed by meaning, so a question can find the right page even when the wording differs.",
    tone: "bg-night text-white",
    pill: "border-white/25",
    panel: <IndexPanel />,
  },
  {
    title: "Ask and verify",
    text: "Ask a question and watch the answer stream in. Open any citation to see the passage behind it.",
    tone: "bg-brand-mid text-white",
    pill: "border-white/30",
    panel: <AskPanel />,
  },
];

export default function Steps() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-[1800px] scroll-mt-24 px-4 py-14 sm:px-8 sm:py-16"
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
        <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.02] tracking-[-0.03em]">
          Ready in three steps
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg">
          A PDF, a question, and a page number to check. Knowly handles the
          reading in between.
        </p>
      </div>

      <div className="mt-10 space-y-5 sm:mt-12">
        {steps.map((s, i) => (
          <article
            key={s.title}
            className={`${s.tone} grid gap-4 rounded-[32px] p-2.5 sm:gap-5 sm:p-3 lg:sticky lg:min-h-[500px] lg:grid-cols-2`}
            style={{ top: 84 + i * 12 }}
          >
            <div className="grain-frame flex items-center overflow-hidden rounded-[26px] p-3 sm:p-5 lg:p-6">
              {s.panel}
            </div>
            <div className="flex flex-col justify-between gap-6 p-4 sm:p-6 lg:py-8 lg:pl-5 lg:pr-7">
              <div>
                <span
                  className={`inline-block rounded-full border px-3.5 py-1 text-sm ${s.pill}`}
                >
                  Step {i + 1}
                </span>
                <h3 className="mt-4 font-serif text-[36px] leading-[1.02] tracking-[-0.03em] sm:text-[44px]">
                  {s.title}
                </h3>
              </div>
              <p className="max-w-md text-base leading-relaxed opacity-80 sm:text-lg lg:text-xl">
                {s.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
