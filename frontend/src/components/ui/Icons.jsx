const base = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
};

const make = (d) =>
    function Icon(props) {
        return (
            <svg {...base} {...props}>
                <path d={d} />
            </svg>
        );
    };

export const DocIcon = make("M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h4");
export const CheckIcon = make("M5 12.5l4.5 4.5L19 7.5");
export const XIcon = make("M6 6l12 12M18 6L6 18");
export const ChevronIcon = make("M6 9l6 6 6-6");
export const PlusIcon = make("M12 5v14M5 12h14");
export const MenuIcon = make("M4 7h16M4 12h16M4 17h16");
export const ChatIcon = make("M4 5h16v11H9l-5 4z");