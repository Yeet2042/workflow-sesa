"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Button() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className="relative bg-primary-950 text-white px-8 py-3 rounded-lg whitespace-nowrap overflow-hidden shadow-lg transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex items-center justify-center w-full"
        animate={{ x: isHovered ? -12 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="font-medium tracking-wide">สมัครใช้งาน</span>
      </motion.div>
      
      <AnimatePresence>
        {isHovered && (
          <motion.span
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            initial={{ x: 20, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 20, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            🚀
          </motion.span>
        )}
      </AnimatePresence>
      <motion.div
        className="absolute inset-0 rounded-lg z-0"
        transition={{ duration: 0.4 }}
      />
    </button>
  );
}