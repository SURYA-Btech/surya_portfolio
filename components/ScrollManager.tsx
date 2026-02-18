"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollManager() {
    const pathname = usePathname();

    useEffect(() => {
        // 1. Force ScrollTrigger to refresh after the new page has likely rendered
        // Increased delay to 500ms to handle slower transitions or image loading
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);

        return () => clearTimeout(timer);
    }, [pathname]);

    return null;
}
