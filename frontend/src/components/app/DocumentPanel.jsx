import Button from "../ui/Button";
import StatusBadge from "./StatusBadge";
import { formatDate, pluralize } from "../../utils/format.util";

export default function DocumentPanel({ document }) {
    return (
        <div className="flex h-full flex-col p-6 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                    <StatusBadge status={document.status} />
                    <h2 className="mt-4 break-words font-serif text-3xl tracking-[-0.02em] sm:text-4xl">
                        {document.title}
                    </h2>
                    <p className="mt-2 text-muted">
                        {pluralize(document.pageCount, "page")} ·{" "}
                        {pluralize(document.chunkCount, "passage")} · Uploaded{" "}
                        {formatDate(document.createdAt)}
                    </p>
                </div>
                {document.fileUrl && (
                    <Button
                        as="a"
                        href={document.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="light"
                    >
                        Open PDF
                    </Button>
                )}
            </div>

            <div className="mt-8 grid flex-1 place-items-center rounded-[28px] border border-dashed border-lilac-200 bg-lilac-50 p-8 text-center">
                <p className="max-w-sm text-muted">
                    The chat for this document will appear here.
                </p>
            </div>
        </div>
    );
}