import { motion } from "framer-motion";
import Button from "./Button";
import useGitStars from "../hooks/useGitStars";

const CTASection = () => {
  const { stars, loading } = useGitStars();
  return (
     <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-transparent via-cyan-400/10 to-transparent relative overflow-hidden">
      {/* Background Elements */}
       <div className="absolute inset-0 overflow-hidden">
         <motion.div
           className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"
           animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
           transition={{ duration: 8, repeat: Infinity }}
         ></motion.div>
         <motion.div
           className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"
           animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.8, 0.6] }}
           transition={{ duration: 8, repeat: Infinity, delay: 1 }}
         ></motion.div>
       </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-neutral-900 mb-3">Ready to Visualize?</span>
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Start Building Today
            </span>
          </h2>

          <p className="text-lg text-neutral-600 mb-12 max-w-2xl mx-auto">
            Join developers worldwide who are using NodeGraph to create stunning
            graph visualizations. Get started in minutes with comprehensive
            documentation and examples.
          </p>


           {/* Social Proof */}
           <motion.div
             className="mt-16 pt-8 border-t border-gray-300 flex flex-col sm:flex-row justify-center items-center gap-8"
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.4 }}
           >
             {[
               { count: loading ? "..." : stars ? (stars > 999 ? (stars / 1000).toFixed(1) + "k" : stars) : "0", label: "GitHub Stars" },
             ].map((stat) => (
               <div key={stat.label} className="text-center">
                 <div className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                   {stat.count}
                 </div>
                 <div className="text-sm text-neutral-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
