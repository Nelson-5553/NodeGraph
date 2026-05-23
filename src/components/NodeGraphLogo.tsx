"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const letterVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.85 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 18 },
  },
};

const LOGO_LETTERS = ["N", null, "d", "e", "G", "r", "a", "p", "h"];

interface NodeGraphLogoProps {
  animated?: boolean;
  className?: string;
}

export default function NodeGraphLogo({ animated = false, className = "" }: NodeGraphLogoProps) {
  const wrapperVariants = animated ? container : { hidden: {}, show: {} };
  const itemVariants = animated ? letterVariant : { hidden: {}, show: {} };

  return (
    <motion.div
      className={`flex items-center ${className}`}
      variants={wrapperVariants}
      initial={animated ? "hidden" : "show"}
      animate="show"
    >
      {LOGO_LETTERS.map((letter, i) =>
        letter === null ? (
          // Orb replacing the "o"
          <motion.span
            key={i}
            variants={itemVariants}
            className="mx-[0.05em] flex items-center justify-center -translate-y-[0.05em]"
            style={{ width: "0.7em", height: "0.7em" }}
          >
            <motion.span
              className="block h-full w-full rounded-full"
              style={{
                background: "radial-gradient(circle at 35% 35%, #67e8f9, #06b6d4 50%, #2563eb)",
                boxShadow: animated ? "0 0 18px rgba(6,182,212,0.4)" : "none",
                position: "relative",
              }}
              animate={animated ? { y: [0, -6, 0] } : {}}
              transition={animated ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : {}}
            >
              {/* Orb shine */}
              <span
                className="absolute"
                style={{
                  top: "18%", left: "22%",
                  width: "28%", height: "20%",
                  background: "rgba(255,255,255,0.55)",
                  borderRadius: "50%",
                  transform: "rotate(-20deg)",
                }}
              />
            </motion.span>
          </motion.span>
        ) : (
          <motion.span
            key={i}
            variants={itemVariants}
            className="cherry-bomb-one-regular text-neutral-900"
            style={{ lineHeight: 1 }}
          >
            {letter}
          </motion.span>
        )
      )}
    </motion.div>
  );
}
