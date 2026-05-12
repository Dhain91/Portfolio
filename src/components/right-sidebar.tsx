import Link from "next/link";

export function RightSidebar() {
    return (
        <div className="hidden md:flex flex-col items-center justify-start fixed right-10 top-0 h-screen w-10 pt-10 gap-6 text-slate-300 z-50">
            {/* Decorative Line (First) */}
            <div className="w-[1px] h-24 bg-slate-300"></div>

            {/* Email Link - Vertical Text (Second) */}
            <Link
                href="mailto:dhainsaeed19@gmail.com"
                className="text-sm tracking-widest hover:text-white hover:translate-y-1 transition-all duration-300"
                style={{ writingMode: "vertical-rl" }}
            >
                dhainsaeed19@gmail.com
            </Link>
        </div>
    );
}
