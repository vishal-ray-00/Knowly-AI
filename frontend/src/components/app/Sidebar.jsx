import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Logo from "../ui/Logo";
import DocumentItem from "./DocumentItem";
import { DocIcon, PlusIcon } from "../ui/Icons";

function Skeleton() {
    return (
        <div className="space-y-2" aria-hidden="true">
            {[0, 1, 2].map((i) => (
                <div key={i} className="h-14 animate-pulse rounded-2xl bg-lilac-100" />
            ))}
        </div>
    );
}

export default function Sidebar({
    user,
    documents,
    loading,
    error,
    onRetry,
    selectedId,
    onSelect,
    onDelete,
    onUploadClick,
    onLogout,
}) {
    return (
        <>
            <div className="px-6 pt-6">
                <Link to="/">
                    <Logo />
                </Link>
            </div>

            <div className="px-4 pt-6">
                <Button className="w-full" onClick={onUploadClick}>
                    <PlusIcon width={18} height={18} /> Upload PDF
                </Button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-3 pt-6">
                <p className="px-3 text-xs font-medium uppercase tracking-wide text-muted">
                    Documents
                </p>

                <div className="mt-3">
                    {loading ? (
                        <Skeleton />
                    ) : error && documents.length === 0 ? (
                        <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-600">
                            <p>{error}</p>
                            <button
                                onClick={onRetry}
                                className="mt-2 font-medium underline underline-offset-2"
                            >
                                Try again
                            </button>
                        </div>
                    ) : documents.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-lilac-200 bg-lilac-50 p-5 text-sm text-muted">
                            <DocIcon className="mb-3 text-brand" />
                            No documents yet. Upload a PDF to get started.
                        </div>
                    ) : (
                        <ul className="space-y-1">
                            {documents.map((doc) => (
                                <DocumentItem
                                    key={doc._id}
                                    doc={doc}
                                    selected={doc._id === selectedId}
                                    onSelect={onSelect}
                                    onDelete={onDelete}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="m-3 flex items-center gap-3 rounded-2xl bg-lilac-50 p-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-lilac-100 font-medium text-brand">
                    {user.name.charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{user.name}</p>
                    <button
                        onClick={onLogout}
                        className="text-xs text-muted underline underline-offset-2 hover:text-ink"
                    >
                        Log out
                    </button>
                </div>
            </div>
        </>
    );
}