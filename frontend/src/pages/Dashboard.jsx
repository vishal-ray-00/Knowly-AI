import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="flex h-screen">
            <aside className="flex w-72 shrink-0 flex-col border-r border-line bg-surface">
                <div className="border-b border-line px-5 py-4">
                    <span className="font-serif text-2xl font-semibold tracking-tight">
                        Knowly
                    </span>
                </div>

                <div className="px-4 py-4">
                    <button className="w-full rounded-md bg-accent py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
                        Upload PDF
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">
                        Documents
                    </p>
                    <p className="mt-3 text-sm text-muted">No documents yet.</p>
                </div>

                <div className="flex items-center justify-between border-t border-line px-5 py-3">
                    <span className="truncate text-sm">{user.name}</span>
                    <button
                        onClick={logout}
                        className="text-sm text-muted underline underline-offset-2 hover:text-ink"
                    >
                        Log out
                    </button>
                </div>
            </aside>

            <main className="flex flex-1 items-center justify-center px-6">
                <div className="max-w-md text-center">
                    <h2 className="font-serif text-2xl font-semibold">
                        Select a document to begin
                    </h2>
                    <p className="mt-2 text-sm text-muted">
                        Upload a PDF, then ask questions about it. Answers will
                        point to the exact pages they came from.
                    </p>
                </div>
            </main>
        </div>
    );
}