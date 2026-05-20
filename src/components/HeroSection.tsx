import { useState } from "react";
import { motion } from "framer-motion";
import Button from "./Button";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) * 20 - 10;
    const y = (clientY / innerHeight) * 20 - 10;
    setMousePosition({ x, y });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
         <motion.div
           className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl opacity-60"
           animate={{
             scale: [1, 1.2, 1],
             opacity: [0.6, 0.8, 0.6],
           }}
           transition={{ duration: 8, repeat: Infinity }}
         ></motion.div>
         <motion.div
           className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl opacity-60"
           animate={{
             scale: [1.2, 1, 1.2],
             opacity: [0.6, 0.8, 0.6],
           }}
           transition={{ duration: 8, repeat: Infinity, delay: 1 }}
         ></motion.div>
         <motion.div
           className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2"
           animate={{
             scale: [1, 1.15, 1],
             opacity: [0.4, 0.6, 0.4],
           }}
           transition={{ duration: 10, repeat: Infinity, delay: 2 }}
         ></motion.div>
      </div>

       {/* Grid background */}
       <div className="absolute inset-0 opacity-10">
         <div
           className="w-full h-full"
           style={{
             backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(0,0,0,.05) 25%, rgba(0,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,.05) 75%, rgba(0,0,0,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0,0,0,.05) 25%, rgba(0,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,.05) 75%, rgba(0,0,0,.05) 76%, transparent 77%, transparent)`,
             backgroundSize: "50px 50px",
           }}
         ></div>
       </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
         {/* Badge */}
         <motion.div variants={itemVariants} className="inline-block mb-8">
           <motion.div
             className="px-4 py-2 rounded-full bg-gray-200 border border-cyan-400/30 backdrop-blur-sm"
             whileHover={{ borderColor: "rgba(34, 211, 238, 0.6)", scale: 1.05 }}
             transition={{ duration: 0.3 }}
           >
            <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              ✨ Interactive Graph Visualization
            </span>
          </motion.div>
        </motion.div>

         {/* Main heading */}
         <motion.div variants={itemVariants}>
           <h1 className="mb-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
             <span className="block text-neutral-900 mb-3">NodeGraph</span>
            <motion.span
              className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              Visualize Everything
            </motion.span>
          </h1>
        </motion.div>

         {/* Subtitle */}
         <motion.p
           variants={itemVariants}
           className="text-lg sm:text-xl text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed"
         >
          Interactive graph visualization component for modern web applications.
          Render thousands of nodes with physics-based layouts and stunning
          interactions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button size="lg" variant="primary" href="#demo">
            <span>⚡</span>
            <span>Get Started</span>
          </Button>
          <Button size="lg" variant="secondary" href="#examples">
            <span>🎯</span>
            <span>View Examples</span>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            href="https://github.com"
            target="_blank"
          >
            <span>⭐</span>
            <span>GitHub</span>
          </Button>
        </motion.div>

         {/* Stats */}
         <motion.div
           variants={itemVariants}
           className="grid grid-cols-3 gap-4 sm:gap-8 mb-16 pt-8 border-t border-gray-300"
         >
          {[
            { label: "Nodes Supported", value: "10K+" },
            { label: "Smooth Rendering", value: "60fps" },
            { label: "Customizable", value: "100%" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-neutral-500 mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center pt-8"
        >
          <svg
            className="w-6 h-6 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;

