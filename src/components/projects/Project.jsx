"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const Project = ({ projects }) => {
  const containerRef = useRef(null);

  const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);
    const { scrollYProgress: cardScrollProgress } = useScroll({
      target: cardRef,
      offset: ["start end", "end start"],
    });

    // Smooth & Cinematic Animations
    const smoothOptions = { stiffness: 200, damping: 50, mass: 1 };
    const imageY = useSpring(
      useTransform(cardScrollProgress, [0, 1], [50, -50]),
      smoothOptions
    );
    const contentY = useSpring(
      useTransform(cardScrollProgress, [0, 1], [30, -30]),
      smoothOptions
    );

    const isEven = index % 2 === 0;

    // Animation variants for staggered text reveal
    const titleContainerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
          delayChildren: 0.4,
        },
      },
    };

    const characterVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100 },
      },
    };

    return (
      <motion.div
        ref={cardRef}
        className="min-h-screen flex items-center justify-center px-8 py-16 font-mono"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <motion.div
            style={{ y: imageY }}
            className={`relative overflow-hidden aspect-[4/3] w-full ${
              isEven ? "md:order-last" : ""
            }`}
          >
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover rounded-lg shadow-2xl"
              initial={{ scale: 1.2, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: false }}
              whileHover={{ scale: 1.05 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
          </motion.div>

          {/* Content Section */}
          <motion.div style={{ y: contentY }} className={`space-y-8`}>
            <motion.h2
              className="text-5xl lg:text-7xl font-bold text-gray-100"
              variants={titleContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
            >
              {project.title.split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={characterVariants}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p
              className="text-lg text-gray-400 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: false }}
            >
              {project.description}
            </motion.p>

            {/* Links */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: false }}
            >
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 border border-[#00ff99] text-[#00ff99] hover:bg-[#00ff99] hover:text-black transition-all duration-300 rounded-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px #00ff99" }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
                <span className="font-medium">Code</span>
              </motion.a>

              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 bg-[#00ff99] text-black font-bold hover:bg-opacity-80 transition-all duration-300 rounded-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px #00ff99" }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={20} />
                <span className="font-medium">Demo</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  const sampleProjects = [
    {
      title: "IL7 Studios",
      description:
        "A modern, responsive website built for IL7 Studios to showcase their creative services and portfolio.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      githubUrl: "https://github.com/hp15aug/client",
      demoUrl: "https://il7studios.com/",
    },
    {
      title: "Spectrogram Visualization",
      description:
        "A sophisticated signal analysis tool for visualizing speech, music, and EEG signals using STFT, with interactive and real-time processing.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      githubUrl: "https://github.com/hp15aug/spectrogram-pbl",
      demoUrl: "https://spectrogram-hp15a.streamlit.app/",
    },
    {
      title: "Personal Portfolio Website",
      description:
        "A sleek and responsive portfolio site built to showcase my projects, skills, and experiences with smooth animations and a modern UI.",
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      githubUrl: "https://github.com/yourusername/your-portfolio-repo",
      demoUrl: "https://your-portfolio-url.vercel.app/",
    },
    {
      title: "NeuroFit Pro",
      description:
        "An AI-powered fitness assistant that analyzes real-time sensor data to detect activities, estimate calories, and provide personalized health coaching.",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      githubUrl: "https://github.com/hp15aug/Neuro-Fit-AI",
      demoUrl: "https://neuro-fit-ai-hp15a.streamlit.app/",
    },
  ];

  return (
    <div ref={containerRef} className="bg-[#0a0a0a]">
      {sampleProjects.map((project, index) => (
        <ProjectCard key={index} project={project} index={index} />
      ))}
    </div>
  );
};

export default Project;
