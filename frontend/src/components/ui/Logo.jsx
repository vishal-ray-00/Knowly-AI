export default function Logo({ size = "md", className = "" }) {
    const small = size === "sm";
    return (
        <span
            className={`inline-flex items-center gap-2 font-bold tracking-tight ${
                small ? "text-[13px]" : "text-[22px]"
            } ${className}`}
        >
            <svg
                width={small ? 16 : 24}
                height={small ? 16 : 24}
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <rect x="6" y="1.5" width="17" height="12" rx="4" className="fill-brand opacity-45" />
                <rect x="1" y="10.5" width="17" height="12" rx="4" className="fill-brand" />
            </svg>
            KNOWLY.AI
        </span>
    );
}