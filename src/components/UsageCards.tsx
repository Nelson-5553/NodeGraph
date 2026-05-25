import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { NodeGraph } from "@nelson-5553/nodegraph-react";

interface UsageItem {
  id: string;
  data: {
    id: string;
    title: string;
    description: string;
    graph: Array<{
      nodes: any[];
      links: any[];
      viewGuide?: boolean;
      colors?: any;
      width?: string | number;
      height?: string | number;
      repulsion?: number;
      linkDistance?: number;
      className?: string;
      linkColor?: any;
      linkWidth?: number;
      linkHoverColor?: any;
      linkHoverWidth?: number;
      nodeHoverColor?: any;
      nodeLabelColor?: any;
      nodeLabelHoverColor?: any;
      nodeLabelFontSize?: number;
      nodeLabelShowOnHover?: boolean;
      nodeLabelMinDegree?: number;
      nodeLabelMinScale?: number;
    }>;
  };
}

interface UsageCardsProps {
  items: UsageItem[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as any,
    },
  },
};

const UsageCards = ({ items }: UsageCardsProps) => {
  return (
    <motion.div
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      variants={container}
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
    >
      {items.map((usageItem) => (
        <motion.article
          key={usageItem.id}
          className="
            group
            relative
            overflow-hidden
            rounded-3xl
            border border-neutral-200/80
            bg-white/90
            backdrop-blur-xl
            shadow-[0_10px_40px_rgba(0,0,0,0.06)]
            transition-all
            duration-500
            hover:border-cyan-200
            hover:shadow-[0_20px_80px_rgba(6,182,212,0.18)]
          "
          variants={item}
          whileHover={{ y: -8 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* glow hover */}
          <div
            className="
              absolute inset-0 opacity-0 transition-opacity duration-500
              group-hover:opacity-100
              bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.10),transparent_55%)]
            "
          />

          {/* graph area */}
          <div
            className="
              relative
              h-56
              overflow-hidden
              border-b border-neutral-100
              bg-linear-to-br
              from-slate-50
              via-white
              to-cyan-50
            "
          >
            {/* top blur */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.12),transparent_60%)]" />

            <div className="relative z-10 h-full w-full">
              <NodeGraph
                nodes={usageItem.data.graph[0].nodes}
                links={usageItem.data.graph[0].links}
                viewGuide={usageItem.data.graph[0].viewGuide ?? false}
                colors={usageItem.data.graph[0].colors}
                width={usageItem.data.graph[0].width ?? "100%"}
                height={usageItem.data.graph[0].height ?? "100%"}
                repulsion={usageItem.data.graph[0].repulsion}
                linkDistance={usageItem.data.graph[0].linkDistance}
                className={usageItem.data.graph[0].className}
                linkColor={usageItem.data.graph[0].linkColor}
                linkWidth={usageItem.data.graph[0].linkWidth}
                linkHoverColor={usageItem.data.graph[0].linkHoverColor}
                linkHoverWidth={usageItem.data.graph[0].linkHoverWidth}
                nodeHoverColor={usageItem.data.graph[0].nodeHoverColor}
                nodeLabelColor={usageItem.data.graph[0].nodeLabelColor}
                nodeLabelHoverColor={usageItem.data.graph[0].nodeLabelHoverColor}
                nodeLabelFontSize={usageItem.data.graph[0].nodeLabelFontSize}
                nodeLabelShowOnHover={usageItem.data.graph[0].nodeLabelShowOnHover}
                nodeLabelMinDegree={usageItem.data.graph[0].nodeLabelMinDegree}
                nodeLabelMinScale={usageItem.data.graph[0].nodeLabelMinScale}
              />
            </div>

            {/* fade */}
            <div className="absolute bottom-0 left-0 h-20 w-full bg-linear-to-t from-white to-transparent"></div>
          </div>

          {/* content */}
          <div className="relative flex flex-col px-6 py-3">
            <div className="flex-1">
              <motion.h3
                className="
                  text-xl
                  font-semibold
                  tracking-tight
                  text-neutral-900
                  transition-colors
                  duration-300
                  group-hover:text-cyan-600
                "
              >
                {usageItem.data.title}
              </motion.h3>

              <p
                className="
                  mt-3
                  text-[15px]
                  leading-7
                  text-neutral-600
                  wrap-break-word
                  overflow-hidden
                  max-h-13
                "
                title={usageItem.data.description}
              >
                {usageItem.data.description}
              </p>
            </div>

            {/* button */}
            <div className="mt-6">
              <motion.a
                href={`/usage/${usageItem.data.id}`}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  text-sm
                  font-medium
                  text-transparent
                  transition-all
                  duration-300
                  group-hover:text-cyan-600
                "
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.95 }}
              >
                <MoveRight className="h-4 w-4" />
                Learn More
              </motion.a>
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
};

export default UsageCards;
