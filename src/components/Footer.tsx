import type { FC } from "react";
import { motion } from "framer-motion";
import NodeGraphLogo from "./NodeGraphLogo";

const Footer: FC = () => {
  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Examples", "Pricing"],
    },
    {
      title: "Docs",
      links: ["Guide", "API Reference", "Examples"],
    },
    {
      title: "Follow",
      links: ["GitHub", "Twitter", "Discord"],
    },
  ];

  return (
    <footer className="border-t border-gray-300 bg-gradient-to-b from-transparent to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
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

          {/* Footer Sections */}
          {footerLinks.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <h4 className="text-neutral-900 font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      className="text-neutral-600 hover:text-neutral-900 transition-colors"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
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
              © 2024 NodeGraph. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              {["Privacy", "Terms", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-neutral-600 hover:text-neutral-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
