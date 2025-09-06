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
      <div className="flex flex-col">
        <motion.div className="pt-2" drag dragMomentum={false}>
          <Icon
            image="/pc/explorer2.png"
            label="Explorer"
            path="/file-explorer"
          />
        </motion.div>

        <motion.div className="pt-2 " drag dragMomentum={false}>
          <a
            target="blank"
            href="https://drive.google.com/drive/folders/1x-5r9RobFMQWBcHwkXZ1JZymNkIVq06v"
          >
            <Icon
              image="/pc/explorer2.png"
              label="Resume"
              path="https://drive.google.com/drive/folders/1x-5r9RobFMQWBcHwkXZ1JZymNkIVq06v"
            />
          </a>
        </motion.div>

        <motion.div className="pt-2" drag dragMomentum={false}>
          <Icon
            image="/pc/experience.png"
            label="Experience"
            path="/experience"
          />
        </motion.div>
      </div>

      <motion.div className="pt-2 pl-[45%]" drag dragMomentum={false}>
        <Icon image="/pc/snake.png" label="Snake" path="/snake" />
      </motion.div>

      <motion.div className="pt-2 pl-[33%]" drag dragMomentum={false}>
        <Icon image="/pc/about.png" label="About Me" path="/about" />
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
