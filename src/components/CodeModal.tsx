import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check } from "lucide-react";
import type { FC } from "react";
import { useCopy } from "../hooks/useCopy";

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  title?: string;
}

const CodeModal: FC<CodeModalProps> = ({ isOpen, onClose, code, title = "Code" }) => {
  const { copied, copy } = useCopy();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl bg-[#0d1117] border border-gray-800 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#161b22] border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="text-gray-400 text-sm font-mono font-bold tracking-wider">
                    {title.toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-white" />
                </button>
              </div>

              {/* Code Content */}
              <div className="flex-1 overflow-auto">
                <pre className="p-6 text-sm text-gray-100 font-mono leading-relaxed">
                  <code>{code}</code>
                </pre>
              </div>

              {/* Footer with Copy Button */}
              <div className="px-6 py-4 bg-[#161b22] border-t border-gray-800 flex justify-end gap-3">
                <button
                  onClick={() => void copy(code)}
                  className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Code
                    </>
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-neutral-200 rounded-lg text-sm font-semibold transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CodeModal;
