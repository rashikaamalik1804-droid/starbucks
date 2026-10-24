import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCw, Share2, Headphones, Leaf, Droplets } from 'lucide-react';
import { lofiAudio } from '../utils/audio';

interface BottomPlayerBarProps {
  onQuickReorder: () => void;
  onShare: () => void;
}

export const BottomPlayerBar: React.FC<BottomPlayerBarProps> = ({
  onQuickReorder,
  onShare,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [headphoneMode, setHeadphoneMode] = useState(false);

  useEffect(() => {
    return () => {
      lofiAudio.stop();
    };
  }, []);

  const handleTogglePlay = () => {
    const active = lofiAudio.toggle();
    setIsPlaying(active);
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-[#090f0c]/95 backdrop-blur-md border-t border-[#1d2d24] px-4 lg:px-8 py-2.5 transition-all">
      <div className="max-w-[1500px] mx-auto flex items-center justify-between gap-3">
        {/* Track Player */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={handleTogglePlay}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
              isPlaying
                ? 'bg-[#00df82] text-black shadow-[0_0_15px_rgba(0,223,130,0.5)] scale-105'
                : 'bg-[#00df82] hover:bg-[#00c774] text-black'
            }`}
            title={isPlaying ? 'Pause Lo-Fi Stream' : 'Play Lo-Fi Stream & Rain'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-black" />
            ) : (
              <Play className="w-4 h-4 fill-black ml-0.5" />
            )}
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white truncate">Rain in Shibuya</span>
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-full bg-[#00df82] animate-pulse rounded-full" />
                  <span className="w-0.5 h-2 bg-[#00df82] animate-bounce rounded-full" />
                  <span className="w-0.5 h-3 bg-[#00df82] animate-pulse rounded-full" />
                </div>
              )}
            </div>
            <div className="text-[11px] text-[#7d998b] font-mono-code truncate">
              Lo-Fi Pulse Cafe • 78 bpm
            </div>
          </div>
        </div>

        {/* Sustainability Telemetry */}
        <div className="hidden md:flex items-center gap-6 text-xs text-[#8ca497] font-mono-code">
          <div className="flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-[#00df82]" />
            <span className="text-[#c7ded2] font-semibold">14.2 kg CO₂ Saved</span>
          </div>
          <span className="text-[#2b3e34]">•</span>
          <div className="flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5 text-[#00df82]" />
            <span className="text-[#c7ded2]">Oat Milk Standard</span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onQuickReorder}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00df82] hover:bg-[#00c774] text-black font-semibold text-xs transition-all shadow-[0_0_12px_rgba(0,223,130,0.3)] active:scale-95"
          >
            <RotateCw className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Quick Reorder</span>
          </button>

          <button
            onClick={onShare}
            className="p-2 rounded-full bg-[#111c16] hover:bg-[#1a2c22] border border-[#23382c] text-[#8ea89b] hover:text-[#00df82] transition-colors"
            title="Share Drink Formula"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setHeadphoneMode(!headphoneMode)}
            className={`p-2 rounded-full border transition-colors ${
              headphoneMode
                ? 'bg-[#00df82]/20 border-[#00df82] text-[#00df82]'
                : 'bg-[#111c16] hover:bg-[#1a2c22] border-[#23382c] text-[#8ea89b] hover:text-white'
            }`}
            title="Binaural Spatial Audio Mode"
          >
            <Headphones className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
