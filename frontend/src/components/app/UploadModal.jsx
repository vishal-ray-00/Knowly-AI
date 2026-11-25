import { useEffect, useRef, useState } from "react";
import { DocIcon, UploadIcon, XIcon } from "../ui/Icons";
import { MAX_FILE_SIZE_MB } from "../../utils/file.util";
import { getErrorMessage } from "../../utils/error.util";
import { formatSize } from "../../utils/format.util";

export default function UploadModal({ onClose, onUpload }) {
    const [dragging, setDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const inputRef = useRef(null);

    // Escape closes the modal, but not in the middle of an upload
    useEffect(() => {
        const onKey = (event) => {
            if (event.key === "Escape" && !uploading) onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [uploading, onClose]);

    // A file dropped outside the zone would make the browser open it
    useEffect(() => {
        const block = (event) => event.preventDefault();
        window.addEventListener("dragover", block);
        window.addEventListener("drop", block);
        return () => {
            window.removeEventListener("dragover", block);
            window.removeEventListener("drop", block);
        };
    }, []);

    const startUpload = async (selected) => {
        if (!selected || uploading) return;

        setFile(selected);
        setError(null);
        setProgress(0);
        setUploading(true);

        try {
            await onUpload(selected, setProgress);
            onClose();
        } catch (err) {
            setError(getErrorMessage(err, "Upload failed"));
            setFile(null);
            setUploading(false);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        startUpload(event.dataTransfer.files?.[0]);
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // required, or the drop never fires
        setDragging(true);
    };

    const handleDragLeave = (event) => {
        // Ignore the event when the cursor only moved onto a child element
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setDragging(false);
        }
    };

    const handleChange = (event) => {
        const selected = event.target.files?.[0];
        event.target.value = "";
        startUpload(selected);
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="upload-title"
            className="fixed inset-0 z-50 grid place-items-center p-4"
        >
            <button
                type="button"
                tabIndex={-1}
                aria-label="Close"
                onClick={() => !uploading && onClose()}
                className="absolute inset-0 bg-night/40 backdrop-blur-sm"
            />

            <div className="rise grain-frame relative w-full max-w-lg rounded-[32px] p-2.5 pt-[60px] shadow-[0_24px_80px_rgba(40,10,100,0.35)]">
                <span
                    id="upload-title"
                    className="absolute left-6 top-5 text-lg font-medium text-white"
                >
                    Add a document
                </span>
                <button
                    type="button"
                    onClick={onClose}
                    disabled={uploading}
                    aria-label="Close dialog"
                    className="absolute right-4 top-3.5 grid h-9 w-9 place-items-center rounded-full text-white transition-colors hover:bg-white/20 disabled:opacity-40"
                >
                    <XIcon width={18} height={18} />
                </button>

                <div className="rounded-[24px] bg-white p-5 sm:p-6">
                    {uploading && file ? (
                        <div>
                            <div className="flex items-center gap-3">
                                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lilac-100 text-brand">
                                    <DocIcon />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-medium">{file.name}</p>
                                    <p className="text-sm text-muted">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 h-2 overflow-hidden rounded-full bg-lilac-100">
                                <div
                                    className="h-full rounded-full bg-brand transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="mt-2 text-sm text-muted">
                                {progress < 100 ? `Uploading… ${progress}%` : "Starting…"}
                            </p>
                        </div>
                    ) : (
                        <>
                            <button
                                type="button"
                                autoFocus
                                onClick={() => inputRef.current?.click()}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`flex w-full flex-col items-center gap-3 rounded-3xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
                                    dragging
                                        ? "border-brand bg-lilac-100"
                                        : "border-lilac-200 bg-lilac-50 hover:border-brand/60"
                                }`}
                            >
                                <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-brand">
                                    <UploadIcon />
                                </span>
                                <span className="font-medium">
                                    {dragging ? "Drop it here" : "Drop a PDF here"}
                                </span>
                                <span className="text-sm text-muted">
                                    or click to browse · up to {MAX_FILE_SIZE_MB} MB
                                </span>
                            </button>
                            <input
                                ref={inputRef}
                                type="file"
                                accept="application/pdf"
                                onChange={handleChange}
                                className="hidden"
                            />
                            {error && (
                                <p
                                    role="alert"
                                    className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600"
                                >
                                    {error}
                                </p>
                            )}
                            <p className="mt-4 text-xs text-muted">
                                PDFs need selectable text. Scanned images aren't
                                supported yet.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}