const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium transition-all duration-200 active:scale-[0.98]";

const variants = {
    dark: "bg-ink text-white hover:bg-black hover:shadow-lg",
    light: "border border-line bg-white text-ink hover:border-ink/20 hover:shadow-md",
    white: "bg-white text-ink hover:bg-white/90 hover:shadow-lg",
    glass: "border border-white/30 bg-white/10 text-white hover:bg-white/20",
};

export default function Button({ as: Tag = "button", variant = "dark", className = "", ...props }) {
    return <Tag className={`${base} ${variants[variant]} ${className}`} {...props} />;
}