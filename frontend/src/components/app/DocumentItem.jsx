import { useState } from "react";
import toast from "react-hot-toast";
import StatusBadge from "./StatusBadge";
import { DocIcon, TrashIcon } from "../ui/Icons";
import { formatDate, pluralize } from "../../utils/format.util";
import { getErrorMessage } from "../../utils/error.util";

export default function DocumentItem({ doc, selected, onSelect, onDelete }) {
    const [confirming, setConfirming] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const ready = doc.status === "ready";
    const processing = doc.status === "processing";

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await onDelete(doc._id);
        } catch (error) {
            toast.error(getErrorMessage(error, "Could not delete document"));
            setDeleting(false);
            setConfirming(false);
        }
    };

    return (
        <li
            className={`group rounded-2xl transition-colors ${
                selected ? "bg-lilac-100" : "hover:bg-lilac-50"
            }`}
        >
            <div className="flex items-start gap-1 p-1.5">
                <button
                    type="button"
                    disabled={!ready}
                    onClick={() => onSelect(doc._id)}
                    aria-current={selected ? "true" : undefined}
                    className="flex min-w-0 flex-1 items-start gap-3 rounded-xl p-2 text-left disabled:cursor-default"
                >
                    <DocIcon
                        width={18}
                        height={18}
                        className="mt-0.5 shrink-0 text-brand"
                    />
                    <span className="min-w-0 flex-1">
                        <span className="block truncate text-[15px] font-medium">
                            {doc.title}
                        </span>
                        <span className="mt-1 block text-xs">
                            {processing && (
                                <span className="flex items-center gap-2">
                                    <StatusBadge status="processing" />
                                    <span className="text-muted">Reading it…</span>
                                </span>
                            )}
                            {ready && (
                                <span className="text-muted">
                                    {pluralize(doc.pageCount, "page")} ·{" "}
                                    {formatDate(doc.createdAt)}
                                </span>
                            )}
                            {doc.status === "failed" && (
                                <span className="text-red-600">
                                    {doc.errorMessage || "Processing failed"}
                                </span>
                            )}
                        </span>
                    </span>
                </button>

                <button
                    type="button"
                    disabled={processing || deleting}
                    onClick={() => setConfirming(true)}
                    aria-label={`Delete ${doc.title}`}
                    title={processing ? "Wait until processing finishes" : "Delete"}
                    className="mt-2 grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted opacity-0 transition-opacity hover:bg-white hover:text-red-600 focus-visible:opacity-100 disabled:cursor-not-allowed disabled:opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
                >
                    <TrashIcon width={16} height={16} />
                </button>
            </div>

            {confirming && (
                <div className="mx-2 mb-2 flex items-center justify-between gap-2 rounded-xl bg-white px-3 py-2 text-sm">
                    <span className="text-muted">Delete this document?</span>
                    <span className="flex gap-1.5">
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={deleting}
                            className="rounded-full bg-ink px-3 py-1 text-xs font-medium text-white disabled:opacity-60"
                        >
                            {deleting ? "Deleting…" : "Yes"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setConfirming(false)}
                            disabled={deleting}
                            className="rounded-full border border-line px-3 py-1 text-xs font-medium"
                        >
                            No
                        </button>
                    </span>
                </div>
            )}
        </li>
    );
}