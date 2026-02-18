"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ShootingStar() {
    // Generate 5 stars
    const stars = Array.from({ length: 5 });

    return (
        <>
            {stars.map((_, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 pointer-events-none z-[5] overflow-hidden shooting-star-container shooting-star-${i}`}
                    style={{ opacity: 0 }} // Hidden initially
                >
                    <svg
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="w-full h-full"
                    >
                        <defs>
                            <linearGradient id={`trailGradient-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="white" stopOpacity="0" />
                                <stop offset="50%" stopColor="white" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="white" stopOpacity="1" />
                            </linearGradient>
                        </defs>

                        <line
                            x1="-10" y1="10"
                            x2="20" y2="40"
                            transform="rotate(-15)"
                            stroke={`url(#trailGradient-${i})`}
                            strokeWidth="0.5"
                            strokeLinecap="round"
                            className="shooting-star-line"
                        />
                    </svg>
                </div>
            ))}
        </>
    );
}
