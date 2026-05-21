"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

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
    transition: { type: "spring" as const, stiffness: 300, damping: 18},
  },
};

const LOGO_LETTERS = ["N", null, "d", "e", "G", "r", "a", "p", "h"];

export default function NodeGraphHero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 py-20">

      {/* Subtle radial glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-[15%] right-[10%] h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* Floating nodes */}
      {[
        { size: 10, color: "bg-cyan-400", style: "top-[12%] left-[7%]", delay: 0 },
        { size: 7,  color: "bg-purple-500", style: "top-[22%] right-[9%]", delay: 1 },
        { size: 12, color: "bg-blue-500",  style: "bottom-[18%] left-[12%]", delay: 2 },
        { size: 6,  color: "bg-cyan-300",  style: "bottom-[28%] right-[7%]", delay: 0.5 },
      ].map((n, i) => (
        <motion.span
          key={i}
          className={`absolute rounded-full opacity-40 ${n.color} ${n.style}`}
          style={{ width: n.size, height: n.size }}
          animate={{ y: [0, -8, 4, 0], x: [0, 4, -5, 0] }}
          transition={{ duration: 5 + i, delay: n.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Badge */}
      <div
        className="mb-8 flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-1.5 md:inline-flex duration-600 ease-in-out will-change-transform starting:translate-y-8 starting:opacity-0 starting:blur-xs"
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
        </span>
        <span className="text-sm font-semibold tracking-wide text-cyan-500">
          Interactive Graph Visualization
        </span>
      </div>

      {/* Logo */}
      <motion.div
        className="mb-1 flex items-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {LOGO_LETTERS.map((letter, i) =>
          letter === null ? (
            // Orb replacing the "o"
            <motion.span
              key={i}
              variants={letterVariant}
              className="mx-1 flex items-center justify-center"
              style={{ width: "clamp(2.4rem, 6vw, 3.6rem)", height: "clamp(2.4rem, 6vw, 3.6rem)" }}
            >
              <motion.span
                className="block h-full w-full rounded-full"
                style={{
                  background: "radial-gradient(circle at 35% 35%, #67e8f9, #06b6d4 50%, #2563eb)",
                  boxShadow: "0 0 18px rgba(6,182,212,0.4)",
                  position: "relative",
                }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
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
              variants={letterVariant}
              className="cherry-bomb-one-regular text-neutral-900"
              style={{ fontSize: "clamp(2.8rem, 8vw, 5rem)", lineHeight: 1 }}
            >
              {letter}
            </motion.span>
          )
        )}
      </motion.div>

      {/* "Visualize Everything" tagline */}
      <div className="duration-800 ease-in-out will-change-transform starting:translate-y-8 starting:opacity-0 starting:blur-xs">
         <motion.h2
           className="bg-clip-text text-transparent h-28"
           style={{
             backgroundImage: "linear-gradient(90deg, #22d3ee 0%, #3b82f6 45%, #a855f7 100%)",
             backgroundSize: "200% auto",
             fontSize: "clamp(2.8rem, 9vw, 5.5rem)",
             fontWeight: 800,
             lineHeight: 1.05,
           }}
          animate={{ backgroundPosition: ["0% center", "200% center"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          Visualize Everything
        </motion.h2>
      </div>

       {/* Sub-tagline */}
       <p
         className="mt-3 text-center text-lg text-neutral-500 duration-1000 ease-in-out will-change-transform starting:translate-y-8 starting:opacity-0 starting:blur-xs"
        style={{ maxWidth: 480 }}
       >
         Turn complex data into stunning, interactive graphs — instantly.
       </p>

      {/* CTA buttons */}
      <div
        className="mt-8 flex gap-3 duration-1200 ease-in-out will-change-transform starting:translate-y-8 starting:opacity-0 starting:blur-xs"
      >
        <div className="bg-gray-200 rounded-md p-2 overflow-x-auto ">
                <code className="text-xl text-neutral-700 font-mono">
                  <Terminal className="inline-block mr-2" />npm install nodegraph
                </code>
              </div>
      </div>
    </section>
  );
}