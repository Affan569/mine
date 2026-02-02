"use client";
import { motion } from "framer-motion";

const items = [
  "HTML", "CSS", "JS", "Node", "React", 
  "Laravel", "MySQL", "MongoDB", "Express", "Tailwind"
];

export default function OrbitTech() {
  return (
    <div className="relative w-[350px] h-[350px] flex items-center justify-center">
      <motion.div
        className="relative w-full h-full rounded-full border border-purple-500/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {items.map((tech, i) => {
          const angleDeg = (i * 360) / items.length;
          const angle = (angleDeg * Math.PI) / 180;
          const radius = 140;
          const cx = 175;
          const cy = 175;
          const x = cx + radius * Math.cos(angle) - 32;
          const y = cy + radius * Math.sin(angle) - 32;

          return (
            <div
              key={tech}
              className="absolute w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-purple-500/50 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-300 backdrop-blur-md"
              style={{
                left: `${x.toFixed(4)}px`,
                top: `${y.toFixed(4)}px`,
                transform: `rotate(${(-angleDeg).toFixed(3)}deg)`,
              }}
            >
              {tech}
            </div>
          );
        })}
      </motion.div>

      <div className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 blur-xl opacity-50 animate-pulse"></div>
      <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-white to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-inner flex items-center justify-center border-4 border-indigo-500/30 z-10">
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          Dev
        </span>
      </div>
    </div>
  );
}
