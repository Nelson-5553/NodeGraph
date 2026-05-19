import type { FC } from "react";
import { motion } from "framer-motion";
import Card from "./Card";
import Button from "./Button";

interface Example {
  icon: string;
  title: string;
  description: string;
  gradient: string;
  useCase: string;
}

const examples: Example[] = [
  {
    icon: "🌐",
    title: "Social Network Graph",
    description: "Visualize user connections and relationships. Perfect for social platforms and community networks.",
    gradient: "from-cyan-500 to-blue-500",
    useCase: "Social Networks",
  },
  {
    icon: "🧠",
    title: "Knowledge Graph",
    description: "Map out interconnected concepts and ideas. Ideal for educational platforms and knowledge bases.",
    gradient: "from-blue-500 to-purple-500",
    useCase: "Education & Research",
  },
  {
    icon: "📦",
    title: "Dependency Tree",
    description: "Visualize package dependencies and system architecture. Essential for software development teams.",
    gradient: "from-purple-500 to-pink-500",
    useCase: "DevOps & Engineering",
  },
  {
    icon: "🤖",
    title: "AI Workflow",
    description: "Display machine learning pipelines and neural networks. Great for AI/ML visualization.",
    gradient: "from-pink-500 to-orange-500",
    useCase: "Machine Learning",
  },
  {
    icon: "🧩",
    title: "Mind Map",
    description: "Create beautiful mind maps and brainstorming sessions. Organize thoughts visually.",
    gradient: "from-orange-500 to-yellow-500",
    useCase: "Planning & Creativity",
  },
  {
    icon: "🏗️",
    title: "Software Architecture",
    description: "Illustrate system design and component interactions. Perfect for documentation.",
    gradient: "from-yellow-500 to-green-500",
    useCase: "System Design",
  },
];

const ExamplesSection: FC = () => {
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
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="examples" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-500/5 via-transparent to-pink-500/5">
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
            <span className="block text-white mb-2">Real-World Examples</span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              See What's Possible
            </span>
          </h2>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            NodeGraph powers visualization across industries. Explore these use
            cases and see how you can use it.
          </p>
        </motion.div>

        {/* Examples Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {examples.map((example) => (
            <motion.div key={example.title} variants={itemVariants}>
              <Card className="p-8 flex flex-col h-full group">
                {/* Icon */}
                <motion.div
                  className="text-5xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {example.icon}
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300">
                    {example.title}
                  </h3>

                  <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 mb-4">
                    {example.description}
                  </p>

                  <div className="flex items-center gap-2 mb-6">
                    <motion.div
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${example.gradient}`}
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                    <span className="text-xs font-medium text-neutral-400">
                      {example.useCase}
                    </span>
                  </div>
                </div>

                {/* Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <span>Explore Demo →</span>
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExamplesSection;
