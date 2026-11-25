import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import useDocuments from "../hooks/useDocuments";
import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo";
import Sidebar from "../components/app/Sidebar";
import UploadModal from "../components/app/UploadModal";
import DocumentPanel from "../components/app/DocumentPanel";

export default function Dashboard() {
    const { user, logout } = useAuth();
    const { documents, loading, error, reload, upload, remove } = useDocuments();
    const [selectedId, setSelectedId] = useState(null);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Derived on every render, so it stays fresh while polling
    const selected = documents.find((doc) => doc._id === selectedId) ?? null;

    const handleUpload = useCallback(
        async (file, onProgress) => {
            await upload(file, onProgress);
            toast.success("Upload received. Reading your document…");
        },
        [upload]
    );

    const handleDelete = useCallback(
        async (id) => {
            await remove(id);
            setSelectedId((current) => (current === id ? null : current));
        },
        [remove]
    );

    const handleSelect = (id) => {
        setSelectedId(id);
        setDrawerOpen(false);
    };

    const closeUpload = useCallback(() => setUploadOpen(false), []);

    const sidebarProps = {
        user,
        documents,
        loading,
        error,
        onRetry: reload,
        selectedId,
        onSelect: handleSelect,
        onDelete: handleDelete,
        onUploadClick: () => {
            setDrawerOpen(false);
            setUploadOpen(true);
        },
        onLogout: logout,
    };

    return (
        <div className="flex h-dvh flex-col gap-3 bg-page p-3 md:flex-row">
            <header className="flex items-center justify-between rounded-2xl border border-line bg-white px-4 py-2.5 md:hidden">
                <Link to="/">
                    <Logo size="sm" />
                </Link>
                <Button
                    variant="light"
                    className="!px-4 !py-2"
                    onClick={() => setDrawerOpen(true)}
                >
                    Documents ({documents.length})
                </Button>
            </header>

            <aside className="hidden w-72 shrink-0 flex-col rounded-[28px] border border-line bg-white md:flex">
                <Sidebar {...sidebarProps} />
            </aside>

            {drawerOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={() => setDrawerOpen(false)}
                        className="absolute inset-0 bg-night/40"
                    />
                    <div className="rise absolute inset-y-3 left-3 flex w-[min(20rem,calc(100%-1.5rem))] flex-col rounded-[28px] border border-line bg-white">
                        <Sidebar {...sidebarProps} />
                    </div>
                </div>
            )}

            <main className="min-h-0 flex-1 overflow-y-auto rounded-[28px] border border-line bg-white bg-[radial-gradient(60%_50%_at_100%_0%,#f1eafc_0%,transparent_70%)]">
                {selected ? (
                    <DocumentPanel document={selected} />
                ) : (
                    <div className="grid h-full place-items-center px-6">
                        <div className="max-w-md text-center">
                            <div className="orb mx-auto h-20 w-20" />
                            <h2 className="mt-8 font-serif text-4xl tracking-[-0.02em]">
                                Select a document to begin
                            </h2>
                            <p className="mt-3 text-lg text-muted">
                                Upload a PDF, then ask questions about it. Answers
                                point to the exact pages they came from.
                            </p>
                        </div>
                    </div>
                )}
            </main>

            {uploadOpen && (
                <UploadModal onClose={closeUpload} onUpload={handleUpload} />
            )}
        </div>
    );
}