import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Zap,
  Ticket,
  Clock,
  ShieldCheck,
  Check,
  Lock,
  Gift,
  ArrowRight,
  Radio,
  Bell,
  RefreshCw,
  Plus,
  CreditCard,
  Flame,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface ExclusiveDropsViewProps {
  onOpenRaffle: () => void;
  onAddToCart: (item: CartItem) => void;
  onShowToast: (msg: string) => void;
  stars: number;
  onUpdateStars: (newStars: number) => void;
}

export const ExclusiveDropsView: React.FC<ExclusiveDropsViewProps> = ({
  onOpenRaffle,
  onAddToCart,
  onShowToast,
  stars,
  onUpdateStars,
}) => {
  // Live countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 41,
  });

  const [quest2Completed, setQuest2Completed] = useState(false);
  const [quest3Started, setQuest3Started] = useState(false);
  const [restockNotified, setRestockNotified] = useState(false);
  const [reminderSet, setReminderSet] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTopUp = () => {
    confetti({ particleCount: 40, spread: 50 });
    onShowToast('Added $20 to your Apple Pay Pulse Pass. Auto-reload ready.');
  };

  const handleRedeemPerk = (name: string, cost: number) => {
    if (stars < cost) {
      onShowToast(`Need ${cost - stars} more Stars to redeem ${name}!`);
      return;
    }
    onUpdateStars(stars - cost);
    confetti({
      particleCount: 60,
      spread: 70,
      colors: ['#00df82', '#ffd700', '#ffffff'],
    });
    onShowToast(`🎉 Redeemed "${name}" for ${cost} Stars! Voucher in your digital wallet.`);
  };

  const handleClaimHoodie = () => {
    onAddToCart({
      id: `hoodie-${Date.now()}`,
      name: 'Barista Apron Oversized Hoodie (L)',
      subtitle: '500 GSM Heavyweight Brushed Fleece • Utility Pouch',
      price: 120.0,
      stars: 300,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&auto=format&fit=crop&q=80',
    });
    confetti({ particleCount: 50, spread: 60 });
    onShowToast('Claimed Pulse Size Large! Added Hoodie to Bag (+300 Bonus Stars).');
  };

  const handleOrderPourOver = () => {
    onAddToCart({
      id: `pourover-${Date.now()}`,
      name: 'Ceramic Pour-Over Kinetic Set',
      subtitle: 'Precision 60-degree flow ridges • Borosilicate Decanter',
      price: 88.0,
      stars: 200,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80',
    });
    onShowToast('Ceramic Pour-Over Kinetic Set added to Bag for Cafe delivery!');
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-8 py-5 pb-28">
      {/* Sub-bar Vault broadcast */}
      <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-[#0c1611] border border-[#1b2c22] mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00df82] animate-ping" />
          <span className="font-mono-code font-bold text-[#00df82] text-[11px] tracking-wide">
            GLOBAL VAULT LIVE • 4,819 Members in Waiting Room
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono-code text-[11px] text-[#00df82]">
          <span>RAFFLE PRIORITY:</span>
          <span className="font-bold bg-[#14261c] px-2 py-0.5 rounded border border-[#00df82]/30">
            x3 Gold Pulse Boost
          </span>
        </div>
      </div>

      {/* Hero Collab Drop: FRAGMENT ⚡ x GHIBLI */}
      <div className="relative rounded-3xl overflow-hidden border border-[#21382b] bg-gradient-to-r from-[#0d1612] via-[#09110d] to-[#0f1d16] p-6 lg:p-10 mb-12 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Content */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-extrabold font-mono-code bg-[#142d1f] text-[#00df82] border border-[#00df82]/40">
                PULSE COLLAB 09
              </span>
              <span className="text-xs font-mono-code uppercase tracking-wider text-[#7e998b]">
                1,500 Units Worldwide
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight uppercase">
              FRAGMENT <span className="text-[#00df82]">⚡</span> x GHIBLI
            </h1>

            <p className="text-sm lg:text-base text-[#a0b8aa] max-w-xl mt-3 leading-relaxed">
              Ultrablack matte titanium 20oz tumbler featuring dual lightning insignias and laser-etched Totoro forest canopy micro-textures. Designed by Hiroshi Fujiwara.
            </p>

            {/* Countdown Clock */}
            <div className="mt-6 mb-6">
              <div className="text-[10px] font-mono-code uppercase tracking-wider text-[#708c7c] mb-2 font-bold">
                GLOBAL DROP WINDOW OPENS IN
              </div>
              <div className="flex items-center gap-2">
                <div className="p-3 rounded-xl bg-[#0a120e] border border-[#1d2d24] text-center min-w-[56px]">
                  <span className="text-2xl font-extrabold font-display text-white">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <div className="text-[9px] font-mono-code text-[#708c7c]">DAYS</div>
                </div>
                <span className="text-xl font-bold text-[#324b3c]">:</span>
                <div className="p-3 rounded-xl bg-[#0a120e] border border-[#1d2d24] text-center min-w-[56px]">
                  <span className="text-2xl font-extrabold font-display text-white">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <div className="text-[9px] font-mono-code text-[#708c7c]">HRS</div>
                </div>
                <span className="text-xl font-bold text-[#324b3c]">:</span>
                <div className="p-3 rounded-xl bg-[#0a120e] border border-[#1d2d24] text-center min-w-[56px]">
                  <span className="text-2xl font-extrabold font-display text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <div className="text-[9px] font-mono-code text-[#708c7c]">MIN</div>
                </div>
                <span className="text-xl font-bold text-[#324b3c]">:</span>
                <div className="p-3 rounded-xl bg-[#0a120e] border border-[#1d2d24] text-center min-w-[56px]">
                  <span className="text-2xl font-extrabold font-display text-[#00df82]">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <div className="text-[9px] font-mono-code text-[#708c7c]">SEC</div>
                </div>
              </div>
            </div>

            {/* Verification badge */}
            <div className="flex items-center gap-2 text-xs font-mono-code text-[#00df82] mb-6">
              <ShieldCheck className="w-4 h-4 text-[#00df82]" />
              <span>Pulse Pass Verified: Tier-4 Guaranteed Draw Entry</span>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenRaffle}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#00df82] hover:bg-[#00c774] text-black font-extrabold text-sm transition-all shadow-[0_0_20px_rgba(0,223,130,0.4)] active:scale-95 cursor-pointer"
              >
                <Ticket className="w-4 h-4" />
                <span>Enter Pulse Raffle</span>
              </button>
              <button
                onClick={() => onShowToast('Invite link generated! Send to crew for +1 bonus entry ticket.')}
                className="px-5 py-3.5 rounded-full bg-[#132219] hover:bg-[#1a2e23] border border-[#233a2d] text-white font-semibold text-sm transition-all"
              >
                Invite Crew (+1 Ticket)
              </button>
              <span className="text-xs text-[#829c8e] font-mono-code">
                MSRP $68.00 • Free Reserve Beans included
              </span>
            </div>
          </div>

          {/* Product Tumbler Graphic */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-72 h-80 flex items-center justify-center">
              {/* Radial glow */}
              <div className="absolute inset-0 bg-[#00df82]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Matte Titanium Tumbler representation */}
              <div className="relative z-10 w-44 h-72 rounded-b-[28px] rounded-t-[16px] bg-gradient-to-r from-[#18181b] via-[#27272a] to-[#09090b] border-2 border-[#3f3f46] shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_2px_10px_rgba(255,255,255,0.2)] p-4 flex flex-col items-center justify-between">
                {/* Tumbler Cap */}
                <div className="w-full h-4 rounded-full bg-[#111113] border-b border-[#3f3f46]" />

                {/* Laser-etched Lightning Bolt & Ghibli Crest */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full border border-[#00df82]/60 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(0,223,130,0.3)]">
                    <Zap className="w-6 h-6 text-[#00df82]" />
                  </div>
                  <span className="text-[10px] font-mono-code text-white/90 uppercase tracking-widest font-extrabold">
                    FRAGMENT ⚡
                  </span>
                  <span className="text-[8px] font-mono-code text-[#71717a] uppercase tracking-widest mt-0.5">
                    GHIBLI FOREST CANOPY
                  </span>
                </div>

                {/* Bottom Base */}
                <div className="w-3/4 h-2 rounded-full bg-[#111113]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Archival Vault & Live Drops */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#00df82]">
              ARCHIVAL VAULT & LIVE DROPS
            </div>
            <h2 className="text-2xl font-bold font-display text-white">Vault Radar</h2>
          </div>
          <span className="text-xs text-[#7e998b] font-mono-code">Updated 12m ago</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Item 1 */}
          <div className="glass-panel p-5 rounded-2xl border border-[#1e2f25] flex flex-col justify-between">
            <div>
              <div className="relative h-48 rounded-xl overflow-hidden mb-3 border border-[#1d2d24]">
                <img
                  src="https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=500&auto=format&fit=crop&q=80"
                  alt="Holographic Cold Cup"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-red-500/80 backdrop-blur-md text-[10px] font-mono-code text-white font-bold">
                  SOLD OUT IN 4M
                </span>
                <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono-code text-white">
                  24oz Cold Cup
                </span>
              </div>
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white font-display">Holographic Cold Cup</h4>
                <span className="text-base font-bold text-white font-mono-code">$34</span>
              </div>
              <p className="text-xs text-[#7e998b] mt-1 leading-relaxed">
                Prismatic refraction coating with cold-activated iridescent green siren crest.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1d2d24] flex items-center justify-between">
              <span className="text-xs font-mono-code text-[#00df82]">Resale Value $115</span>
              <button
                onClick={() => {
                  setRestockNotified(true);
                  onShowToast('Restock alert enabled for Holographic Cold Cup');
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  restockNotified
                    ? 'bg-[#102419] border-[#00df82] text-[#00df82]'
                    : 'bg-[#121c17] hover:bg-[#1a2921] border-[#22352a] text-white'
                }`}
              >
                {restockNotified ? 'Alert Active ✓' : 'Notify Restock'}
              </button>
            </div>
          </div>

          {/* Item 2 */}
          <div className="glass-panel p-5 rounded-2xl border border-[#1e2f25] flex flex-col justify-between">
            <div>
              <div className="relative h-48 rounded-xl overflow-hidden mb-3 border border-[#1d2d24]">
                <img
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=80"
                  alt="Barista Apron Oversized Hoodie"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#102419] border border-[#00df82]/40 text-[10px] font-mono-code text-[#00df82] font-bold">
                  PULSE DROP 08
                </span>
                <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono-code text-[#00df82]">
                  184 Units Left
                </span>
              </div>
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white font-display">Barista Apron Oversized Hoodie</h4>
                <span className="text-base font-bold text-white font-mono-code">$120</span>
              </div>
              <p className="text-xs text-[#7e998b] mt-1 leading-relaxed">
                500 GSM heavyweight brushed fleece with utility pouch loops and tonal rubberized branding.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1d2d24] flex items-center justify-between">
              <span className="text-xs font-mono-code text-[#00df82]">Instant 300 Stars Bonus</span>
              <button
                onClick={handleClaimHoodie}
                className="px-3.5 py-1.5 rounded-full bg-[#00df82] hover:bg-[#00c774] text-black font-bold text-xs transition-all shadow-[0_0_10px_rgba(0,223,130,0.3)]"
              >
                Claim Pulse Size
              </button>
            </div>
          </div>

          {/* Item 3 */}
          <div className="glass-panel p-5 rounded-2xl border border-[#1e2f25] flex flex-col justify-between">
            <div>
              <div className="relative h-48 rounded-xl overflow-hidden mb-3 border border-[#1d2d24]">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80"
                  alt="Ceramic Pour-Over Kinetic Set"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#102419] border border-[#00df82]/40 text-[10px] font-mono-code text-[#00df82] font-bold">
                  RESERVE LAB EDITION
                </span>
                <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono-code text-white">
                  Limited 500
                </span>
              </div>
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white font-display">Ceramic Pour-Over Kinetic Set</h4>
                <span className="text-base font-bold text-white font-mono-code">$88</span>
              </div>
              <p className="text-xs text-[#7e998b] mt-1 leading-relaxed">
                Precision 60-degree helical interior flow ridges with hand-blown borosilicate decanter.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1d2d24] flex items-center justify-between">
              <span className="text-xs font-mono-code text-[#8ca497]">Includes Colombia Geisha</span>
              <button
                onClick={handleOrderPourOver}
                className="px-3 py-1.5 rounded-full bg-[#121c17] hover:bg-[#1a2921] border border-[#22352a] text-white font-semibold text-xs transition-colors"
              >
                Order to Cafe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Pulse Credential */}
      <div className="glass-panel p-6 lg:p-8 rounded-3xl border border-[#1f3328] mb-12">
        <div className="mb-6">
          <div className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#00df82] mb-1">
            VIP PASS & STAR ENGINE
          </div>
          <h2 className="text-2xl font-bold font-display text-white">Digital Pulse Credential</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Digital Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl p-6 bg-gradient-to-br from-[#12261b] via-[#0d1c14] to-[#08120d] border border-[#00df82]/50 shadow-[0_0_30px_rgba(0,223,130,0.2)] overflow-hidden">
              {/* Card top banner */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-mono-code font-bold text-[#00df82] flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" />
                  NFC Quick-Pay Tap Ready
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#00df82] text-black text-[10px] font-extrabold font-mono-code">
                  VIP TIER • LEVEL 4
                </span>
              </div>

              {/* Balance */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#00df82] text-black flex items-center justify-center font-bold text-xs">
                      ★
                    </div>
                    <span className="text-sm font-bold text-white">Gold Pulse VIP</span>
                  </div>
                  <div className="text-xs font-mono-code text-[#738e80] mt-0.5">
                    Verified Member #8942-X
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] uppercase font-mono-code text-[#708c7c]">CURRENT BALANCE</div>
                  <div className="text-3xl font-black font-display text-[#00df82]">
                    {stars} <span className="text-lg">★</span>
                  </div>
                </div>
              </div>

              {/* Card Number & Barcode */}
              <div className="flex items-center justify-between mb-6">
                <div className="font-mono-code text-sm tracking-widest text-[#8ba295]">
                  5420 •••• •••• 9921
                </div>
                {/* Visual Barcode bars */}
                <div className="flex items-end gap-1 h-6 px-2 bg-white/10 rounded">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span
                      key={i}
                      style={{ height: `${(i * 7) % 18 + 6}px` }}
                      className="w-1 bg-[#00df82] rounded-xs"
                    />
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[#1d3326]">
                <div>
                  <div className="text-[9px] uppercase font-mono-code text-[#708c7c]">Holder Name</div>
                  <div className="text-xs font-bold text-white font-mono-code">ALEXANDER CHEN</div>
                </div>
                <div className="text-[10px] font-mono-code text-[#00df82] font-semibold">
                  TAP CARD TO SCAN ((-))
                </div>
              </div>
            </div>

            {/* Actions below card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 text-xs">
              <span className="text-[#7e998b] font-mono-code text-[11px]">
                Auto-reloads from Apple Pay • $25 when &lt; $5
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onShowToast('NFC Dynamic Barcode refreshed')}
                  className="px-3 py-1.5 rounded-full bg-[#111c16] hover:bg-[#1a2921] border border-[#20362b] text-white font-medium flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3 text-[#00df82]" />
                  <span>Refresh Code</span>
                </button>
                <button
                  onClick={handleTopUp}
                  className="px-3.5 py-1.5 rounded-full bg-[#00df82] hover:bg-[#00c774] text-black font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(0,223,130,0.3)]"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Top Up $20</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Stats: Unlock & Sip Streak (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Next level unlock */}
            <div className="p-4 rounded-2xl bg-[#0c1611] border border-[#1b2b21] flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-[#708c7c]">
                  NEXT LEVEL UNLOCK
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-bold font-display text-white">{stars}</span>
                  <span className="text-xs text-[#708c7c]">/ 500 ★</span>
                </div>
                <div className="text-xs text-[#00df82] font-medium mt-1">
                  Unlocks: 15% Collab Merch Discount &gt;
                </div>
              </div>

              {/* Circular progress badge */}
              <div className="relative w-14 h-14 rounded-full border-4 border-[#1b2f23] flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-[#00df82] border-t-transparent -rotate-45" />
                <span className="text-xs font-bold font-mono-code text-white">96%</span>
              </div>
            </div>

            {/* 5-Day Sip Streak */}
            <div className="p-4 rounded-2xl bg-[#0c1611] border border-[#1b2b21]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#00df82]" />
                  <span className="text-xs font-bold text-white font-display">5-Day Sip Streak</span>
                </div>
                <span className="text-[10px] font-mono-code font-bold text-[#00df82]">+50 Bonus Stars</span>
              </div>
              <p className="text-[11px] text-[#7e998b] leading-normal mb-3">
                Keep your morning ritual rolling. Sip once more before Sunday midnight to trigger the Double Star Weekend multiplier.
              </p>

              <div className="grid grid-cols-7 gap-1.5 text-center">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Today', 'Sat', 'Sun'].map((day, idx) => {
                  const isDone = idx < 5;
                  return (
                    <div
                      key={day}
                      className={`p-1.5 rounded-lg border flex flex-col items-center gap-1 ${
                        isDone
                          ? 'bg-[#12241a] border-[#00df82]/40 text-[#00df82]'
                          : 'bg-[#09100c] border-[#18261e] text-[#556e60]'
                      }`}
                    >
                      <span className="text-[9px] font-mono-code">{day}</span>
                      {isDone ? (
                        <Check className="w-3 h-3 stroke-[3]" />
                      ) : (
                        <Lock className="w-2.5 h-2.5" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pulse Quests & Unlocks */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#00df82]">
              SECRET RECIPES & MISSION TERMINAL
            </div>
            <h2 className="text-2xl font-bold font-display text-white">Pulse Quests & Unlocks</h2>
          </div>
          <span className="text-xs text-[#7e998b] font-mono-code">Active Season: Cyber Bloom Cycle #03</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Weekly Expeditions & Mastery Badges (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Weekly Expeditions */}
            <div className="glass-panel p-5 rounded-2xl border border-[#1e2f25]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white font-display">Weekly Star Expeditions</h3>
                <span className="text-[10px] font-mono-code text-[#708c7c]">Resets in 2d 09h</span>
              </div>

              <div className="space-y-3">
                {/* Quest 1 */}
                <div className="p-3 rounded-xl bg-[#0c1611] border border-[#1b2a21] flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#00df82] text-black flex items-center justify-center font-bold">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        Try an Oat Milk Nitro Cold Brew <span className="text-[#00df82] font-mono-code">+25 Stars</span>
                      </h4>
                      <p className="text-[11px] text-[#7e998b]">Ordered at Shibuya Scramble Reserve bar</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono-code text-[#708c7c] px-2.5 py-1 rounded bg-[#131f18]">
                    Claimed
                  </span>
                </div>

                {/* Quest 2 */}
                <div className="p-3 rounded-xl bg-[#0c1611] border border-[#1b2a21] flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#12241a] border border-[#00df82]/40 text-[#00df82] flex items-center justify-center font-bold text-xs">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        Order before 9:00 AM 3 times this week{' '}
                        <span className="text-[#00df82] font-mono-code">+50 Stars</span>
                      </h4>
                      <p className="text-[11px] text-[#7e998b]">2 of 3 orders completed • 1 remaining</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono-code text-[#00df82] px-2.5 py-1 rounded bg-[#102419] border border-[#00df82]/30 font-bold">
                    2 / 3
                  </span>
                </div>

                {/* Quest 3 */}
                <div className="p-3 rounded-xl bg-[#0c1611] border border-[#1b2a21] flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#12241a] border border-[#00df82]/40 text-[#00df82] flex items-center justify-center font-bold text-xs">
                      <Gift className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        Gift a drink to a friend via Pulse Chat{' '}
                        <span className="text-[#00df82] font-mono-code">+30 Stars</span>
                      </h4>
                      <p className="text-[11px] text-[#7e998b]">Send instant e-drink voucher to mutual friend</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setQuest3Started(true);
                      onShowToast('Pulse Friend Gifting voucher link copied!');
                    }}
                    className="text-[11px] font-bold text-black px-3 py-1 rounded-full bg-[#00df82] hover:bg-[#00c774] transition-all"
                  >
                    {quest3Started ? 'Sent ✓' : 'Start Quest'}
                  </button>
                </div>
              </div>
            </div>

            {/* Mastery Badges */}
            <div className="glass-panel p-5 rounded-2xl border border-[#1e2f25]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-bold text-white font-display">Mastery Badges</h3>
                  <p className="text-xs text-[#7e998b]">Collected 7 of 12 Pulse Accolades</p>
                </div>
                <button
                  onClick={() => onShowToast('Showing all 12 Badges in Pulse Trophy Room')}
                  className="text-xs text-[#00df82] hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-[#0c1611] border border-[#1d2d24] flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-[#122419] border border-[#00df82]/40 flex items-center justify-center text-[#00df82] mb-2">
                    ☕
                  </div>
                  <span className="text-xs font-bold text-white">Caffeine Connoisseur</span>
                  <span className="text-[10px] font-mono-code text-[#708c7c] mt-0.5">Tier III • 120 Shots</span>
                </div>

                <div className="p-3 rounded-xl bg-[#0c1611] border border-[#1d2d24] flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-[#122419] border border-[#00df82]/40 flex items-center justify-center text-[#00df82] mb-2">
                    🍵
                  </div>
                  <span className="text-xs font-bold text-white">Matcha Master</span>
                  <span className="text-[10px] font-mono-code text-[#708c7c] mt-0.5">Uji Grade Collector</span>
                </div>

                <div className="p-3 rounded-xl bg-[#0c1611] border border-[#1d2d24] flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-[#122419] border border-[#00df82]/40 flex items-center justify-center text-[#00df82] mb-2">
                    🌿
                  </div>
                  <span className="text-xs font-bold text-white">Eco-Champion</span>
                  <span className="text-[10px] font-mono-code text-[#708c7c] mt-0.5">14kg CO2 Neutral</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Star Redemption Deck (5 cols) */}
          <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-[#1e2f25] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white font-display">Star Redemption Deck</h3>
                <span className="text-[10px] font-mono-code text-[#708c7c]">Tap to Burn Stars</span>
              </div>

              <div className="space-y-3">
                {/* Reward 1 */}
                <div
                  onClick={() => handleRedeemPerk('Emerald Sea Foam Iced Latte', 150)}
                  className="p-3 rounded-xl bg-[#0c1611] border border-[#1b2b21] hover:border-[#00df82]/50 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=100&auto=format&fit=crop&q=80"
                      alt="Emerald Sea Foam"
                      className="w-11 h-11 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">Emerald Sea Foam Iced Latte</h4>
                      <p className="text-[10px] text-[#7e998b]">Secret bar recipe: Blonde ristretto with sea-salt...</p>
                      <span className="text-[9px] font-mono-code text-[#00df82]">Secret Menu Unlock</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono-code text-[#00df82] px-2 py-1 rounded bg-[#102419]">
                    150 ★
                  </span>
                </div>

                {/* Reward 2 */}
                <div
                  onClick={() => handleRedeemPerk('Smoked Vanilla Cold Foam Flight', 200)}
                  className="p-3 rounded-xl bg-[#0c1611] border border-[#1b2b21] hover:border-[#00df82]/50 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=100&auto=format&fit=crop&q=80"
                      alt="Smoked Vanilla Cold Foam"
                      className="w-11 h-11 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">Smoked Vanilla Cold Foam Flight</h4>
                      <p className="text-[10px] text-[#7e998b]">Small-batch 20-hour nitro extraction with Bourbon...</p>
                      <span className="text-[9px] font-mono-code text-[#00df82]">Reserve Lounge Exclusive</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono-code text-[#00df82] px-2 py-1 rounded bg-[#102419]">
                    200 ★
                  </span>
                </div>

                {/* Reward 3 */}
                <div
                  onClick={() => handleRedeemPerk('Pulse Canvas Heavy Utility Tote', 400)}
                  className="p-3 rounded-xl bg-[#0c1611] border border-[#1b2b21] hover:border-[#00df82]/50 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=100&auto=format&fit=crop&q=80"
                      alt="Pulse Canvas Tote"
                      className="w-11 h-11 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">Pulse Canvas Heavy Utility Tote</h4>
                      <p className="text-[10px] text-[#7e998b]">16oz organic waxed duck canvas with modular laptop...</p>
                      <span className="text-[9px] font-mono-code text-[#00df82]">Vault Stock Ready</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono-code text-[#00df82] px-2 py-1 rounded bg-[#102419]">
                    400 ★
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom star pool status */}
            <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-[#102419] to-[#0c1813] border border-[#00df82]/30 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono-code text-[#708c7c] uppercase">Available Star Pool</div>
                <div className="text-xs font-bold text-white">
                  {stars} Stars = 3 Drink Perks or 1 Merch Drop
                </div>
              </div>
              <button
                onClick={() => handleRedeemPerk('Emerald Sea Foam Iced Latte', 150)}
                className="px-3.5 py-1.5 rounded-full bg-[#00df82] hover:bg-[#00c774] text-black font-extrabold text-xs transition-all"
              >
                Redeem Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Reserve Store Access */}
      <div className="glass-panel p-6 rounded-3xl border border-[#1f3328]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#00df82]">
              GLOBAL DROP RADAR
            </div>
            <h2 className="text-xl font-bold font-display text-white">Live Reserve Store Access</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8ca497] font-mono-code">Tokyo (Reserve Roastery Nakameguro)</span>
            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#102419] text-[#00df82] border border-[#00df82]/30">
              Active Queue: 18m
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Map Image representation of Tokyo Roastery Nakameguro */}
          <div className="lg:col-span-8 relative h-48 rounded-2xl overflow-hidden border border-[#1d2d24]">
            <div
              className="absolute inset-0 bg-cover bg-center filter brightness-90 contrast-110"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1000&auto=format&fit=crop&q=80)',
              }}
            />
            <div className="absolute inset-0 bg-[#08150f]/50" />
            <div className="absolute bottom-3 left-3">
              <span className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#00df82] text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00df82] animate-ping" />
                <span>Raffle physical collection enabled at Roastery Nakameguro Pick-up counter</span>
              </span>
            </div>
          </div>

          {/* Soundscape & In-store drop note */}
          <div className="lg:col-span-4 flex flex-col justify-between h-48 p-4 rounded-2xl bg-[#0c1611] border border-[#1b2b21]">
            <div>
              <div className="text-[9px] uppercase font-mono-code text-[#708c7c]">STORE SOUNDSCAPE</div>
              <h4 className="text-sm font-bold text-white font-display mt-0.5">Shibuya Midnight Lo-Fi</h4>
              <p className="text-[11px] text-[#7e998b] mt-1 leading-normal">
                Live streaming bar playlist curated by Barista Kaito (Pulse Tokyo)
              </p>
              <div className="text-[10px] font-mono-code text-[#00df82] mt-1 flex items-center gap-1">
                <Radio className="w-3 h-3 text-[#00df82]" />
                <span>12,408 listeners tuning in</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1d2d24] flex items-center justify-between">
              <div>
                <div className="text-[9px] uppercase font-mono-code text-[#708c7c]">Next In-Store Drop</div>
                <div className="text-xs font-bold text-white">Saturday 08:00 AM JST</div>
              </div>
              <button
                onClick={() => {
                  setReminderSet(true);
                  onShowToast('Calendar reminder set for Saturday 08:00 AM JST drop!');
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  reminderSet
                    ? 'bg-[#102419] border-[#00df82] text-[#00df82]'
                    : 'bg-[#14231b] hover:bg-[#1a2e23] border-[#22362b] text-white'
                }`}
              >
                {reminderSet ? 'Reminder Set ✓' : 'Set Reminder'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
