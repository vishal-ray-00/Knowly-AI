const styles = {
    processing: "bg-lilac-100 text-brand",
    ready: "bg-emerald-50 text-emerald-700",
    failed: "bg-red-50 text-red-600",
};

const labels = {
    processing: "Processing",
    ready: "Ready",
    failed: "Failed",
};

export default function StatusBadge({ status }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                styles[status] ?? styles.processing
            }`}
        >
            {status === "processing" && (
                <span className="h-2.5 w-2.5 animate-spin rounded-full border-[1.5px] border-brand/30 border-t-brand" />
            )}
            {labels[status] ?? status}
        </span>
    );
}