import React, { useState } from 'react';
import { X, Ticket, Zap, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RaffleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const RaffleModal: React.FC<RaffleModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [tickets, setTickets] = useState(3);
  const [hasEntered, setHasEntered] = useState(false);

  if (!isOpen) return null;

  const handleEnter = () => {
    setHasEntered(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#00df82', '#ffffff', '#22d3ee', '#ffd700'],
    });
    onShowToast(`Entered Pulse Raffle with ${tickets}x Boost Tickets! Draw results ping on drop day.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0c1611] border border-[#23382c] p-6 lg:p-8 text-white shadow-[0_0_50px_rgba(0,223,130,0.2)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#111c16] hover:bg-[#1a2b22] text-[#708c7c] hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold bg-[#142d1f] text-[#00df82] border border-[#00df82]/30">
            PULSE COLLAB 09
          </span>
          <span className="text-xs font-mono-code text-[#708c7c]">1,500 Worldwide</span>
        </div>

        <h3 className="text-2xl font-black font-display tracking-tight text-white uppercase flex items-center gap-2">
          <span>FRAGMENT</span>
          <span className="text-[#00df82]">⚡</span>
          <span>x GHIBLI</span>
        </h3>
        <p className="text-xs text-[#8ca497] mt-1 leading-relaxed">
          Titanium 20oz Tumbler Draw Entry. Tier-4 VIP status grants guaranteed participation in the priority allocation pool.
        </p>

        {hasEntered ? (
          <div className="mt-6 p-6 rounded-2xl bg-[#091510] border border-[#00df82]/50 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#00df82] text-black flex items-center justify-center mb-3">
              <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h4 className="text-lg font-bold font-display text-white">Raffle Entry Confirmed!</h4>
            <p className="text-xs text-[#7e998b] mt-1 max-w-sm">
              Your 3x Gold Pulse entry slip is logged to Block #48192-X. You will receive an instantaneous push notification when the drop window opens.
            </p>
            <div className="mt-4 px-4 py-2 rounded-xl bg-[#11241a] border border-[#00df82]/30 font-mono-code text-xs text-[#00df82]">
              Entry Ticket ID: SB-GHIBLI-7749-AC
            </div>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-full bg-[#00df82] text-black font-bold text-xs"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="p-4 rounded-xl bg-[#08110c] border border-[#1b2b21] flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">Your Available VIP Tickets</div>
                <div className="text-[11px] text-[#708c7c]">Alexander Chen • Gold Level 4</div>
              </div>
              <div className="text-2xl font-black font-mono-code text-[#00df82]">
                {tickets} <span className="text-xs font-normal text-[#708c7c]">Tickets</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#08110c] border border-[#1b2b21] space-y-2 text-xs text-[#8ca497]">
              <div className="flex items-center gap-2 text-white">
                <ShieldCheck className="w-4 h-4 text-[#00df82]" />
                <span className="font-semibold">Tier-4 Guaranteed Draw Pool</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Sparkles className="w-4 h-4 text-[#00df82]" />
                <span className="font-semibold">Includes Colombia Geisha Whole Bean Sample</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Ticket className="w-4 h-4 text-[#00df82]" />
                <span className="font-semibold">Tokyo Roastery Nakameguro Pickup Option</span>
              </div>
            </div>

            <button
              onClick={handleEnter}
              className="w-full py-3.5 rounded-xl bg-[#00df82] hover:bg-[#00c774] text-black font-extrabold text-sm transition-all shadow-[0_0_20px_rgba(0,223,130,0.4)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>Confirm & Lock Raffle Entry</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
