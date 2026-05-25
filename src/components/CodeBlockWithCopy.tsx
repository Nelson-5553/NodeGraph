import { Copy, Check } from "lucide-react";
import { useCopy } from "../hooks/useCopy";
import type { FC } from "react";

interface CodeBlockWithCopyProps {
  code: string;
  language: string;
  children: React.ReactNode;
}

const CodeBlockWithCopy: FC<CodeBlockWithCopyProps> = ({
  code,
  language,
  children,
}) => {
  const { copied, copy } = useCopy();

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-[#0d1117] group">
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-xs font-mono font-bold tracking-wider">
            {language.toUpperCase()}
          </span>
          <button
            onClick={() => void copy(code)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 flex items-center gap-2 text-gray-400 hover:text-cyan-400 text-sm font-semibold"
            title={copied ? "Copied!" : "Copy code"}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span className="text-xs">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="text-xs">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="[&>pre]:bg-transparent [&>pre]:m-0 [&>pre]:p-6 overflow-x-auto text-sm">
        {children}
      </div>
    </div>
  );
};

export default CodeBlockWithCopy;
