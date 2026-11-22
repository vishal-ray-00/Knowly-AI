export default function Bubble({ side = "ai", delay = 0, children }) {
    const user = side === "user";
    return (
        <div
            className={`rise max-w-[82%] rounded-[26px] px-5 py-3.5 text-[15px] leading-snug sm:text-lg ${
                user
                    ? "self-start bg-lilac-100 text-[#3b2a63]"
                    : "self-end bg-white text-ink shadow-[0_10px_30px_rgba(70,30,140,0.12)]"
            }`}
            style={{ animationDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}