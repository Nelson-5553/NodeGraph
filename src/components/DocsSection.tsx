import type { FC } from "react";
import { motion } from "framer-motion";
import Card from "./Card";

interface DocsSectionProps {
  viewGuide?: boolean;
  colors?: string[];
  width?: string | number;
  height?: string | number;
  repulsion?: number;
  linkDistance?: number;
  linkColor?: string;
  className?: string;
  linkWidth?: number;
  linkHoverColor?: string;
  linkHoverWidth?: number;
  nodeHoverColor?: string;
  nodeLabelColor?: string;
  nodeLabelHoverColor?: string;
  nodeLabelFontSize?: number;
  nodeLabelShowOnHover?: boolean;
  nodeLabelMinDegree?: number;
  nodeLabelMinScale?: number;
}

const DocsSection: FC<DocsSectionProps> = ({
  viewGuide = false,
  colors = [
    "#3b82f6",
  ],
  width = "100%",
  height = "100%",
  repulsion = 120,
  linkDistance = 55,
  linkColor = "rgba(100,116,139,0.6)",
  className = "bg-white",
  linkWidth = 2,
  linkHoverColor = "rgba(100,116,139,0.8)",
  linkHoverWidth = 3,
  nodeHoverColor = "rgba(59,134,246,0.8)",
  nodeLabelColor = "rgba(100,116,139,0.8)",
  nodeLabelHoverColor = "rgba(59,134,246,0.8)",
  nodeLabelFontSize = 14,
  nodeLabelShowOnHover = true,
  nodeLabelMinDegree = 0,
  nodeLabelMinScale = 1,

}) => {
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
        
          {/* Props Reference */}
           <motion.div variants={itemVariants} className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">Common Props</h3>
            <Card className="p-8">
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
                        prop: "nodes",
                        type: "Node[]",
                        default: "[]",
                        desc: "Array of node objects with id, name, and group",
                      },
                      {
                        prop: "links",
                        type: "Array<[string, string]>",
                        default: "[]",
                        desc: "Array of node connections [source, target]",
                      },
                      {
                        prop: "width",
                        type: "string | number",
                        default: typeof width === "string" ? `"${width}"` : String(width),
                        desc: "Canvas width",
                      },
                      {
                        prop: "height",
                        type: "string | number",
                        default: typeof height === "string" ? `"${height}"` : String(height),
                        desc: "Canvas height",
                      },
                      {
                        prop: "repulsion",
                        type: "number",
                        default: String(repulsion),
                        desc: "Node repulsion strength",
                      },
                      {
                        prop: "linkDistance",
                        type: "number",
                        default: String(linkDistance),
                        desc: "Link length",
                      },
                      {
                        prop: "colors",
                        type: "string[]",
                        default: JSON.stringify(colors),
                        desc: "Node colors by group",
                      },
                      {
                        prop: "linkColor",
                        type: "string",
                        default: `"${linkColor}"`,
                        desc: "Link color",
                      },
                      {
                        prop: "linkWidth",
                        type: "number",
                        default: String(linkWidth),
                        desc: "Link stroke width",
                      },
                      {
                        prop: "linkHoverColor",
                        type: "string",
                        default: `"${linkHoverColor}"`,
                        desc: "Link hover color",
                      },
                      {
                        prop: "linkHoverWidth",
                        type: "number",
                        default: String(linkHoverWidth),
                        desc: "Link width on hover",
                      },
                      {
                        prop: "nodeHoverColor",
                        type: "string",
                        default: `"${nodeHoverColor}"`,
                        desc: "Node hover highlight color",
                      },
                      {
                        prop: "nodeLabelColor",
                        type: "string",
                        default: `"${nodeLabelColor}"`,
                        desc: "Node label color",
                      },
                      {
                        prop: "nodeLabelHoverColor",
                        type: "string",
                        default: `"${nodeLabelHoverColor}"`,
                        desc: "Node label hover color",
                      },
                      {
                        prop: "nodeLabelFontSize",
                        type: "number",
                        default: String(nodeLabelFontSize),
                        desc: "Node label font size",
                      },
                      {
                        prop: "nodeLabelShowOnHover",
                        type: "boolean",
                        default: String(nodeLabelShowOnHover),
                        desc: "Show labels only on hover",
                      },
                      {
                        prop: "nodeLabelMinDegree",
                        type: "number",
                        default: String(nodeLabelMinDegree),
                        desc: "Minimum connections to show label",
                      },
                      {
                        prop: "nodeLabelMinScale",
                        type: "number",
                        default: String(nodeLabelMinScale),
                        desc: "Minimum zoom scale to show labels",
                      },
                      {
                        prop: "className",
                        type: "string",
                        default: `"${className}"`,
                        desc: "CSS class for canvas container",
                      },
                      {
                        prop: "viewGuide",
                        type: "boolean",
                        default: String(viewGuide),
                        desc: "Show view guide overlay",
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
