import type { FC } from "react";
import { useState } from "react";
import { NodeGraph } from "nodegraph-react";
import { motion } from "framer-motion";
import { Code } from "lucide-react";
import Card from "./Card";
import CodeModal from "./CodeModal";

type Demo = {
  id: string;
  label: string;
  nodes: Array<{ id: string; name: string; group: number }>;
  links: Array<[string, string]>;
  code: string;
};

interface DemoSectionProps {
  demos?: Demo[];
}



const DemoSection: FC<DemoSectionProps> = ({ demos = [] }) => {
  const [repulsion, setRepulsion] = useState(90);
  const [linkWidth, setLinkWidth] = useState(2);
  const [activeDemo, setActiveDemo] = useState("architecture");
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  const currentDemo = demos.find((d) => d.id === activeDemo) || demos[0];

  return (
    <section
      id="demo"
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-transparent via-blue-400/5 to-transparent"
    >
      <div className="max-w-7xl mx-auto">
        {/* Tabs Section */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3">
            {demos.map((demo) => (
              <motion.button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                  activeDemo === demo.id
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/50"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {demo.label}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Graph visualization */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <NodeGraph
              nodes={currentDemo.nodes}
              links={currentDemo.links}
              viewGuide={false}
              height={500}
              width="100%"
              repulsion={repulsion}
              colors={[
                "#00F5FF", // neon cyan
                "#00FF9D", // neon green
                "#8B5CF6", // electric purple
                "#FF00E5", // neon magenta
              ]}
              linkWidth={linkWidth}
              linkColor="rgba(15,23,42,0.18)"
              linkHoverColor="#111827"
              nodeHoverColor="#111827"
              nodeLabelFontSize={11}
              nodeLabelColor="rgba(17,24,39,0.9)"
              nodeLabelHoverColor="#06B6D4"
              nodeLabelShowOnHover={false}
              nodeLabelMinDegree={2}
              nodeLabelMinScale={0.25}
              className="relative overflow-hidden rounded-3xl border border-cyan-400/30 bg-white shadow-[0_0_25px_rgba(6,182,212,0.08)] bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-size-[32px_32px]"
            />

            
          </motion.div>

          {/* Controls */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-6 sticky top-32 h-fit">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">
                Controls
              </h3>

              {/* Repulsion Control */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-neutral-700 mb-3">
                  Repulsion
                </label>
                <input
                  type="range"
                  min="30"
                  max="200"
                  value={repulsion}
                  onChange={(e) => setRepulsion(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="text-sm text-cyan-600 font-mono mt-2">
                  {repulsion}
                </div>
                <p className="text-xs text-neutral-600 mt-2">
                  How strongly nodes push apart from each other
                </p>
              </div>

              {/* Link Width Control */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-neutral-700 mb-3">
                  Link Width
                </label>
                <input
                  type="range"
                  min="0.2"
                  max="2"
                  step="0.1"
                  value={linkWidth}
                  onChange={(e) => setLinkWidth(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="text-sm text-blue-600 font-mono mt-2">
                  {linkWidth.toFixed(1)}
                </div>
                <p className="text-xs text-neutral-600 mt-2">
                  Thickness of connection lines
                </p>
              </div>

              {/* Info */}
              <div className="pt-6 border-t border-gray-300">
                <motion.button
              onClick={() => setIsCodeModalOpen(true)}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Code className="w-5 h-5" />
              View Code
            </motion.button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <CodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        code={currentDemo.code}
        title={currentDemo.label}
      />
    </section>
  );
};

export default DemoSection;
