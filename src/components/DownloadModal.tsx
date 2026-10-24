import React from 'react';
import { X, Download, Archive, Terminal, CheckCircle2, FileCode2, Sparkles, FolderArchive } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00df82', '#ffffff', '#ffd700'],
    });

    const link = document.createElement('a');
    link.href = '/starbucks-pulse-source.zip';
    link.download = 'starbucks-pulse-source.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onShowToast('Downloading starbucks-pulse-source.zip...');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0c1611] border border-[#23382c] p-6 lg:p-8 text-white shadow-[0_0_50px_rgba(0,223,130,0.25)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#111c16] hover:bg-[#1a2b22] text-[#708c7c] hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold bg-[#142d1f] text-[#00df82] border border-[#00df82]/30 flex items-center gap-1">
            <Archive className="w-3 h-3" />
            OFFLINE EXPORT READY
          </span>
          <span className="text-xs font-mono-code text-[#708c7c]">v3.4 Production Bundle</span>
        </div>

        <h3 className="text-2xl font-black font-display tracking-tight text-white uppercase flex items-center gap-2">
          <span>Download Source Code</span>
          <span className="text-[#00df82]">(.ZIP)</span>
        </h3>

        <p className="text-xs text-[#8ca497] mt-1.5 leading-relaxed">
          Grab the full, pristine codebase containing all 4 screens, custom components, SVG sensory fluid modeling, Web Audio synth, and Tailwind styles.
        </p>

        {/* Package Specs */}
        <div className="mt-5 p-4 rounded-2xl bg-[#08110c] border border-[#1b2b21] space-y-2.5 text-xs">
          <div className="flex items-center justify-between text-white">
            <span className="flex items-center gap-2 text-[#a5c0b1]">
              <FolderArchive className="w-4 h-4 text-[#00df82]" />
              Archive Filename
            </span>
            <span className="font-mono-code font-bold text-white">starbucks-pulse-source.zip</span>
          </div>

          <div className="flex items-center justify-between text-white">
            <span className="flex items-center gap-2 text-[#a5c0b1]">
              <FileCode2 className="w-4 h-4 text-[#00df82]" />
              Stack & Framework
            </span>
            <span className="font-mono-code text-[#00df82]">React 19 • Vite • Tailwind v4 • TS</span>
          </div>

          <div className="flex items-center justify-between text-white">
            <span className="flex items-center gap-2 text-[#a5c0b1]">
              <CheckCircle2 className="w-4 h-4 text-[#00df82]" />
              All 4 Screens Included
            </span>
            <span className="text-white font-medium">Lab, Feed, Tracker & Drops</span>
          </div>
        </div>

        {/* How to run instructions */}
        <div className="mt-4 p-4 rounded-2xl bg-[#08110c] border border-[#1b2b21]">
          <div className="flex items-center gap-2 text-xs font-bold text-white font-display mb-2">
            <Terminal className="w-3.5 h-3.5 text-[#00df82]" />
            <span>Quick Start Instructions</span>
          </div>
          <pre className="p-3 rounded-xl bg-[#050a07] font-mono-code text-[11px] text-[#71e4a5] border border-[#122319] overflow-x-auto select-all">
{`unzip starbucks-pulse-source.zip
cd starbucks-pulse-source
npm install
npm run dev`}
          </pre>
        </div>

        {/* Big Action Download Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleDownload}
            className="w-full sm:flex-1 py-3.5 rounded-xl bg-[#00df82] hover:bg-[#00c774] text-black font-extrabold text-sm transition-all shadow-[0_0_20px_rgba(0,223,130,0.4)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Download Project ZIP</span>
          </button>

          <a
            href="/starbucks-pulse-source.zip"
            download="starbucks-pulse-source.zip"
            onClick={() => onShowToast('Direct download initiated')}
            className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-[#132219] hover:bg-[#1a2e23] border border-[#233a2d] text-white font-semibold text-xs text-center transition-all"
          >
            Direct Link
          </a>
        </div>
      </div>
    </div>
  );
};
