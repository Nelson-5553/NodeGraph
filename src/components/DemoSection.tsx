import type { FC } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import NodeGraph from "./NodeGraph";
import Card from "./Card";

// Sample graph data for demo
const DEMO_NODES = [
  { id: "n1", name: "API Gateway", group: 0 },
  { id: "n2", name: "Auth Service", group: 1 },
  { id: "n3", name: "User Service", group: 1 },
  { id: "n4", name: "Database", group: 2 },
  { id: "n5", name: "Cache", group: 2 },
  { id: "n6", name: "Queue", group: 2 },
  { id: "n7", name: "Analytics", group: 3 },
  { id: "n8", name: "Logging", group: 3 },
  { id: "n9", name: "Monitoring", group: 3 },
  { id: "n10", name: "WebSocket", group: 1 },
];

const DEMO_LINKS = [
  ["n1", "n2"],
  ["n1", "n3"],
  ["n1", "n10"],
  ["n2", "n4"],
  ["n3", "n4"],
  ["n3", "n5"],
  ["n1", "n6"],
  ["n4", "n6"],
  ["n1", "n7"],
  ["n3", "n8"],
  ["n2", "n9"],
  ["n10", "n5"],
];

const DemoSection: FC = () => {
  const [repulsion, setRepulsion] = useState(90);
  const [linkWidth, setLinkWidth] = useState(0.8);

  return (
    <section id="demo" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
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
            <span className="block text-white mb-2">Interactive Demo</span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Play with the Controls
            </span>
          </h2>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Adjust the parameters in real-time and watch the graph respond
            instantly. Drag nodes, zoom, and pan around.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Graph visualization */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            
             
                <NodeGraph
                  nodes={DEMO_NODES}
                  links={DEMO_LINKS}
                  viewGuide={false}
                  height={500}
                  width={920}
                  repulsion={repulsion}
                  colors={[
                    "#06B6D4", // cyan
                    "#3B82F6", // blue
                    "#8B5CF6", // purple
                    "#EC4899", // pink
                  ]}
                  linkColor="rgba(255,255,255,0.15)"
                  linkWidth={linkWidth}
                  linkHoverColor="#FFFFFF"
                  nodeHoverColor="#FFFFFF"
                  nodeLabelFontSize={11}
                  nodeLabelColor="rgba(209,213,219,0.85)"
                  nodeLabelHoverColor="#FFFFFF"
                  nodeLabelShowOnHover={false}
                  nodeLabelMinDegree={0}
                  nodeLabelMinScale={0.3}
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
              <h3 className="text-xl font-bold text-white mb-6">Controls</h3>

              {/* Repulsion Control */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-neutral-300 mb-3">
                  Repulsion
                </label>
                <input
                  type="range"
                  min="30"
                  max="200"
                  value={repulsion}
                  onChange={(e) => setRepulsion(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="text-sm text-cyan-400 font-mono mt-2">{repulsion}</div>
                <p className="text-xs text-neutral-500 mt-2">
                  How strongly nodes push apart from each other
                </p>
              </div>

              {/* Link Width Control */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-neutral-300 mb-3">
                  Link Width
                </label>
                <input
                  type="range"
                  min="0.2"
                  max="2"
                  step="0.1"
                  value={linkWidth}
                  onChange={(e) => setLinkWidth(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="text-sm text-blue-400 font-mono mt-2">{linkWidth.toFixed(1)}</div>
                <p className="text-xs text-neutral-500 mt-2">
                  Thickness of connection lines
                </p>
              </div>

              {/* Info */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-xs text-neutral-400 leading-relaxed">
                  💡 Drag nodes to move them. Scroll to zoom. Right-click to pan.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
