import React from 'react';
import { CupSize } from '../types';
import { Zap, Coffee, Droplet, Snowflake, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface GlassCupStackProps {
  cupSize: CupSize;
  onSelectSize: (size: CupSize) => void;
  baseBrewName: string;
  baseBrewColor: string;
  dosage: number;
  milkName: string;
  milkColor: string;
  coldFoamName: string;
  coldFoamColor: string;
  syrupName: string;
  hasCaramelDrizzle: boolean;
  iceType: 'crushed' | 'light' | 'none';
  kcal: number;
  caffeine: number;
  sweetness: number;
  tempCelsius: number;
  isVegan: boolean;
  isDairyFree: boolean;
}

export const GlassCupStack: React.FC<GlassCupStackProps> = ({
  cupSize,
  onSelectSize,
  baseBrewName,
  baseBrewColor,
  dosage,
  milkName,
  milkColor,
  coldFoamName,
  coldFoamColor,
  syrupName,
  hasCaramelDrizzle,
  iceType,
  kcal,
  caffeine,
  sweetness,
  tempCelsius,
  isVegan,
  isDairyFree,
}) => {
  const sizeMap: Record<CupSize, { oz: string; heightScale: number }> = {
    Tall: { oz: '12 fl oz', heightScale: 0.88 },
    Grande: { oz: '16 fl oz', heightScale: 1.0 },
    Venti: { oz: '24 fl oz', heightScale: 1.12 },
    Trenta: { oz: '30 fl oz', heightScale: 1.2 },
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* Top Badges */}
      <div className="flex items-center justify-between w-full px-2 mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#102419] border border-[#00df82]/30 text-[#00df82] glow-green-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00df82] animate-ping" />
          <span>CLOUD ESPRESSO RITUAL</span>
        </span>

        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#111c16] border border-[#21382b] text-[#86a293]">
          Eco-Cup Certified
        </span>
      </div>

      {/* Interactive Cup Stage with Floating Telemetry */}
      <div className="relative w-full py-4 flex items-center justify-center min-h-[380px]">
        {/* Left Telemetry Badges */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-20">
          {/* Energy */}
          <motion.div
            key={kcal}
            initial={{ scale: 0.9, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-1 text-[11px] text-[#809a8c] uppercase tracking-wider font-mono-code font-semibold">
              <Zap className="w-3 h-3 text-[#00df82]" />
              <span>Energy</span>
            </div>
            <div className="text-xl font-bold font-display text-white tracking-tight">
              {kcal} <span className="text-xs text-[#708a7c] font-normal font-sans">kcal</span>
            </div>
          </motion.div>

          {/* Caffeine */}
          <motion.div
            key={caffeine}
            initial={{ scale: 0.9, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-1 text-[11px] text-[#809a8c] uppercase tracking-wider font-mono-code font-semibold">
              <Coffee className="w-3 h-3 text-[#00df82]" />
              <span>Caffeine</span>
            </div>
            <div className="text-xl font-bold font-display text-[#00df82] tracking-tight">
              {caffeine} <span className="text-xs text-[#708a7c] font-normal font-sans">mg</span>
            </div>
          </motion.div>
        </div>

        {/* Right Telemetry Badges */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end gap-6 z-20">
          {/* Sweetness */}
          <motion.div
            key={sweetness}
            initial={{ scale: 0.9, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-end"
          >
            <div className="flex items-center gap-1 text-[11px] text-[#809a8c] uppercase tracking-wider font-mono-code font-semibold">
              <span>Sweetness</span>
              <Droplet className="w-3 h-3 text-[#00df82]" />
            </div>
            <div className="text-xl font-bold font-display text-white tracking-tight">
              {sweetness}%
            </div>
          </motion.div>

          {/* Chill */}
          <motion.div
            key={tempCelsius}
            initial={{ scale: 0.9, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-end"
          >
            <div className="flex items-center gap-1 text-[11px] text-[#809a8c] uppercase tracking-wider font-mono-code font-semibold">
              <span>Chill</span>
              <Snowflake className="w-3 h-3 text-[#49c5b6]" />
            </div>
            <div className="text-xl font-bold font-display text-[#49c5b6] tracking-tight">
              {tempCelsius}°C
            </div>
          </motion.div>
        </div>

        {/* The Sensory Glass Cup Container */}
        <div className="relative flex flex-col items-center">
          {/* Glowing Green Straw */}
          <div className="relative z-30 mb-[-12px]">
            <div className="w-3.5 h-20 rounded-t-full bg-gradient-to-r from-[#00df82] via-[#5effaa] to-[#00bc6e] shadow-[0_0_20px_#00df82] border border-[#a2ffd0]/50" />
            <div className="absolute inset-0 bg-[#00df82] blur-md opacity-75" />
          </div>

          {/* Glass Vessel */}
          <div
            style={{
              transform: `scale(${sizeMap[cupSize].heightScale})`,
              transformOrigin: 'bottom center',
              transition: 'transform 0.3s ease',
            }}
            className="relative w-48 h-64 rounded-b-[40px] rounded-t-[14px] p-1.5 border-2 border-white/20 bg-gradient-to-b from-white/10 via-transparent to-white/5 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.1)] overflow-hidden"
          >
            {/* Glass Rim highlight */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-white/40 to-transparent z-20 pointer-events-none" />

            {/* Vertical glass specular shine */}
            <div className="absolute left-2 top-2 bottom-4 w-2 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-full z-20 pointer-events-none" />
            <div className="absolute right-2 top-2 bottom-4 w-1 bg-gradient-to-b from-white/20 via-transparent to-white/5 rounded-full z-20 pointer-events-none" />

            {/* Caramel Crosshatch Drizzle Overlay */}
            {hasCaramelDrizzle && (
              <svg className="absolute inset-0 w-full h-full z-15 pointer-events-none opacity-85">
                <pattern id="crosshatch" width="24" height="24" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="24" stroke="#c0782a" strokeWidth="2.5" strokeOpacity="0.85" />
                  <line x1="0" y1="0" x2="24" y2="0" stroke="#7a4212" strokeWidth="2.5" strokeOpacity="0.85" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#crosshatch)" />
              </svg>
            )}

            {/* Ice Cubes inside */}
            {iceType !== 'none' && (
              <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden flex flex-wrap justify-around items-center p-4 opacity-40">
                {Array.from({ length: iceType === 'crushed' ? 12 : 5 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`rounded ${
                      iceType === 'crushed'
                        ? 'w-3 h-3 bg-white/40 border border-white/60 blur-[0.5px]'
                        : 'w-7 h-7 bg-white/30 border border-white/50 backdrop-blur-sm'
                    } rotate-${(idx * 35) % 90}`}
                  />
                ))}
              </div>
            )}

            {/* Layer 1: Cold Foam (Top ~28%) */}
            <div
              style={{ backgroundColor: coldFoamColor }}
              className="relative w-full h-[28%] rounded-t-[10px] flex items-center justify-center border-b border-black/10 shadow-[inset_0_-4px_8px_rgba(0,0,0,0.15)] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/10" />
              {/* Foam bubbles effect */}
              <div className="absolute top-1 left-3 w-2 h-2 rounded-full bg-white/40" />
              <div className="absolute top-3 right-4 w-3 h-3 rounded-full bg-white/30" />
              <span className="relative z-10 text-[10px] font-extrabold uppercase tracking-wider text-black/75 px-1 text-center font-display drop-shadow-sm">
                {coldFoamName}
              </span>
            </div>

            {/* Layer 2: Foundation Brew (Middle ~36%) */}
            <div
              style={{ backgroundColor: baseBrewColor }}
              className="relative w-full h-[36%] flex items-center justify-center border-b border-black/10 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
              <div className="relative z-10 flex flex-col items-center justify-center text-center px-1">
                <div className="w-6 h-6 rounded-full bg-black/30 flex items-center justify-center mb-0.5 border border-white/10">
                  <Coffee className="w-3.5 h-3.5 text-white/90" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-white px-1 font-display drop-shadow">
                  {baseBrewName} ({dosage}X)
                </span>
              </div>
            </div>

            {/* Layer 3: Milk & Syrup Matrix (Bottom ~36%) */}
            <div
              style={{ backgroundColor: milkColor }}
              className="relative w-full h-[36%] rounded-b-[36px] flex items-center justify-center transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />
              <div className="relative z-10 text-center px-1">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-black/80 font-display drop-shadow-sm">
                  {milkName} {syrupName ? `+ ${syrupName}` : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cup Geometry Selector */}
      <div className="w-full bg-[#0d1612] p-3 rounded-xl border border-[#1b2b22] mt-4">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-[#8ba295] font-medium">Cup Geometry</span>
          <span className="text-[#00df82] font-semibold font-mono-code">
            {cupSize} ({sizeMap[cupSize].oz})
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {(['Tall', 'Grande', 'Venti', 'Trenta'] as CupSize[]).map((sz) => (
            <button
              key={sz}
              onClick={() => onSelectSize(sz)}
              className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                cupSize === sz
                  ? 'bg-[#182a20] text-[#00df82] border border-[#00df82]/50 shadow-[0_0_10px_rgba(0,223,130,0.2)]'
                  : 'bg-[#111c16] text-[#7d978a] hover:text-white border border-[#203429]'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Safety & Profile Verification */}
      <div className="w-full mt-4">
        <div className="text-[11px] font-bold text-[#627e71] uppercase tracking-wider mb-2 font-mono-code">
          Safety & Profile Verification
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium transition-colors ${
              isVegan
                ? 'bg-[#102419] border-[#00df82]/40 text-[#00df82]'
                : 'bg-[#161d19] border-[#25332c] text-[#71877c]'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            100% Vegan
          </span>

          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium transition-colors ${
              isDairyFree
                ? 'bg-[#102419] border-[#00df82]/40 text-[#00df82]'
                : 'bg-[#161d19] border-[#25332c] text-[#71877c]'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            Dairy-Free Certified
          </span>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#00df82]/40 bg-[#102419] text-[#00df82] text-[11px] font-medium">
            <CheckCircle2 className="w-3 h-3" />
            Gluten-Free
          </span>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#00df82]/40 bg-[#102419] text-[#00df82] text-[11px] font-medium">
            <CheckCircle2 className="w-3 h-3" />
            Low GI Base
          </span>
        </div>
      </div>
    </div>
  );
};
