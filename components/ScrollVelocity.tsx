"use client";

import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
    wrap,
} from "framer-motion";
import "./ScrollVelocity.css";

interface ScrollVelocityProps {
    texts: string[];
    velocity?: number;
    className?: string;
    damping?: number;
    stiffness?: number;
    numCopies?: number;
}

interface ParallaxTextProps {
    children: string;
    baseVelocity: number;
    className?: string;
    damping?: number;
    stiffness?: number;
    numCopies?: number;
}

function ParallaxText({
    children,
    baseVelocity = 50,
    className = "",
    damping = 50,
    stiffness = 400,
    numCopies = 4,
}: ParallaxTextProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping,
        stiffness,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false,
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t: number, delta: number) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="parallax">
            <motion.div className="scroller" style={{ x }}>
                {Array.from({ length: numCopies }).map((_, i) => (
                    <span key={i} className={className}>
                        {children}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

export default function ScrollVelocity({
    texts,
    velocity = 5,
    className = "",
    damping = 50,
    stiffness = 400,
    numCopies = 6,
}: ScrollVelocityProps) {
    return (
        <section>
            {texts.map((text, index) => (
                <ParallaxText
                    key={index}
                    baseVelocity={velocity * (index % 2 === 0 ? 1 : -1)}
                    className={className}
                    damping={damping}
                    stiffness={stiffness}
                    numCopies={numCopies}
                >
                    {text}
                </ParallaxText>
            ))}
        </section>
    );
}
