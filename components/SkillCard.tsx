"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface SkillCardProps {
    title: string;
    description: string;
    image: string;
}

export default function SkillCard({ title, description, image }: SkillCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            className="group relative w-full h-[320px] cursor-pointer perspective-1000"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className={`w-full h-full relative preserve-3d transition-all duration-700 ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}>

                {/* FRONT SIDE */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden bg-black/20 border border-white/10 shadow-lg">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 350px"
                    />
                    {/* Subtle Gradient Overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>

                {/* BACK SIDE */}
                <div className="absolute inset-0 w-full h-full backface-hidden [transform:rotateY(180deg)] rounded-2xl overflow-hidden bg-zinc-950/90 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col items-start justify-center p-8 text-left group-hover:border-white/20 transition-colors duration-500">
                    {/* Cinematic Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-[60px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none" />

                    <h3 className="font-heading text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-4 z-10 leading-[0.85]">
                        {title.toUpperCase()} .
                    </h3>

                    <div className="w-12 h-1 bg-white/20 mb-6 rounded-full" />

                    <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed z-10 tracking-wide">
                        {description}
                    </p>
                </div>

            </div>
        </motion.div>
    );
}
