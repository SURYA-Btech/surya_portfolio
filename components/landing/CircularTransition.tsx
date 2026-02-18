"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import gsap from "gsap";

export interface CircularTransitionHandle {
  expand: (x: number, y: number, onComplete?: () => void) => void;
}

const CircularTransition = forwardRef<CircularTransitionHandle>((_, ref) => {
  const transitionRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    expand: (x, y, onComplete) => {
      if (!transitionRef.current) return;

      const circle = transitionRef.current;

      // Dynamically calculate scale to cover screen fully
      const maxDimension = Math.max(window.innerWidth, window.innerHeight);
      const scaleValue = (maxDimension * 2) / 50; 
      // 50 = circle size

      // Position circle at click
      gsap.set(circle, {
        display: "block",
        left: x - 25,
        top: y - 25,
        scale: 0,
        autoAlpha: 1,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(circle, { autoAlpha: 0, display: "none" });
          if (onComplete) onComplete();
        },
      });

      tl.to(circle, {
        scale: scaleValue,
        duration: 0.8,
        ease: "power4.inOut",
      });
    },
  }));

  return (
    <div
      ref={transitionRef}
      className="fixed z-[9999] rounded-full pointer-events-none"
      style={{
        width: "50px",
        height: "50px",
        backgroundColor: "#ffffff",   // ✅ PURE WHITE
        boxShadow: "0 0 80px rgba(255,255,255,0.8)", // glow so it's visible
        display: "none",
        opacity: 0,
      }}
    />
  );
});

CircularTransition.displayName = "CircularTransition";

export default CircularTransition;
