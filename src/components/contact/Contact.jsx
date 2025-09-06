"use client";

import React, { useRef, Suspense } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Octahedron, OrbitControls } from "@react-three/drei";

// --- 1. 3D Scene Contents ---
// This component contains all the 3D elements and the R3F hooks.
// It will be placed INSIDE the Canvas component.
const Scene = () => {
  const meshRef = useRef();

  // Now useFrame is called within a component that will be inside the Canvas, so it has the right context.
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <motion.mesh
        ref={meshRef}
        whileHover={{ scale: 1.1, transition: { type: "spring" } }}
      >
        <Octahedron args={[2, 0]}>
          <meshStandardMaterial
            color="#00ff99"
            emissive="#00ff99"
            emissiveIntensity={0.5}
            wireframe
          />
        </Octahedron>
      </motion.mesh>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

// --- 2. Main Contact Component ---
const Contact = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth parallax animations
  const smoothOptions = { stiffness: 200, damping: 50, mass: 1 };
  const visualY = useSpring(
    useTransform(scrollYProgress, [0, 1], [-100, 100]),
    smoothOptions
  );
  const contentY = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, -50]),
    smoothOptions
  );

  // Staggered animation variants
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.4 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const contactLinks = [
    {
      icon: Mail,
      text: "hpaneru04@gmail.com",
      href: "mailto:hpaneru04@gmail.com",
    },
    {
      icon: Github,
      text: "github.com/hp15aug",
      href: "https://github.com/hp15aug",
    },
    {
      icon: Linkedin,
      text: "linkedin.com/in/hardik-paneru",
      href: "https://www.linkedin.com/in/hardik-paneru-515bb624a/",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-8 py-24 bg-[#0a0a0a] font-mono overflow-hidden"
    >
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Column: 3D Visual */}
        <motion.div style={{ y: visualY }} className="h-[500px] w-full">
          <Suspense
            fallback={
              <div className="w-full h-full bg-gray-900/50 rounded-2xl" />
            }
          >
            {/* The <Canvas> is now here, wrapping the component that uses R3F hooks */}
            <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
              <Scene />
            </Canvas>
          </Suspense>
        </motion.div>

        {/* Right Column: Content */}
        <motion.div style={{ y: contentY }} className="space-y-8">
          <h2 className="text-5xl lg:text-7xl font-bold text-gray-100 whitespace-nowrap">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-400 max-w-md">
            Have an idea or a project in mind? I'm always open to discussing new
            opportunities and innovative collaborations.
          </p>
          <motion.div
            className="space-y-4"
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            {contactLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 border border-gray-800 rounded-lg hover:bg-gray-900 hover:border-[#00ff99] transition-colors duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center gap-4">
                  <link.icon size={24} className="text-[#00ff99]" />
                  <span className="text-lg font-medium text-gray-300">
                    {link.text}
                  </span>
                </div>
                <ArrowUpRight className="text-gray-600 group-hover:text-[#00ff99] transition-colors duration-300 transform -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
