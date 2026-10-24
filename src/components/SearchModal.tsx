import React, { useState, useEffect } from 'react';
import { Search, X, Coffee, Sparkles, Flame, Music, ArrowRight } from 'lucide-react';
import { NavTab, CartItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavTab) => void;
  onAddToCart: (item: CartItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onAddToCart,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickItems = [
    { title: 'Iced Strawberry Matcha Cloud', cat: 'Drink Formulation', tab: 'feed' as NavTab },
    { title: 'Blonde Espresso Ristretto Quad', cat: 'Drink Lab Base', tab: 'lab' as NavTab },
    { title: 'Fragment ⚡ x Ghibli Titanium Tumbler', cat: 'Vault Collab', tab: 'drops' as NavTab },
    { title: 'Barista Apron Oversized Hoodie', cat: 'Merch Drop', tab: 'drops' as NavTab },
    { title: 'Rain in Shibuya (Lo-Fi 78 bpm)', cat: 'Cafe Soundscape', tab: 'tracker' as NavTab },
  ];

  const filtered = quickItems.filter((i) =>
    i.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-xl rounded-2xl bg-[#0d1612] border border-[#23382c] shadow-[0_25px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Input box */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1d2d24]">
          <Search className="w-5 h-5 text-[#00df82]" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search drops, beans, tunes, or formulas..."
            className="w-full bg-transparent text-sm text-white placeholder-[#6a8777] outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#708c7c] hover:text-white hover:bg-[#16251d]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="p-3 max-h-80 overflow-y-auto">
          <div className="text-[10px] font-mono-code uppercase tracking-wider text-[#688575] px-3 py-1.5 font-bold">
            Quick Suggestions
          </div>
          <div className="space-y-1">
            {filtered.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onNavigate(item.tab);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-[#14231b] text-white transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Coffee className="w-4 h-4 text-[#00df82]" />
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-[#00df82] transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[10px] font-mono-code text-[#6f8a7b]">{item.cat}</div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#546e5f] group-hover:text-[#00df82] transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#09100c] border-t border-[#18261e] flex items-center justify-between text-[11px] text-[#708c7c] font-mono-code">
          <span>Press ESC to exit</span>
          <span>Tab switching enabled</span>
        </div>
      </div>
    </div>
  );
};
