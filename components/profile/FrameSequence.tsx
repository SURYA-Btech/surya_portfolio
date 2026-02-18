"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const profileText = [
    "I am an aspiring Full Stack Developer with a strong foundation in programming, problem-solving, and designing scalable applications. I enjoy building complete end-to-end web solutions, from developing responsive front-end interfaces to implementing efficient and secure back-end systems.",
    "Alongside full-stack development, I have hands-on experience integrating AI and machine learning components into real-world applications, working with data processing, model integration, and deploying intelligent features within web platforms. I have contributed to multiple AI-driven projects where I focused on transforming complex data into meaningful insights and creating intuitive, user-friendly interfaces.",
    "I am passionate about continuous learning, writing clean and maintainable code, and building impactful solutions that combine modern web technologies with intelligent systems."
];

export default function FrameSequence() {
    const triggerRef = useRef<HTMLDivElement>(null);
    const profileWrapperRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

    // 1. Generate frame paths (unchanged)
    const frames = useMemo(() => {
        return Array.from({ length: 49 }, (_, i) => {
            const num = String(i + 1).padStart(3, "0");
            return `/images/frames/ezgif-frame-${num}.jpg`;
        });
    }, []);

    // 2. Preload frames (unchanged)
    useEffect(() => {
        let loadedCount = 0;
        let isMounted = true;
        frames.forEach((src) => {
            const img = new window.Image();
            img.src = src;
            img.onload = () => {
                if (!isMounted) return;
                loadedCount++;
                setProgress(Math.round((loadedCount / frames.length) * 100));
                if (loadedCount === frames.length) setLoaded(true);
            };
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === frames.length) setLoaded(true);
            };
        });
        return () => { isMounted = false; };
    }, [frames]);

    // 3. GSAP Logic
    useGSAP(() => {
        if (!loaded || !triggerRef.current) return;

        const images = gsap.utils.toArray<HTMLElement>(".frame-image");
        // Select all word spans across all paragraphs
        const words = gsap.utils.toArray<HTMLElement>(".word");

        // Master Timeline
        const master = gsap.timeline({
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "+=400%",
                pin: true,
                scrub: 1, // Smooth scrub
                anticipatePin: 1,
                invalidateOnRefresh: true, // Ensure values vary on resize/refresh
            },
        });

        // Frame Sequence Animation
        master.to({}, {
            duration: 4,
            onUpdate: function () {
                const frameIndex = Math.min(
                    frames.length - 1,
                    Math.floor(this.progress() * (frames.length - 1))
                );
                images.forEach((img, i) => {
                    img.style.opacity = i === frameIndex ? "1" : "0";
                });
            }
        }, 0);

        // UI Reveal Animations (Header & Image)
        if (headerRef.current) {
            gsap.set(headerRef.current, { opacity: 0, scale: 0.9, filter: "blur(12px)", letterSpacing: "0.05em", y: 40 });
            master.to(headerRef.current,
                { opacity: 1, scale: 1, filter: "blur(0px)", letterSpacing: "-0.02em", y: 0, duration: 1.5, ease: "power3.out" },
                0.2
            );
        }

        if (profileWrapperRef.current) {
            gsap.set(profileWrapperRef.current, { opacity: 0, x: -300 });
            master.fromTo(profileWrapperRef.current,
                { opacity: 0, x: -300, y: 30, scale: 0.95 },
                { opacity: 1, x: 0, y: 0, scale: 1, duration: 1.5, ease: "power3.out" },
                0.4
            );
        }

        // 3. Text Highlight Animation
        if (words.length > 0) {
            // Ensure words start muted
            gsap.set(words, { opacity: 0.3, color: "rgba(255, 255, 255, 0.5)", filter: "blur(0px)" });

            // Create a staggered animation for the words
            // We want this to happen alongside the scroll, after the initial reveal
            // Let's start highlighting around the same time the UI reveals finish
            const highlightStart = 0.5;
            const highlightDuration = 3.5; // Spread over the rest of the scroll

            master.to(words, {
                opacity: 1,
                color: "#ffffff", // Pure white for highlight
                textShadow: "0 0 10px rgba(255,255,255,0.5)", // Glow effect
                fontStyle: "italic", // Font transition rule
                fontWeight: "700",   // Bold for emphasis
                stagger: {
                    each: highlightDuration / words.length,
                    from: "start",
                },
                ease: "none", // Linear progress tied to scroll
                duration: 0.5, // Duration for each individual word to transition
            }, highlightStart);
        }

        // 4. Parallax and Micro-interactions
        if (textRef.current) {
            master.to(textRef.current, {
                y: -20,
                ease: "none",
                duration: 4
            }, 0);
        }


        // Force refresh to ensure ScrollTrigger calculates positions correctly after layout is ready
        // Using setTimeout with a small delay is often more robust than rAF for heavy DOM updates
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => clearTimeout(timer);

    }, { dependencies: [loaded], scope: triggerRef, revertOnUpdate: true });

    return (
        <div className="w-full bg-black">
            <div ref={triggerRef} className="relative w-full h-screen overflow-hidden">

                {/* 1. FRAME BACKGROUND LAYER */}
                {frames.map((src, i) => (
                    <div
                        key={src}
                        className="frame-image absolute inset-0 w-full h-full"
                        style={{ opacity: i === 0 ? 0.4 : 0, zIndex: 1 }}
                    >
                        <Image
                            src={src}
                            alt=""
                            fill
                            className="object-cover"
                            priority={i < 5}
                        />
                    </div>
                ))}

                {/* 2. CONTENT LAYER (Z-INDEX 10) */}
                <div className="relative z-10 w-full h-full flex">
                    <div className="grid grid-cols-2 w-full h-full">

                        {/* LEFT: Text Content - Glassmorphic Box */}
                        <div
                            className="relative flex flex-col justify-center gap-8 p-10 md:p-14 h-full rounded-r-[60px] border-r border-white/10 bg-white/[0.02] backdrop-blur-[64px] shadow-2xl overflow-hidden w-full"
                            ref={textRef}
                        >
                            {/* Inner Highlight Gradient */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />

                            <h2 ref={headerRef} className="about-header font-heading italic text-6xl md:text-8xl font-bold tracking-tighter text-white transition-all relative z-10 leading-[0.9]">
                                About Me.
                            </h2>
                            <div className="space-y-6 relative z-10">
                                {profileText.map((paragraph, pIndex) => (
                                    <p key={pIndex} className="profile-text-line text-lg md:text-xl text-white/80 font-normal leading-relaxed tracking-wide">
                                        {paragraph.split(" ").map((word, wIndex) => (
                                            <span
                                                key={`${pIndex}-${wIndex}`}
                                                className="word inline-block mr-[0.25em] transition-all duration-300"
                                            >
                                                {word}
                                            </span>
                                        ))}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: Profile Image with Tilt */}
                        <div ref={profileWrapperRef} className="profile-anim-wrapper flex justify-end w-full">
                            <div
                                className="relative w-full max-w-[350px] aspect-[4/5] cursor-pointer perspective-1000"
                                onMouseMove={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                                    gsap.to(e.currentTarget, {
                                        rotationY: x * 15,
                                        rotationX: -y * 15,
                                        duration: 0.4,
                                        ease: "power2.out",
                                        transformPerspective: 500
                                    });
                                }}
                                onMouseLeave={(e) => {
                                    gsap.to(e.currentTarget, {
                                        rotationX: 0,
                                        rotationY: 0,
                                        duration: 0.6,
                                        ease: "power3.out"
                                    });
                                }}
                            >
                                <Image
                                    src="/images/me.JPG"
                                    alt="Profile"
                                    fill
                                    className="object-cover rounded-[40px] shadow-2xl"
                                    sizes="(max-width: 768px) 100vw, 350px"
                                />
                                {/* Soft Reflection Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none rounded-[40px]" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* 3. LOADING OVERLAY */}
            {!loaded && (
                <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black">
                    <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4" />
                    <p className="text-white font-mono text-xs tracking-widest">INITIALIZING SEQUENCE... {progress}%</p>
                </div>
            )}

        </div>

    );
}
