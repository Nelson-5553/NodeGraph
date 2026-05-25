import type { FC } from "react";
import { motion } from "framer-motion";
import NodeGraphLogo from "./NodeGraphLogo";

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-300 bg-linear-to-b from-transparent to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-2">
              <NodeGraphLogo animated={false} className="text-3xl" />
            </div>
            <p className="text-neutral-600 text-sm">
              Interactive graph visualization for the modern web.
            </p>
          </motion.div>
        </div>

        {/* Divider */}
         <motion.div
           className="border-t border-gray-300 pt-8"
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.3 }}
         >
           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-neutral-600 text-sm">
              © {currentYear} NodeGraph. All rights reserved.
            </p>
            
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
