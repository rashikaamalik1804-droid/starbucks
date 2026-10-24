import React from 'react';
import { X, QrCode, Sparkles, CheckCircle2 } from 'lucide-react';

interface BarcodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BarcodeModal: React.FC<BarcodeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 text-black flex flex-col items-center text-center shadow-[0_0_50px_rgba(255,255,255,0.3)]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-wider uppercase text-emerald-700 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Starbucks Pulse Verified Ticket</span>
        </div>

        <h3 className="text-xl font-black font-sans tracking-tight">Express Counter Barcode</h3>
        <p className="text-xs text-neutral-500 mt-0.5 mb-6">
          Hold this screen under scanner at Pike Place Bar 2 or Shelf B-3.
        </p>

        {/* Big Crisp QR / Barcode Card */}
        <div className="p-4 rounded-2xl border-4 border-black bg-white shadow-inner mb-4 flex flex-col items-center">
          <QrCode className="w-48 h-48 text-black" />
          {/* Simulated 1D Barcode bars below */}
          <div className="flex items-end gap-1 h-10 w-full mt-3 px-2">
            {[4, 2, 5, 1, 3, 6, 2, 4, 3, 5, 2, 6, 4, 1, 3, 5, 2, 4, 6, 3, 1, 5, 2, 4].map((h, i) => (
              <span
                key={i}
                style={{ height: `${h * 6}px` }}
                className="w-1.5 bg-black rounded-xs"
              />
            ))}
          </div>
        </div>

        <div className="text-sm font-mono font-bold tracking-widest text-neutral-800">
          TICKET: SB-8921-9921
        </div>

        <div className="w-full mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-600">
          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Max Brightness Active
          </span>
          <span className="font-mono">Shelf B-3 Reserved</span>
        </div>
      </div>
    </div>
  );
};
