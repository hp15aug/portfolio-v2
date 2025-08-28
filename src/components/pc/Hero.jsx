"use client";
import React from "react";
import Icon from "./Icon";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center relative flex flex-row"
      style={{ backgroundImage: "url('/pc/wallpaper.png')" }}
    >
      {/* Set dragMomentum to false for more friction */}
      <motion.div className="pt-2" drag dragMomentum={false}>
        <Icon
          image="/pc/explorer2.png"
          label="Explorer"
          path="/file-explorer"
        />
      </motion.div>

      <motion.div className="pt-2 pl-[45%]" drag dragMomentum={false}>
        <Icon image="/pc/snake.png" label="Snake" path="/snake" />
      </motion.div>

      <motion.div className="pt-2 pl-[33%]" drag dragMomentum={false}>
        <Icon image="/pc/explorer2.png" label="About Me" path="/about-me" />
      </motion.div>

      <motion.div className="pt-2" drag dragMomentum={false}>
        <Icon image="/pc/explorer2.png" label="Contact" path="/contact" />
      </motion.div>

      <motion.div className="pt-2" drag dragMomentum={false}>
        <Icon image="/pc/explorer2.png" label="Projects" path="/projects" />
      </motion.div>
    </div>
  );
};

export default Hero;
