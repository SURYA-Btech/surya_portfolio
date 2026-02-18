"use client";

import { motion, AnimatePresence } from "framer-motion";

export interface ProjectData {
    id: number;
    title: string;
    overview: string;
    team: string;
    description: string;
    stack: string;
    awards: string;
    // Image is utilized in gallery, but not required to be displayed here per user request
    image?: string;
}

interface ProjectBentoProps {
    selectedProject: ProjectData | null;
}

export default function ProjectBento({ selectedProject }: ProjectBentoProps) {
    if (!selectedProject) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-6xl mx-auto px-6 py-10"
            >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(150px,auto)]">
                    {/* Title Card - Large */}
                    <div className="col-span-1 md:col-span-2 row-span-1 bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-end backdrop-blur-md">
                        <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Project</h3>
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight gradient-text inline-block">
                            {selectedProject.title}
                        </h2>
                    </div>

                    {/* Overview Card */}
                    <div className="col-span-1 md:col-span-2 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md flex flex-col justify-center">
                        <h3 className="text-sm uppercase tracking-wider mb-2 gradient-text font-bold inline-block">Overview</h3>
                        <p className="text-xl text-white font-medium">{selectedProject.overview}</p>
                    </div>

                    {/* Tech Stack - Tall */}
                    <div className="col-span-1 row-span-2 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                        <h3 className="text-sm uppercase tracking-wider mb-4 gradient-text font-bold inline-block">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedProject.stack.split(",").map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/90 border border-white/5"
                                >
                                    {tech.trim()}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Description - Large Center */}
                    <div className="col-span-1 md:col-span-2 row-span-2 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                        <h3 className="text-sm uppercase tracking-wider mb-4 gradient-text font-bold inline-block">Description</h3>
                        <p className="text-white/80 leading-relaxed">
                            {selectedProject.description}
                        </p>
                    </div>

                    {/* Team Card */}
                    <div className="col-span-1 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                        <h3 className="text-sm uppercase tracking-wider mb-2 gradient-text font-bold inline-block">Team</h3>
                        <p className="text-white font-medium">{selectedProject.team}</p>
                    </div>

                    {/* Awards Card */}
                    <div className="col-span-1 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md overflow-hidden relative group">
                        <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <h3 className="text-sm uppercase tracking-wider mb-2 gradient-text font-bold inline-block">Awards</h3>
                        <p className="text-yellow-400 font-bold text-lg">{selectedProject.awards}</p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
