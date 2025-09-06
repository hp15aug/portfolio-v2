// src/components/BackButton.jsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const Back = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <motion.button
      onClick={handleClick}
      // Key changes for positioning are here
      className="group fixed top-8 left-8 z-50 flex items-center justify-center gap-2 w-max px-4 py-2 bg-transparent text-gray-300 border border-gray-600 rounded-full hover:bg-gray-800 hover:text-white hover:border-gray-500 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ArrowLeft
        size={20}
        className="transition-transform duration-300 group-hover:-translate-x-1"
      />
      <span className="font-medium">Back</span>
    </motion.button>
  );
};

export default Back;
