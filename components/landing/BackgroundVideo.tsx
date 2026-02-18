"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BackgroundVideo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Ensure video plays
        if (videoRef.current) {
            videoRef.current.play().catch((error) => {
                console.error("Video play failed:", error);
            });
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-black"
        >
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
            >
                <source src="/videos/starfield.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay */}
        </div>
    );
}
