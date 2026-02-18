'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';

const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/surya-anbazhagan-20b21csbs/', icon: '/images/contact/linkedin.svg' },
    { name: 'Mail', url: 'mailto:suryaanbazhagan21@gmail.com', icon: '/images/contact/mail.svg' },
    { name: 'Instagram', url: 'https://www.instagram.com/surya_anba/', icon: '/images/contact/instagram.svg' },
];

export default function ContactFolder({ isOpen, onClose }: { isOpen: boolean; onClose?: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useGSAP(() => {
        if (isOpen && containerRef.current) {
            gsap.fromTo(containerRef.current,
                { y: -1000, opacity: 1 }, // Start from top
                { y: 0, opacity: 1, duration: 1.5, ease: "bounce.out" } // Fall to bottom
            );
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            ref={containerRef}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[100] w-64 h-64 flex justify-center items-end pb-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Social Files - Centered behind folder */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-6 items-end z-0">
                {socialLinks.map((link, index) => (
                    <motion.a
                        key={link.name}
                        href={link.url}
                        target={link.name === 'Mail' ? undefined : "_blank"}
                        rel={link.name === 'Mail' ? undefined : "noopener noreferrer"}
                        className="relative w-14 h-18 group cursor-pointer"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{
                            y: isHovered ? -110 : 50, // Move much higher to clear folder and be clickable
                            opacity: isHovered ? 1 : 0,
                            x: isHovered ? (index - 1) * 45 : 0, // Spread out widely
                            rotate: isHovered ? (index - 1) * 15 : 0,
                            zIndex: isHovered ? 20 : 0
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 120,
                            damping: 12,
                            delay: index * 0.1
                        }}
                        whileHover={{ scale: 1.25, y: -130, zIndex: 100 }} // Pop even higher on hover
                    >
                        {/* Tooltip */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none border border-white/10 backdrop-blur-md">
                            {link.name}
                        </div>

                        <Image
                            src={link.icon}
                            alt={link.name}
                            fill
                            className="object-contain drop-shadow-lg"
                        />
                    </motion.a>
                ))}
            </div>

            {/* Folder Front */}
            <div
                className={`relative w-40 h-32 z-10 transition-transform duration-300 ${isHovered ? 'pointer-events-none' : 'cursor-pointer'}`}
            >
                <Image
                    src="/images/contact/folder.svg"
                    alt="Contact Folder"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                />
            </div>

            {/* Close hint (optional, or rely on click outside) */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 text-white/50 hover:text-white text-xs p-2"
                >
                    ✕
                </button>
            )}
        </div>
    );
}
