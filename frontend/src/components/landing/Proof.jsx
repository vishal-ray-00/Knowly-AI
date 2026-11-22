import Button from "../ui/Button";

function StatCard({ value, label, chips }) {
  return (
    <div className="grain-frame flex min-h-[300px] flex-col justify-between rounded-[32px] p-8 text-white">
      <p className="font-serif text-7xl tracking-tight sm:text-[88px]">
        {value}
      </p>
      <div>
        <p className="text-2xl font-medium">{label}</p>
        <div className="mt-5 flex flex-wrap gap-2 text-sm">
          {chips.map((c) => (
            <span
              key={c}
              className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TextCard({ children }) {
  return (
    <div className="rounded-[32px] bg-white p-8 text-lg leading-relaxed shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      {children}
    </div>
  );
}

export default function Proof() {
  return (
    <section className="bg-[radial-gradient(70%_50%_at_50%_0%,#f1eafc_0%,transparent_70%)] py-20">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-serif text-[42px] leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[72px]">
            Check it yourself
          </h2>
          <Button as="a" href="https://github.com/YOUR_USERNAME/knowly-ai">
            See the code
          </Button>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="space-y-4">
            <StatCard
              value="Top 4"
              label="Passages retrieved per question"
              chips={["Vector search", "Cosine similarity"]}
            />
            <TextCard>
              Answers are written only from passages retrieved from your
              document, and the model is told to say so when the answer isn't
              there.
            </TextCard>
          </div>
          <div className="space-y-4">
            <TextCard>
              Every search is filtered by your user ID, so one person's
              documents never appear in another's results.
            </TextCard>
            <TextCard>
              Answers stream in token by token, then list the pages they drew
              from.
            </TextCard>
            <TextCard>
              Deleting a document also deletes its passages and chat history.
            </TextCard>
          </div>
          <div className="space-y-4">
            <StatCard
              value="Page"
              label="Citations on every answer"
              chips={["Open the source", "Verify in seconds"]}
            />
            <TextCard>
              Built with React, Express and MongoDB Atlas Vector Search, using
              768-dimension embeddings.
            </TextCard>
          </div>
        </div>
      </div>
    </section>
  );
}
