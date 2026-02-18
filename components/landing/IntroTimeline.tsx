"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function IntroTimeline() {
    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: { ease: "power2.out" }
        });

        // 1. Shooting Star Sequence
        // 1. Video Transition (Darken) - START HERE
        tl.to("video", {
            opacity: 0.3,
            scale: 1.05,
            duration: 2,
            ease: "power2.inOut",
            delay: 0.5 // Slight initial delay
        });

        // 2. Hero Reveal - Managed internaly by Hero.tsx now
        // We just move straight to stars or wait a bit



        // 3. Shooting Star Sequence - COMES LAST
        const stars = document.querySelectorAll(".shooting-star-container");

        if (stars.length > 0) {
            // Create a label to mark the start of the star shower
            tl.add("starShower", "+=0.5"); // Start 0.5s after button reveal

            stars.forEach((star, i) => {
                // Randomize starting positions slightly
                const startX = -10 - Math.random() * 20;
                const startY = -10 - Math.random() * 20;

                gsap.set(star, {
                    x: `${startX}vw`,
                    y: `${startY}vh`,
                    rotate: -15,
                    scale: 0.5 + Math.random() * 0.5,
                    opacity: 1
                });

                // ALL stars start at "starShower" label -> SAME TIME
                tl.to(star, {
                    x: "120vw",
                    y: "120vh",
                    duration: 3 + Math.random() * 1, // Slight duration variance for natural feel, but start is synced
                    ease: "none",
                }, "starShower")
                    .to(star, {
                        opacity: 0,
                        duration: 0.2
                    });
            });
        }

        // Cleanup
        tl.eventCallback("onComplete", () => {
            document.body.style.overflow = 'auto';
        });
        document.body.style.overflow = 'hidden';

    }, []);

    return null; // Logic only component
}
