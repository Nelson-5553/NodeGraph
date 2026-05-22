import { motion } from "framer-motion";
import NodeGraph from "./NodeGraph";

interface GraphData {
  nodes: Array<{
    id: string;
    name: string;
    group: number;
  }>;
  links: Array<[string, string]>;
  viewGuide?: boolean;
  colors?: string[];
  width?: number | string;
  height?: number | string;
  repulsion?: number;
  linkDistance?: number;
  className?: string;
  linkColor?: string;
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

interface UsageCardProps {
  graph: GraphData;
  title: string;
  description: string;
  id: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as any },
  },
};

export default function UsageCard({ graph, title, description, id }: UsageCardProps) {
  return (
    <motion.article
      variants={itemVariants}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_4px_14px_rgba(0,0,0,0.06)] hover:shadow-2xl hover:shadow-blue-500/20 transition-shadow duration-300 flex flex-col"
    >
      <div className="h-48 w-full bg-white shrink-0">
        <NodeGraph
          nodes={graph.nodes}
          links={graph.links}
          viewGuide={graph.viewGuide ?? false}
          colors={graph.colors}
          width={graph.width ?? "100%"}
          height={graph.height ?? "100%"}
          repulsion={graph.repulsion}
          linkDistance={graph.linkDistance}
          className={graph.className}
          linkColor={graph.linkColor}
          linkWidth={graph.linkWidth}
          linkHoverColor={graph.linkHoverColor}
          linkHoverWidth={graph.linkHoverWidth}
          nodeHoverColor={graph.nodeHoverColor}
          nodeLabelColor={graph.nodeLabelColor}
          nodeLabelHoverColor={graph.nodeLabelHoverColor}
          nodeLabelFontSize={graph.nodeLabelFontSize}
          nodeLabelShowOnHover={graph.nodeLabelShowOnHover}
          nodeLabelMinDegree={graph.nodeLabelMinDegree}
          nodeLabelMinScale={graph.nodeLabelMinScale}
        />
      </div>
      <div className="p-4 grow flex flex-col justify-between">
        <div>
          <h3 className="mb-2 text-[1.1rem] leading-[1.3]">
            {title}
          </h3>
          <p className="m-0 text-[0.95rem] leading-6 text-gray-600">
            {description}
          </p>
          <a href={`/usage/${id}`} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Learn More
          </a>
        </div>
      </div>
    </motion.article>
  );
}
