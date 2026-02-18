"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const trailContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cursor = cursorRef.current;
        const image = imageRef.current;

        if (!cursor || !image) return;

        // 1. Setup GSAP QuickTo for high-performance following
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

        // 2. Mouse Move Listener
        const handleMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);

            // Spawn trail particles occasionally
            if (Math.random() > 0.8) {
                spawnSparkle(e.clientX, e.clientY);
            }
        };

        // 3. Pulse / Twinkle Animation
     

        // 4. Rotating slowly for cosmic feel
        

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const spawnSparkle = (x: number, y: number) => {
        if (!trailContainerRef.current) return;

        const sparkle = document.createElement("div");
        sparkle.className = "absolute w-1 h-1 bg-white rounded-full pointer-events-none";
        // Random offset
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;

        sparkle.style.left = `${x + offsetX}px`;
        sparkle.style.top = `${y + offsetY}px`;

        trailContainerRef.current.appendChild(sparkle);

        gsap.to(sparkle, {
            scale: 0,
            opacity: 0,
            y: "+=20",
            duration: 0.8,
            onComplete: () => {
                sparkle.remove();
            }
        });
    };

    return (
        <>
            {/* Global Cursor Hide Style */}
            <style jsx global>{`
                body, a, button, [role="button"] {
                    cursor: none !important;
                }
            `}</style>

            {/* Trail Container (Fixed, Fullscreen, touches nothing) */}
            <div ref={trailContainerRef} className="fixed inset-0 pointer-events-none z-[99999]" />

            {/* Main Cursor */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 z-[100000] pointer-events-none -translate-x-1/2 -translate-y-1/2"
            >
                {/* The Star Image */}
                <div className="relative">
                    <img
                        ref={imageRef}
                        src="/images/icon.png"
                        alt="cursor"
                        className="w-8 h-8 rounded-full mix-blend-screen object-cover"
                    />
        
                </div>
            </div>
        </>
    );
}
