"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    User,
    Briefcase,
    Mail
} from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/#about", icon: User },
    { name: "Projects", path: "/#projects", icon: Briefcase },
    { name: "Contact", path: "/#contact", icon: Mail },
];

export function SideNav() {
    const pathname = usePathname();

    return (
        /*
          Sidebar Navigation:
          - Fixed to the left side.
          - Aligned to the bottom (justify-end) to match the Right Sidebar aesthetic.
          - Hidden on small screens (md:flex).
        */
        <div className="fixed left-10 bottom-0 top-0 hidden md:flex flex-col items-center justify-end pb-10 w-10 z-50">
            <TooltipProvider>
                <div className="flex flex-col gap-6 items-center">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <Tooltip key={item.path} delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={item.path}
                                        className={cn(
                                            "group flex h-10 w-10 items-center justify-center rounded-full transition-all hover:-translate-y-1 text-white opacity-80 hover:opacity-100"
                                        )}
                                    >
                                        <Icon className="h-6 w-6" />
                                        <span className="sr-only">{item.name}</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="ml-2 font-mono text-xs">
                                    {item.name}
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}

                    {/* Decorative Line */}
                    <div className="w-[1px] h-24 bg-slate-300 mt-4"></div>
                </div>
            </TooltipProvider>
        </div>
    );
}
