// src/components/Loader.jsx

"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = ["Hello", "नमस्ते", "こんにちは", "你好", "안녕하세요"];

export default function Loader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, 1250);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-full bg-black">
      <AnimatePresence mode="wait">
        <motion.h1
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="text-4xl md:text-6xl font-light tracking-wide text-gray-100 loader-glow"
        >
          {greetings[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
