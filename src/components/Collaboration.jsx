"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Collaboration = () => {
  const title = "Interested in collaborating?";
  const description =
    "I'm always open to discussing new opportunities and innovative projects.";

  // Animation variants for the staggered character reveal
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
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
    <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center px-8 py-16 font-mono">
      <div className="text-center max-w-4xl w-full">
        {/* Animated Heading */}
        <motion.h2
          className="text-5xl lg:text-7xl font-bold text-gray-100 mb-6"
          variants={titleContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
        >
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={characterVariants}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h2>

        {/* Animated Paragraph */}
        <motion.p
          className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: false }}
        >
          {description}
        </motion.p>

        {/* Animated "Get In Touch" Button */}
        <motion.a
          href="mailto:your-email@example.com" // <-- IMPORTANT: Change this to your email
          className="group inline-flex items-center space-x-2 px-8 py-4 bg-[#00ff99] text-black font-bold rounded-lg text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 15px #00ff99" }}
          whileTap={{ scale: 0.95 }}
          viewport={{ once: false }}
        >
          <span>Get In Touch</span>
          <ArrowRight
            size={24}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </motion.a>
      </div>
    </div>
  );
};

export default Collaboration;
