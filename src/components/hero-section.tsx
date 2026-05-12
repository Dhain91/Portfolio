"use client";

import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { HeroEffects } from "@/components/hero-effects";
import { cn } from "@/lib/utils";
import { useUiState } from "@/components/ui-state-provider";

/*
  HERO SECTION (Interaction: Click-to-Unlock + Split Glitch + Intuitive Cues)
  
  Updates:
  - Subtext: White, Larger, More spacing.
  - Action: "Explore" with Arrow at bottom.
*/

export function HeroSection() {
    const { isUnlocked, setIsUnlocked } = useUiState();
    const [showHint, setShowHint] = useState(false);

    const controlsPrefix = useAnimation();
    const controlsName = useAnimation();

    useEffect(() => {
        if (isUnlocked) {
            document.body.style.overflow = "auto";
        } else {
            // Guard: If detecting scroll (e.g. reload) or navigating to hash, auto-unlock instead of trapping user
            if (window.scrollY > 50 || window.location.hash) {
                setIsUnlocked(true);
            } else {
                // Removed window.scrollTo(0,0) as it overrides Next.js hash navigation
                document.body.style.overflow = "hidden";
            }
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [isUnlocked, setIsUnlocked]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isUnlocked) {
                setShowHint(prev => !prev);
            } else {
                setShowHint(false);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [isUnlocked]);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const glitchSequence = async () => {
            if (!mounted) return;
            await controlsPrefix.start({
                skewX: [0, 20, -20, 10, -10, 0],
                x: [0, -2, 2, -1, 1, 0],
                opacity: [1, 0.8, 1, 0.9, 1],
                scale: [1, 1.02, 0.98, 1],
                textShadow: [
                    "none",
                    "-2px 0 #ff00c1, 2px 0 #00fff9",
                    "2px 0 #ff00c1, -2px 0 #00fff9",
                    "none"
                ],
                transition: { duration: 0.3, ease: "easeInOut" }
            });

            await new Promise(r => setTimeout(r, 100));

            if (!mounted) return;
            await controlsName.start({
                skewX: [0, 25, -25, 15, -15, 0],
                x: [0, -3, 3, -2, 2, 0],
                opacity: [1, 0.7, 1, 0.8, 1],
                scale: [1, 1.05, 0.95, 1],
                textShadow: [
                    "none",
                    "-3px 0 #ff00c1, 3px 0 #00fff9",
                    "3px 0 #ff00c1, -3px 0 #00fff9",
                    "-2px 0 #ff00c1, 2px 0 #00fff9",
                    "none"
                ],
                color: isUnlocked ? ["#ffffff", "#ff00ff", "#00ffff", "#ffffff"] : ["#64748b", "#ff00ff", "#00ffff", "#64748b"],
                transition: { duration: 0.35, ease: "circIn" }
            });
        };

        const interval = setInterval(() => {
            glitchSequence();
        }, 4000);

        return () => clearInterval(interval);
    }, [isUnlocked, controlsPrefix, controlsName, mounted]);

    return (
        <section
            className={cn(
                "relative h-screen w-full overflow-hidden transition-colors duration-1000 ease-out flex flex-col items-center justify-center text-center",
                isUnlocked ? "bg-[#5ABCB9]" : "bg-white"
            )}
        >

            {/* PARTICLES */}
            <div className="absolute inset-0 opacity-30">
                <HeroEffects color={isUnlocked ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.2)"} />
            </div>

            {/* Grid Texture */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>

            {/* Content Container */}
            <div className="z-10 w-full max-w-[90%] space-y-6 px-4 relative flex flex-col items-center">

                {/* Main Heading */}
                <motion.div
                    className="inline-block cursor-pointer select-none relative"
                    onClick={() => setIsUnlocked(true)}
                    whileHover={{
                        scale: 1.05,
                        textShadow: isUnlocked ? "0 0 20px rgba(255,255,255,0.8)" : "0 0 15px rgba(0,0,0,0.3)"
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <h1 className={cn(
                        "text-5xl md:text-8xl font-bold tracking-tight transition-colors duration-500",
                        isUnlocked ? "text-teal-900" : "text-slate-900"
                    )}>
                        <motion.span animate={controlsPrefix} className="inline-block origin-bottom mr-4">
                            Hi, I'm
                        </motion.span>

                        <motion.span
                            animate={controlsName}
                            className={cn(
                                "inline-block origin-bottom transition-colors duration-500",
                                isUnlocked ? "text-white" : "text-slate-500"
                            )}
                        >
                            Dhain
                        </motion.span>
                    </h1>

                    {/* Click Hint Arrow */}
                    {!isUnlocked && (
                        <motion.div
                            animate={{ opacity: showHint ? 1 : 0, x: showHint ? 0 : -15 }}
                            transition={{ duration: 0.5 }}
                            className="absolute -right-16 top-1/2 -translate-y-1/2 md:-right-24 text-slate-400"
                        >
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </motion.div>
                    )}
                </motion.div>

                {/* Subtext - White, Larger, More Spacing */}
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                        opacity: isUnlocked ? 1 : 0,
                        height: isUnlocked ? "auto" : 0,
                        y: isUnlocked ? 0 : 20
                    }}
                    transition={{ duration: 0.8 }}
                    className="overflow-hidden mt-8 md:mt-12"
                >
                    <p className="text-2xl md:text-3xl max-w-3xl mx-auto font-medium text-white drop-shadow-md">
                        CS Graduate seeking to build, learn, and scale impactful technology
                    </p>
                </motion.div>

            </div>

            {/* Explore 'Button' / Arrow at Bottom */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: isUnlocked ? 1 : 0,
                    y: isUnlocked ? 0 : 20
                }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={cn(
                    "absolute bottom-12 left-0 right-0 flex justify-center",
                    isUnlocked ? "pointer-events-auto" : "pointer-events-none"
                )}
            >
                <Link
                    href="#about"
                    className="flex flex-col items-center gap-2 text-white hover:text-teal-100 transition-colors group"
                >
                    <span className="text-lg font-medium tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">Explore</span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                        </svg>
                    </motion.div>
                </Link>
            </motion.div>

        </section>
    );
}
