"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CircularTransition, { CircularTransitionHandle } from "./CircularTransition";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLSpanElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    const transitionRef = useRef<CircularTransitionHandle>(null);
    const isAnimating = useRef(false);

    useGSAP(() => {
        // Ensure container is visible immediately
        gsap.set(containerRef.current, { opacity: 1 });

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Staggered typing animation for letters
        tl.fromTo(
            ".hero-letter",
            { opacity: 0, scale: 0.8, filter: "blur(10px)" }, // cinematic starting state
            {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 2,
                stagger: 0.2, // 0.1s delay between each letter
                ease: "power2.out"
            }
        )
            .fromTo(
                taglineRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2 },
                "-=0.5"
            )
            .fromTo(
                buttonRef.current,
                { y: 60, opacity: 0, scale: 0.8 },
                { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.4)" },
                "-=1"
            );
    }, { scope: containerRef });

    const handleMouseEnter = () => {
        if (isAnimating.current) return;
        gsap.to(buttonRef.current, { scale: 1.08, duration: 0.3 });
        gsap.to(glowRef.current, { opacity: 0.6, scale: 1.2, duration: 0.3 });
    };

    const handleMouseLeave = () => {
        if (isAnimating.current) return;
        gsap.to(buttonRef.current, { scale: 1, duration: 0.4 });
        gsap.to(glowRef.current, { opacity: 0.3, scale: 1, duration: 0.4 });
    };

    const router = useRouter();

    const handleEnterUniverse = (e: React.MouseEvent) => {
        if (isAnimating.current || !transitionRef.current) return;
        isAnimating.current = true;

        const x = e.clientX;
        const y = e.clientY;

        transitionRef.current.expand(x, y, () => {
            // Navigate after animation completes
            router.push("/profile");
            // isAnimating.current = false; // Keep true to prevent double clicks during nav
        });
    };

    return (
        <div
            ref={containerRef}
            className="relative z-10 flex flex-col items-center justify-center h-screen text-white overflow-hidden"
        >
            <CircularTransition ref={transitionRef} />

            {/* Cinematic Title */}
            <h1
                className="font-heading italic flex items-center justify-center gap-2 text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] font-extrabold tracking-[-0.03em] leading-[0.9] uppercase text-center"
                style={{ perspective: "1000px" }}
            >
                {/* Splitting "SURYA" for animation */}
                {"SURYA".split("").map((letter, i) => (
                    <span
                        key={i}
                        className="hero-letter block text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                        style={{ display: 'inline-block' }}
                    >
                        {letter}
                    </span>
                ))}
            </h1>

            {/* Cinematic Tagline */}
            <p
                ref={taglineRef}
                className="text-lg md:text-2xl tracking-[0.3em] font-light uppercase text-white/60 mt-6 mb-16 text-center"
            >
                Explore My Profile
            </p>

            {/* Button */}
            <div className="relative z-50">
                <div
                    ref={glowRef}
                    className="absolute inset-0 bg-white/20 blur-[60px] rounded-full opacity-30 pointer-events-none"
                />

                <button
                    ref={buttonRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleEnterUniverse}
                    className="group relative px-12 py-6 md:px-24 md:py-8 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-full overflow-hidden flex items-center justify-center transition-all duration-700 cursor-pointer"
                >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-1000 ease-out" />

                    <span className="relative z-10 text-2xl md:text-base tracking-[0.4em] font-medium uppercase text-white/80 group-hover:text-white transition-all duration-700">
                        Enter Universe
                    </span>
                </button>
            </div>
        </div>
    );
}
