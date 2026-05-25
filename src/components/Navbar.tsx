import { motion } from "framer-motion";
import { Star } from "lucide-react";
import NodeGraphLogo from "./NodeGraphLogo";
import useGitStars from "../hooks/useGitStars";

const Navbar = () => {
  const { stars, loading } = useGitStars();
  return (
    <motion.nav
      className="top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2 font-bold text-xl text-neutral-900"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 rounded-lg flex justify-center items-center p-1 "></div>
            <NodeGraphLogo animated={false} className="text-2xl" />
          </motion.a>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <motion.a
              href="https://github.com/Nelson-5553/NodeGraph"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View repository on GitHub"
              className="
    group
    inline-flex
    items-center
    gap-2
    rounded-full
    border
    border-neutral-200
    bg-white/70
    px-3
    py-1.5
    text-sm
    text-neutral-700
    backdrop-blur-sm
    transition-all
    duration-200
    hover:border-neutral-300
    hover:bg-white
  "
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Star
                className="
      h-4
      w-4
      text-neutral-500
      transition-colors
      duration-200
      group-hover:text-yellow-500
      group-hover:fill-yellow-500
      group-hover:animate-pulse

    "
              />

              <span
                className="
      rounded-full
      bg-neutral-100
      px-1.5
      py-0.5
      text-xs
      text-neutral-500
    "
              >
                {loading ? "..." : stars ? (stars > 999 ? (stars / 1000).toFixed(1) + "k" : stars) : "0"}
              </span>
            </motion.a>
            <span className="text-neutral-500 text-sm border-l border-neutral-500 h-4 flex items-center scroll-pl-0.5"></span>

            <motion.a
              href="https://github.com/Nelson-5553#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 text-neutral-200 rounded-2xl text-sm font-semibold"
              whileTap={{ scale: 0.95 }}
            >
              GitHub
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/nelson-jimenez-10429a337/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800 text-neutral-200 rounded-2xl text-sm font-semibold"
              whileTap={{ scale: 0.95 }}
            >
              LinkedIn
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
