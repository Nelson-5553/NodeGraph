import { motion } from "framer-motion";

interface UsageItem {
  data: {
    title: string;
    description: string;
    image: string;
    alt?: string;
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
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_4px_14px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] transition-shadow duration-300"
            >
              <img
                src={card.data.image}
                alt={card.data.alt || card.data.title}
                loading="lazy"
                className="block h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="mb-2 text-[1.1rem] leading-[1.3]">
                  {card.data.title}
                </h3>
                <p className="m-0 text-[0.95rem] leading-6 text-gray-600">
                  {card.data.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
