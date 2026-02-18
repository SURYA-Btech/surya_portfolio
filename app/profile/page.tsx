"use client";

import CustomCursor from "@/components/landing/CustomCursor";
import FrameSequence from "@/components/profile/FrameSequence";
import SkillCard from "@/components/SkillCard";
import CircularGallery from "@/components/CircularGallery";
import ProjectBento, { ProjectData } from "@/components/ProjectBento";
import ScrollVelocity from "@/components/ScrollVelocity";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import ContactFolder from "@/components/ContactFolder";

const skills = [
  {
    title: "Programming",
    description: "Proficient in modern languages including TypeScript, JavaScript, Python, and C++.",
    image: "/images/cards/programming.png",
  },
  {
    title: "Full Stack",
    description: "Building end-to-end web applications with Next.js, React, Node.js, and SQL/NoSQL databases.",
    image: "/images/cards/fullstack.jpg",
  },
  {
    title: "Coding",
    description: "Writing clean, efficient, and maintainable code with a focus on performance and scalability.",
    image: "/images/cards/coding.jpg",
  },
  {
    title: "Tools",
    description: "Experienced with Git,Postman, Anaconda, Vercel.",
    image: "/images/cards/tools1.jpg",
  },
  {
    title: "Soft Skills",
    description: "Strong communication, teamwork, and problem-solving abilities in agile environments.",
    image: "/images/cards/soft1.jpg",
  },
];

const projects = [
  {
    id: 1,
    title: "P&G – Smart Manless Parking System",
    overview: "AI-powered automated parking solution",
    description:
      "An intelligent automated parking system that uses Automatic Number Plate Recognition (ANPR) and edge computing to enable seamless, contactless vehicle entry and exit. Designed to reduce human intervention, improve efficiency, and enhance security.",
    team: "Surya, Priya, Deepayalini",
    stack: "React Native, Machine Learning, Artificial Intelligence",
    awards: "Received incubation support",
    image: "/images/gallery/1.jpg",
  },
  {
    id: 2,
    title: "BlueGen – Marine Data Management Platform",
    overview: "Real-time marine data analytics system",
    description:
      "A full-featured marine data management platform that provides real-time data monitoring, analytics, and AI-powered search capabilities. Built to help researchers and organizations efficiently manage and analyze marine datasets.",
    team: "Surya, Dhanush BT, , jai vignesh, Shalini, Aashritha",
    stack: "Next.js, Node.js, Machine Learning",
    awards: "Winner – Sai Hackfest",
    image: "/images/gallery/2.jpg",
  },
  {
    id: 3,
    title: "AI Survey Builder",
    overview: "Community-driven intelligent survey platform",
    description:
      "A mobile-first survey platform powered by AI that enables users to create, distribute, and analyze surveys efficiently. Designed to support community-driven insights and data collection with intelligent analytics.",
    team: "Surya, Dhanush BT, Shalini, Tejeshwini",
    stack: "Next.js, Machine Learning, Artificial Intelligence",
    awards: "Participant – Statthon",
    image: "/images/gallery/3.jpg",
  },
  {
    id: 4,
    title: "Student Project Management System",
    overview: "Academic project tracking dashboard",
    description:
      "An enterprise-grade dashboard application designed to manage and track student academic projects. Features data visualization, progress tracking, and performance insights for better project supervision.",
    team: "Surya",
    stack: "Next.js, React, Lucide Icons, Recharts",
    awards: "None",
    image: "/images/gallery/4.jpg",
  },
];


export default function ProfilePage() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [showContact, setShowContact] = useState(false);

  const handleGetInTouch = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContact(true);
  };

  return (
    <main className="bg-black text-white min-h-screen">
      <CustomCursor />

      {/* Scrollable Frame Sequence */}
      <FrameSequence />

      {/* My Skills Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-black z-50 relative border-t border-white/10 py-20 px-6 md:px-20">
        <h2 className="font-heading text-5xl md:text-7xl font-bold text-white mb-16 tracking-tighter text-center italic">
          MY Skills.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              title={skill.title}
              description={skill.description}
              image={skill.image}
            />
          ))}
        </div>
      </section>


      {/* Circular Gallery Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-black relative py-20 overflow-hidden">
        <div className="w-full mb-10 relative z-10">
          <ScrollVelocity
            texts={['MY Projects : Hover to see the details']}
            velocity={2}
            className="projects-velocity-text"
          />
        </div>
        <div style={{ height: '600px', position: 'relative', width: '100%' }}>
          <CircularGallery
            items={projects}
            onSelect={setSelectedProject}
            bend={7}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollSpeed={5}
            scrollEase={0.15}
          />
        </div>

        {/* Project Bento Details */}
        <ProjectBento selectedProject={selectedProject} />

        {/* Test CTA Button */}
        <div className="mt-20 mb-10 relative z-50">
          <button
            onClick={handleGetInTouch}
            className="group relative px-12 py-6 md:px-24 md:py-8 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-full overflow-hidden flex items-center justify-center transition-all duration-700 cursor-pointer hover:scale-105 hover:border-white/20"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-1000 ease-out" />
            <span className="relative z-10 text-xl md:text-xl tracking-[0.2em] font-medium uppercase text-white/80 group-hover:text-white transition-all duration-700 flex items-center gap-4">
              Get in Touch <SendIcon fontSize="small" />
            </span>
          </button>
        </div>

        {/* Contact Folder Animation */}
        <ContactFolder isOpen={showContact} onClose={() => setShowContact(false)} />
      </section>
    </main>
  );
}
