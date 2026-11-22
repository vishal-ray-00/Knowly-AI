import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo";
import { DocIcon, PlusIcon } from "../components/ui/Icons";

export default function Dashboard() {
    const { user, logout } = useAuth();
    const initial = user.name.charAt(0).toUpperCase();

    return (
        <div className="flex h-screen flex-col gap-3 bg-page p-3 md:flex-row">
            <header className="flex items-center justify-between rounded-2xl border border-line bg-white px-4 py-3 md:hidden">
                <Link to="/">
                    <Logo size="sm" />
                </Link>
                <button onClick={logout} className="text-sm text-muted">
                    Log out
                </button>
            </header>

            <aside className="hidden w-72 shrink-0 flex-col rounded-[28px] border border-line bg-white md:flex">
                <div className="px-6 pt-6">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>

                <div className="px-4 pt-6">
                    <Button className="w-full">
                        <PlusIcon width={18} height={18} /> Upload PDF
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 pt-6">
                    <p className="px-2 text-xs font-medium uppercase tracking-wide text-muted">
                        Documents
                    </p>
                    <div className="mt-3 rounded-2xl border border-dashed border-lilac-200 bg-lilac-50 p-5 text-sm text-muted">
                        <DocIcon className="mb-3 text-brand" />
                        No documents yet. Upload a PDF to get started.
                    </div>
                </div>

                <div className="m-3 flex items-center gap-3 rounded-2xl bg-lilac-50 p-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-lilac-100 font-medium text-brand">
                        {initial}
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{user.name}</p>
                        <button
                            onClick={logout}
                            className="text-xs text-muted underline underline-offset-2 hover:text-ink"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </aside>

            <main className="flex flex-1 items-center justify-center rounded-[28px] border border-line bg-white bg-[radial-gradient(60%_50%_at_100%_0%,#f1eafc_0%,transparent_70%)] px-6">
                <div className="max-w-md text-center">
                    <div className="orb mx-auto h-20 w-20" />
                    <h2 className="mt-8 font-serif text-4xl tracking-[-0.02em]">
                        Select a document to begin
                    </h2>
                    <p className="mt-3 text-lg text-muted">
                        Upload a PDF, then ask questions about it. Answers point
                        to the exact pages they came from.
                    </p>
                </div>
            </main>
        </div>
    );
}