import type { FC } from "react";
import { motion } from "framer-motion";
import Card from "./Card";

interface DocsSectionProps {
  
}

const DocsSection: FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as any },
    },
  };

  return (
     <section className="px-4 sm:px-6 lg:px-8 mb-12">
      <div className="max-w-4xl mx-auto">


        <motion.div
          className="grid lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Installation */}
          <motion.div variants={itemVariants}>
             <Card className="p-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Installation</h3>
              <div className="bg-gray-200 rounded-lg p-4 mb-4 border border-gray-400 overflow-x-auto">
                <code className="text-sm text-blue-700 font-mono">
                  npm install nodegraph
                </code>
              </div>
               <p className="text-neutral-700 text-sm">
                 Install NodeGraph from npm and start visualizing your data in seconds.
               </p>
            </Card>
          </motion.div>

          {/* Basic Usage */}
           <motion.div variants={itemVariants}>
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Basic Usage</h3>
              <div className="bg-gray-200 rounded-lg p-4 mb-4 border border-gray-400 overflow-x-auto">
                <code className="text-xs text-green-700 font-mono block whitespace-pre">
{`import NodeGraph from 'nodegraph';

<NodeGraph
  nodes={nodes}
  links={links}
/>`}
                </code>
              </div>
              <p className="text-neutral-700 text-sm">
                Super simple. Just pass your nodes and links. That's it!
              </p>
            </Card>
          </motion.div>

          {/* Props Reference */}
           <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">Common Props</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-3 px-4 font-semibold text-neutral-900">Prop</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-900">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-900">Default</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-900">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        prop: "repulsion",
                        type: "number",
                        default: "120",
                        desc: "Node repulsion strength",
                      },
                      {
                        prop: "linkDistance",
                        type: "number",
                        default: "55",
                        desc: "Link length",
                      },
                      {
                        prop: "colors",
                        type: "string[]",
                        default: "[...]",
                        desc: "Node colors by group",
                      },
                      {
                        prop: "linkColor",
                        type: "string",
                        default: "rgba(...)",
                        desc: "Link color",
                      },
                      {
                        prop: "nodeHoverColor",
                        type: "string",
                        default: "#fff",
                        desc: "Hover highlight color",
                      },
                    ].map((row, i) => (
                      <motion.tr
                        key={i}
                        className="border-b border-gray-300 hover:bg-gray-100 transition-colors"
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                      >
                        <td className="py-3 px-4 text-blue-700 font-mono">{row.prop}</td>
                        <td className="py-3 px-4 text-neutral-700">{row.type}</td>
                        <td className="py-3 px-4 text-neutral-700">{row.default}</td>
                        <td className="py-3 px-4 text-neutral-700">{row.desc}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DocsSection;
