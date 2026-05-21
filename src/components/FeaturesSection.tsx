import type { FC } from "react";
import { motion } from "framer-motion";
import Card from "./Card";
import type React from "react";
import { Zap, Shell, Palette, Sparkles, CodeXml, Smartphone } from "lucide-react";


interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: <Zap className="w-8 h-8 group-hover:text-cyan-400 transition-colors duration-200" />,
    title: "Rendering Performance",
    description: "Efficiently render thousands of nodes without performance degradation. Optimized canvas rendering with smooth 60fps animations.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: <Shell className="w-8 h-8 group-hover:text-blue-400 transition-colors duration-200" />,
    title: "Interactive Physics",
    description: "Dynamic force-directed physics simulation. Fully configurable repulsion, link distance, and animation parameters for perfect layouts.",
    color: "from-blue-500 to-purple-500",
  },
  {
    icon: <Palette className="w-8 h-8 group-hover:text-purple-400 transition-colors duration-200" />,
    title: "Custom Styling",
    description: "Extensive customization options. Color schemes, node sizes, labels, link styles, and hover effects - all configurable.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <Smartphone className="w-8 h-8 group-hover:text-orange-400 transition-colors duration-200" />,
    title: "Responsive Design",
    description: "Automatically adapts to any screen size. Perfect on desktop, tablet, and mobile devices with touch support.",
    color: "from-pink-500 to-orange-500",
  },
  {
    icon: <Sparkles className="w-8 h-8 group-hover:text-yellow-400 transition-colors duration-200" />,
    title: "Hover Effects",
    description: "Rich interactive feedback with smooth transitions. Highlights connected nodes, changes colors, and shows dynamic tooltips.",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: <CodeXml className="w-8 h-8 group-hover:text-green-400 transition-colors duration-200" />,
    title: "Developer Friendly",
    description: "Simple prop-based API. Easy integration with React, Astro, or any framework. Comprehensive documentation and examples.",
    color: "from-yellow-500 to-green-500",
  },
];

const FeaturesSection: FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as any},
    },
  };

  return (
     <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-transparent via-transparent to-cyan-400/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-neutral-900 mb-2">Powerful Features</span>
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Built for Developers
            </span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Everything you need to visualize complex data structures and network
            graphs with ease.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card className="p-8 group cursor-pointer relative overflow-hidden h-full">
                {/* Gradient border on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className={`absolute inset-0 bg-linear-to-r ${feature.color} opacity-10`}
                  ></div>
                </div>

                <div className="relative z-10">
                  <motion.div
                    className={`text-5xl mb-4 inline-block p-3 rounded-xl bg-linear-to-r ${feature.color} bg-clip-text group-hover:rotate-10 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </motion.div>

                  <h3 className={`text-xl font-bold text-neutral-900 mb-3 group-hover:bg-linear-to-r ${feature.color} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                    {feature.title}
                  </h3>

                  <p className="text-neutral-600 group-hover:text-neutral-700 transition-colors duration-300">
                    {feature.description}
                  </p>

                  <motion.div
                    className={`mt-6 inline-block px-3 py-1 rounded-full text-sm font-medium bg-linear-to-r ${feature.color} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    whileHover={{ scale: 1.05 }}
                  >
                    Learn more →
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
