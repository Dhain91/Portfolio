"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SideNav } from "@/components/side-nav";
import { RightSidebar } from "@/components/right-sidebar";
import { AnimatePresence, motion } from "framer-motion";

interface UiStateContextType {
    isUnlocked: boolean;
    setIsUnlocked: (value: boolean) => void;
}

const UiStateContext = createContext<UiStateContextType | undefined>(undefined);

export function useUiState() {
    const context = useContext(UiStateContext);
    if (!context) {
        throw new Error("useUiState must be used within a UiStateProvider");
    }
    return context;
}

/*
  UiStateProvider
  - Manages global "Unlocked" state.
  - Controls visibility of Sidebars.
*/
export function UiStateProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isUnlocked, setIsUnlockedState] = useState(false);

    const setIsUnlocked = (value: boolean) => {
        setIsUnlockedState(value);
        if (value) {
            sessionStorage.setItem('portfolio_unlocked', 'true');
        } else {
            sessionStorage.removeItem('portfolio_unlocked');
        }
    };

    useEffect(() => {
        const hasUnlocked = sessionStorage.getItem('portfolio_unlocked') === 'true';
        
        if (hasUnlocked || pathname !== "/") {
            setIsUnlocked(true);
        } else {
            setIsUnlocked(false);
        }
    }, [pathname]);

    return (
        <UiStateContext.Provider value={{ isUnlocked, setIsUnlocked }}>
            {/* 
        Sidebars: Only visible when unlocked.
        We wrap them in AnimatePresence for smooth fade in/out?
        Or just simple conditional rendering. simple is better for now.
      */}
            <AnimatePresence>
                {isUnlocked && (
                    <>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className="fixed left-0 top-0 bottom-0 z-50 pointer-events-none md:pointer-events-auto"
                        >
                            {/* 
                  SideNav itself has fixed positioning logic inside, 
                  but we need to be careful. 
                  SideNav implementation: fixed left-0 ...
                  So wrapping it in a div might break it if not careful.
                  Let's check SideNav implementation.
                  The SideNav has `fixed left-4 bottom-0 ... `.
                  So we can just render the component directly.
                  But motion.div adds a wrapper.
                  Let's just use a fragment and let the component handle its pos, 
                  but we can't animate entrance easily without wrapper.

                  Actually, SideNav is: 
                  className="hidden md:flex flex-col gap-6 fixed left-10 bottom-0 top-0 ..."
                  
                  So it expects to be direct child of body/layout usually.
                  Wrapping it in a motion div is fine as long as that div doesn't clip it.
               */}
                            <SideNav />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.5 }}
                            className="fixed right-0 top-0 bottom-0 z-50 pointer-events-none md:pointer-events-auto"
                        >
                            <RightSidebar />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {children}
        </UiStateContext.Provider>
    );
}
