"use client";

import { useEffect, useRef } from "react";

/*
  HeroEffects Component
  Features:
  1. Particles move slightly (Spring/Tether physics).
  2. "Network" lines connect nearby particles.
  3. Particles return to origin after being pushed by mouse.
  4. Customizable color via props.
*/

interface Particle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    size: number;
    density: number;
    color: string;
}

interface HeroEffectsProps {
    color?: string; // CSS color string e.g. "rgba(0,0,0,0.5)"
}

export function HeroEffects({ color = "rgba(148, 163, 184, 0.4)" }: HeroEffectsProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;

        // Mouse state
        const mouse = { x: -1000, y: -1000 };

        // Resize handling
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        // Initialize particles
        const initParticles = () => {
            particles = [];
            const particleCount = window.innerWidth < 768 ? 50 : 120; // Good density

            for (let i = 0; i < particleCount; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                particles.push({
                    x: x,
                    y: y,
                    baseX: x,
                    baseY: y,
                    size: Math.random() * 3 + 2,
                    density: (Math.random() * 30) + 1,
                    // Use the prop color
                    color: color
                });
            }
        };

        // Draw & Update
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach((p, index) => {
                // [PHYSICS: SPRING / TETHER]

                // Calculate distance from mouse
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDistance = 150;

                if (distance < forceDistance) {
                    // Repulsion
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (forceDistance - distance) / forceDistance;
                    const directionX = forceDirectionX * force * p.density;
                    const directionY = forceDirectionY * force * p.density;

                    p.x -= directionX;
                    p.y -= directionY;
                } else {
                    // Return to Base (Spring)
                    if (p.x !== p.baseX) {
                        const dx = p.x - p.baseX;
                        p.x -= dx / 20;
                    }
                    if (p.y !== p.baseY) {
                        const dy = p.y - p.baseY;
                        p.y -= dy / 20;
                    }
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                // [NETWORK LINES]
                // Connect nearby particles with lines
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx2 = p.x - p2.x;
                    const dy2 = p.y - p2.y;
                    const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                    const connectDistance = 120;
                    if (distance2 < connectDistance) {
                        ctx.beginPath();
                        const opacity = 1 - (distance2 / connectDistance);

                        // Set stroke color. 
                        // We assume 'color' prop works as a stokeStyle.
                        // If it's rgba, we handle opacity by globalAlpha or just relying on the color itself?
                        // The user wants 'Dark Blue and Teal' text on the colored bg.
                        // Let's just use the connect line with opacity directly

                        ctx.save();
                        ctx.globalAlpha = opacity * 0.4;
                        ctx.strokeStyle = color;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        // Event Listeners
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);

        resize();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [color]); // Re-run if color changes

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        />
    );
}
