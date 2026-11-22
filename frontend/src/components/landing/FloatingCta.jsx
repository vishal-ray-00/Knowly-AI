import { Link } from "react-router-dom";

export default function FloatingCta() {
    return (
        <Link
            to="/signup"
            className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-2 rounded-full bg-white/90 py-1.5 pl-1.5 pr-4 text-base font-medium shadow-[0_12px_40px_rgba(80,40,160,0.25)] backdrop-blur-md transition-transform duration-200 hover:scale-[1.03] sm:flex"
        >
            <span className="orb h-9 w-9 sm:h-10 sm:w-10" />
            Try Knowly
        </Link>
    );
}