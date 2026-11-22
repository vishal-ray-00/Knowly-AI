import { CheckIcon, DocIcon, PlusIcon } from "../ui/Icons";

function Panel({ children }) {
  return (
    <div className="w-full space-y-3 rounded-[28px] bg-white p-3 text-ink">
      {children}
    </div>
  );
}

function UploadPanel() {
  return (
    <Panel>
      <div className="rounded-3xl border border-line p-6">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[#f2f1f3]">
          <PlusIcon />
        </span>
        <p className="mt-10 font-medium">Add a document</p>
        <p className="mt-1 text-sm text-muted">
          Drop a PDF here, or browse your files.
        </p>
      </div>
      <div className="rounded-3xl border border-brand/50 bg-lilac-100 p-6">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-white">
          <DocIcon />
        </span>
        <p className="mt-10 font-medium">Your documents</p>
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
          className="flex items-center gap-4 rounded-3xl border border-line p-5"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lilac-100 text-brand">
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
      <div className="rounded-full border border-line px-5 py-3 text-sm text-muted">
        Ask a question about this document
      </div>
      <div className="rounded-3xl bg-[#f8f7f9] p-5">
        <p className="text-xs uppercase tracking-wide text-muted">Answer</p>
        <p className="mt-2 font-serif text-lg leading-relaxed">
          Four conditions must hold at once: mutual exclusion, hold and wait, no
          preemption, and circular wait.
          <sup className="ml-0.5 text-brand">1</sup>
        </p>
        <p className="mt-4 border-t border-line pt-3 text-xs text-muted">
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
      className="mx-auto max-w-[1800px] scroll-mt-28 px-4 py-20 sm:px-8"
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
        <h2 className="font-serif text-[42px] leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[72px]">
          Ready in three steps
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-ink/80 lg:text-[22px]">
          A PDF, a question, and a page number to check. Knowly handles the
          reading in between.
        </p>
      </div>

      <div className="mt-14 space-y-6">
        {steps.map((s, i) => (
          <article
            key={s.title}
            className={`${s.tone} grid gap-6 rounded-[40px] p-3 lg:sticky lg:min-h-[620px] lg:grid-cols-2`}
            style={{ top: 96 + i * 14 }}
          >
            <div className="grain-frame flex items-center overflow-hidden rounded-[32px] p-5 sm:p-10">
              {s.panel}
            </div>
            <div className="flex flex-col justify-between gap-10 p-5 sm:p-10">
              <div>
                <span
                  className={`inline-block rounded-full border px-4 py-1.5 text-[15px] ${s.pill}`}
                >
                  Step {i + 1}
                </span>
                <h3 className="mt-6 font-serif text-[40px] leading-[1.02] tracking-[-0.03em] sm:text-[56px]">
                  {s.title}
                </h3>
              </div>
              <p className="max-w-md text-lg leading-relaxed opacity-80 lg:text-[22px]">
                {s.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
