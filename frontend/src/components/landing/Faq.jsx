import { useState } from "react";
import Button from "../ui/Button";
import { ChevronIcon } from "../ui/Icons";

const faqs = [
  [
    "What is Knowly?",
    "Knowly lets you upload PDFs and ask questions in plain language. It answers from your document and shows the pages it used.",
  ],
  [
    "How does it work?",
    "Your PDF is split into passages, and each one is converted to an embedding and stored in MongoDB Atlas Vector Search. A question is embedded the same way, the closest passages are retrieved, and the language model answers from them.",
  ],
  [
    "Can it make things up?",
    "The model is instructed to answer only from the retrieved passages and to say when the document doesn't contain the answer. Citations let you verify every answer yourself.",
  ],
  [
    "Does it work with scanned PDFs?",
    "Not yet. A PDF needs selectable text. Scanned images would need OCR, which isn't included.",
  ],
  [
    "Are my files private?",
    "Documents, passages and chats are tied to your account, and every search is filtered by your user ID.",
  ],
  [
    "Is it free?",
    "It runs on free tiers of its services, so heavy use may hit rate limits.",
  ],
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="mx-auto grid max-w-[1800px] scroll-mt-28 gap-8 px-4 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.4fr]"
    >
      <div>
        <h2 className="font-serif text-[42px] leading-[1.02] tracking-[-0.03em] sm:text-6xl">
          Frequently asked questions
        </h2>
        <div className="mt-8 rounded-[32px] bg-lilac-100 p-8">
          <h3 className="font-serif text-3xl tracking-tight">
            Still have questions?
          </h3>
          <p className="mt-3 text-lg text-muted">
            Read how it's built, or try it with a PDF of your own.
          </p>
          <Button
            as="a"
            href="https://github.com/YOUR_USERNAME/knowly-ai"
            className="mt-6"
          >
            See the source
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map(([q, a], i) => (
          <div
            key={q}
            className="rounded-[28px] bg-[#f2f1f3] px-6 py-5 sm:px-8"
          >
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-4 text-left text-xl"
            >
              {q}
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white">
                <ChevronIcon
                  className={`transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                />
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ${
                open === i
                  ? "mt-4 grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <p className="overflow-hidden text-lg leading-relaxed text-muted">
                {a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
