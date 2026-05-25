"use client";

import { motion } from "framer-motion";
import { Terminal, Copy, Check  } from "lucide-react";
import useCopy from "../hooks/useCopy";

import NodeGraphLogo from "./NodeGraphLogo";

// Logo removed because we extract it

export default function NodeGraphHero() {
  const { copy, copied } = useCopy();

  return (
    <section className="relative flex min-h-120 flex-col items-center justify-center overflow-hidden bg-white px-6 py-20">

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
        { size: 16,  color: "bg-cyan-300",  style: "bottom-[28%] right-[15%]", delay: 0.5 },
        { size: 8,  color: "bg-cyan-500",  style: "top-[30%] left-[18%]", delay: 1.2 },
        { size: 9,  color: "bg-blue-400",  style: "top-[40%] right-[20%]", delay: 0.8 },
        { size: 5,  color: "bg-purple-400", style: "top-[55%] left-[8%]", delay: 1.6 },
        { size: 11, color: "bg-cyan-400",  style: "bottom-[12%] right-[25%]", delay: 0.3 },
        { size: 7,  color: "bg-blue-500",  style: "bottom-[35%] left-[24%]", delay: 2.2 },
        { size: 13, color: "bg-purple-500", style: "top-[15%] right-[28%]", delay: 1.4 },
        { size: 6,  color: "bg-cyan-300",  style: "top-[68%] right-[12%]", delay: 2.8 },
        { size: 10, color: "bg-blue-300",  style: "bottom-[20%] left-[35%]", delay: 0.9 },
        { size: 14, color: "bg-cyan-400",  style: "top-[48%] left-[42%]", delay: 1.9 },
        { size: 8,  color: "bg-purple-400", style: "bottom-[42%] right-[35%]", delay: 2.5 },
        { size: 12, color: "bg-blue-500",  style: "top-[8%] left-[38%]", delay: 0.6 },
        { size: 5,  color: "bg-cyan-500",  style: "bottom-[8%] right-[42%]", delay: 1.1 },
        { size: 9,  color: "bg-purple-500", style: "top-[62%] left-[30%]", delay: 2.1 },
        { size: 7,  color: "bg-blue-400",  style: "top-[35%] right-[40%]", delay: 1.7 },
        { size: 11, color: "bg-cyan-300",  style: "bottom-[30%] left-[45%]", delay: 0.4 },
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
      <NodeGraphLogo 
        animated={true} 
        className="mb-1 text-[clamp(2.8rem,8vw,5rem)]" 
      />

      {/* "Visualize Everything" tagline */}
      <div className="duration-800 ease-in-out will-change-transform starting:translate-y-8 starting:opacity-0 starting:blur-xs">
         <motion.h2
           className="bg-clip-text text-transparent h-28 text-center"
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
        <div className="bg-gray-200 rounded-md p-2 overflow-x-auto flex items-center gap-3">
          <code className="text-xl text-neutral-700 font-mono flex items-center">
            <Terminal className="inline-block mr-2" />npm install nodegraph-react
          </code>
          {/* copy button using hook */}
          <button
            type="button"
            onClick={() => { void copy("npm install nodegraph-react") }}
            className="ml-2 rounded-md bg-gray-500 px-2 py-2 text-sm font-medium text-white cursor-pointer hover:bg-gray-600 transition-colors duration-200"
          >
            {copied ? <Check className="inline-block w-6 h-6" /> : <Copy className="inline-block w-6 h-6" />}
          </button>
        </div>
      </div>
    </section>
  );
}