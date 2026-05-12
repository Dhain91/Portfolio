import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full bg-slate-950 py-10 border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-slate-500 text-sm font-medium">
                    © {new Date().getFullYear()} Ahmed Dhain Saeed. All rights reserved.
                </p>

                <div className="flex items-center gap-8">
                    <Link href="https://github.com/Dhain91" target="_blank" className="text-slate-500 hover:text-teal-400 transition-colors text-sm font-medium">
                        GitHub
                    </Link>
                    <Link href="https://www.linkedin.com/in/dhain-saeed-42055b31a" target="_blank" className="text-slate-500 hover:text-teal-400 transition-colors text-sm font-medium">
                        LinkedIn
                    </Link>
                    <Link href="https://wa.me/9609981434" target="_blank" className="text-slate-500 hover:text-teal-400 transition-colors text-sm font-medium">
                        WhatsApp
                    </Link>
                </div>
            </div>
        </footer>
    );
}
