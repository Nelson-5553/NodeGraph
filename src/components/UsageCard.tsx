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

interface UsageItem {
  data: {
    id: string;
    title: string;
    description: string;
    graph: GraphData[];
  };
}

interface UsageCardProps {
  items: UsageItem[];
}

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
    transition: { duration: 0.6, ease: "easeOut" as any },
  },

};
export default function UsageCard({ items }: UsageCardProps) {
  return (
    <section className="py-2 lg:py-32 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-transparent via-blue-400/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
           {items.map((card) => (
             <motion.article
               key={card.data.title}
               variants={itemVariants}
               className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_4px_14px_rgba(0,0,0,0.06)] hover:shadow-2xl hover:shadow-blue-500/20 transition-shadow duration-300 flex flex-col"
             >
               <div className="h-48 w-full bg-white shrink-0">
                  {card.data.graph && card.data.graph.length > 0 && (
                    <NodeGraph
                      nodes={card.data.graph[0].nodes}
                      links={card.data.graph[0].links}
                      viewGuide={card.data.graph[0].viewGuide ?? false}
                      colors={card.data.graph[0].colors}
                      width={card.data.graph[0].width ?? "100%"}
                      height={card.data.graph[0].height ?? "100%"}
                      repulsion={card.data.graph[0].repulsion}
                      linkDistance={card.data.graph[0].linkDistance}
                      className={card.data.graph[0].className}
                      linkColor={card.data.graph[0].linkColor}
                      linkWidth={card.data.graph[0].linkWidth}
                      linkHoverColor={card.data.graph[0].linkHoverColor}
                      linkHoverWidth={card.data.graph[0].linkHoverWidth}
                      nodeHoverColor={card.data.graph[0].nodeHoverColor}
                      nodeLabelColor={card.data.graph[0].nodeLabelColor}
                      nodeLabelHoverColor={card.data.graph[0].nodeLabelHoverColor}
                      nodeLabelFontSize={card.data.graph[0].nodeLabelFontSize}
                      nodeLabelShowOnHover={card.data.graph[0].nodeLabelShowOnHover}
                      nodeLabelMinDegree={card.data.graph[0].nodeLabelMinDegree}
                      nodeLabelMinScale={card.data.graph[0].nodeLabelMinScale}
                    />
                  )}
                </div>
               <div className="p-4 grow flex flex-col justify-between">
                 <div>
                   <h3 className="mb-2 text-[1.1rem] leading-[1.3]">
                     {card.data.title}
                   </h3>
                   <p className="m-0 text-[0.95rem] leading-6 text-gray-600">
                     {card.data.description}
                   </p>
                   <a href={`/usage/${card.data.id}`} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                     Learn More
                   </a>
                 </div>
               </div>
             </motion.article>
           ))}
        </motion.div>
      </div>
    </section>
  );
}
