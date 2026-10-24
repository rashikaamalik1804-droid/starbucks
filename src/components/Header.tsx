import React from 'react';
import { Search, ShoppingBag, Star, Sparkles, Download } from 'lucide-react';
import { NavTab } from '../types';

interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenDownload: () => void;
  stars: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenSearch,
  onOpenDownload,
  stars,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#090f0c]/95 backdrop-blur-md border-b border-[#1b2b22] px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-[1500px] mx-auto flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div 
          onClick={() => onTabChange('feed')}
          className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#0a1a12] border border-[#00df82]/40 shadow-[0_0_15px_rgba(0,223,130,0.2)] group-hover:shadow-[0_0_20px_rgba(0,223,130,0.4)] transition-all">
            {/* Siren Star Icon */}
            <div className="w-5 h-5 text-[#00df82] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2L14.4 8.6L21.5 9.1L16 13.7L17.7 20.6L12 16.9L6.3 20.6L8 13.7L2.5 9.1L9.6 8.6L12 2Z" />
              </svg>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00df82] ring-2 ring-[#090f0c] animate-ping" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00df82] ring-2 ring-[#090f0c]" />
          </div>

          <div>
            <div className="flex items-center gap-1.5 font-display text-sm tracking-wider font-extrabold text-white">
              <span>STARBUCKS</span>
              <span className="text-[#00df82] tracking-widest">PULSE</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#789585] tracking-tight font-mono-code">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00df82]" />
              <span>LIVE AT 4,200+ CAFES</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center bg-[#0d1612] p-1 rounded-full border border-[#1d2d24]">
          <button
            onClick={() => onTabChange('feed')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === 'feed'
                ? 'bg-[#18261e] text-white shadow-sm border border-[#2b4134]'
                : 'text-[#8ba295] hover:text-white'
            }`}
          >
            <span>Explore & Feed</span>
          </button>

          <button
            onClick={() => onTabChange('lab')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 relative ${
              activeTab === 'lab'
                ? 'bg-[#18261e] text-[#00df82] shadow-sm border border-[#00df82]/40 glow-green-sm'
                : 'text-[#8ba295] hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00df82]" />
            <span>Drink Lab</span>
          </button>

          <button
            onClick={() => onTabChange('drops')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === 'drops'
                ? 'bg-[#18261e] text-white shadow-sm border border-[#2b4134]'
                : 'text-[#8ba295] hover:text-white'
            }`}
          >
            <span>Exclusive Drops</span>
          </button>

          <button
            onClick={() => onTabChange('tracker')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === 'tracker'
                ? 'bg-[#18261e] text-white shadow-sm border border-[#2b4134]'
                : 'text-[#8ba295] hover:text-white'
            }`}
          >
            <span>Order & Tracker</span>
            <span className="w-2 h-2 rounded-full bg-[#00df82] animate-pulse" />
          </button>
        </nav>

        {/* Actions & Profile */}
        <div className="flex items-center gap-2.5">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111c16] hover:bg-[#16251e] border border-[#22362b] text-xs text-[#829c8d] transition-all group"
          >
            <Search className="w-3.5 h-3.5 text-[#738e80] group-hover:text-[#00df82] transition-colors" />
            <span className="hidden xl:inline text-[11px]">Search drops, beans, tunes...</span>
            <span className="text-[10px] bg-[#1a2c22] px-1.5 py-0.5 rounded font-mono-code text-[#00df82]">⌘K</span>
          </button>

          {/* Stars */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111c16] border border-[#22362b] text-xs text-white">
            <Star className="w-3.5 h-3.5 fill-[#00df82] text-[#00df82]" />
            <span className="font-bold text-[#00df82]">{stars}</span>
            <span className="text-[#8ba295] text-[11px]">Stars</span>
          </div>

          {/* Cart Bag */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00df82] hover:bg-[#00c774] text-black font-semibold text-xs transition-all shadow-[0_0_15px_rgba(0,223,130,0.3)] hover:shadow-[0_0_20px_rgba(0,223,130,0.5)] active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5 fill-black" />
            <span>
              {cartCount} items • ${cartTotal.toFixed(2)}
            </span>
          </button>

          {/* Download ZIP Button */}
          <button
            onClick={onOpenDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111c16] hover:bg-[#182920] border border-[#23382c] hover:border-[#00df82]/40 text-xs font-semibold text-[#8ea89a] hover:text-[#00df82] transition-all"
            title="Download full project code as ZIP"
          >
            <Download className="w-3.5 h-3.5 text-[#00df82]" />
            <span className="hidden sm:inline">Download ZIP</span>
          </button>

          {/* User Profile Avatar */}
          <div className="relative cursor-pointer" title="Alexander Chen (Gold VIP Level 4)">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Alexander Chen"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#00df82]/70"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#00df82] rounded-full border-2 border-[#090f0c]" />
          </div>
        </div>
      </div>

      {/* Mobile Tab bar */}
      <div className="flex md:hidden items-center justify-around mt-2 pt-2 border-t border-[#1d2d24]">
        <button
          onClick={() => onTabChange('feed')}
          className={`text-[11px] font-medium py-1 px-2 rounded ${activeTab === 'feed' ? 'text-[#00df82] font-bold' : 'text-[#8ba295]'}`}
        >
          Explore
        </button>
        <button
          onClick={() => onTabChange('lab')}
          className={`text-[11px] font-medium py-1 px-2 rounded ${activeTab === 'lab' ? 'text-[#00df82] font-bold' : 'text-[#8ba295]'}`}
        >
          Drink Lab
        </button>
        <button
          onClick={() => onTabChange('drops')}
          className={`text-[11px] font-medium py-1 px-2 rounded ${activeTab === 'drops' ? 'text-[#00df82] font-bold' : 'text-[#8ba295]'}`}
        >
          Exclusive Drops
        </button>
        <button
          onClick={() => onTabChange('tracker')}
          className={`text-[11px] font-medium py-1 px-2 rounded flex items-center gap-1 ${activeTab === 'tracker' ? 'text-[#00df82] font-bold' : 'text-[#8ba295]'}`}
        >
          Tracker
          <span className="w-1.5 h-1.5 rounded-full bg-[#00df82]" />
        </button>
      </div>
    </header>
  );
};
