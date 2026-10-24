import React, { useState } from 'react';
import {
  Volume2,
  Bookmark,
  Sparkles,
  Zap,
  Dumbbell,
  Moon,
  Heart,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Clock,
  Flame,
  Plus,
  Play,
} from 'lucide-react';
import { CartItem, NavTab } from '../types';
import confetti from 'canvas-confetti';

interface ExploreFeedViewProps {
  onNavigate: (tab: NavTab) => void;
  onAddToCart: (item: CartItem) => void;
  onShowToast: (msg: string) => void;
}

export const ExploreFeedView: React.FC<ExploreFeedViewProps> = ({
  onNavigate,
  onAddToCart,
  onShowToast,
}) => {
  const [activeMood, setActiveMood] = useState<'brain' | 'gym' | 'zen' | 'dopamine'>('brain');
  const [activeTag, setActiveTag] = useState('⚡ Viral on SipTok');
  const [likedCard, setLikedCard] = useState<Record<number, boolean>>({});

  const filterTags = [
    '⚡ Viral on SipTok',
    '🌿 100% Plant-Based',
    '🧊 Nitro & Cold Foam',
    '🔥 Spiced Roast Labs',
    '🌙 Low-Caf Evening',
    '✨ Secret Menu Hacks',
  ];

  const moodDrinks = {
    brain: {
      tag: 'PERFECT MATCH • 98% COMPATIBLE',
      caffeine: '210mg Caffeine',
      title: 'The Quad Ristretto Sub-Zero',
      desc: '4 shots blonde espresso pulled short over glacial ice, splashed with sparkling alkaline water and clean sea salt.',
      price: 5.45,
      cal: '15 Cal',
      sweetness: '1/5',
      caffeineScore: '5/5',
      foam: '1/5',
      image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=80',
    },
    gym: {
      tag: 'PERFECT MATCH • 96% COMPATIBLE',
      caffeine: '120mg Caffeine',
      title: 'Electrolyte Cold Brew Froth',
      desc: 'Single-origin Ethiopian cold brew with Himalayan pink mineral salt, coconut water infusion, and aerated oat cap.',
      price: 5.95,
      cal: '40 Cal',
      sweetness: '2/5',
      caffeineScore: '3/5',
      foam: '3/5',
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&auto=format&fit=crop&q=80',
    },
    zen: {
      tag: 'PERFECT MATCH • 99% COMPATIBLE',
      caffeine: '0mg Caffeine',
      title: 'Ceremonial Chamomile Cloud',
      desc: 'Slow-steeped Roman chamomile blossoms with Madagascar vanilla bean and micro-whipped botanical lavender froth.',
      price: 5.25,
      cal: '55 Cal',
      sweetness: '2/5',
      caffeineScore: '0/5',
      foam: '4/5',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80',
    },
    dopamine: {
      tag: 'PERFECT MATCH • 95% COMPATIBLE',
      caffeine: '160mg Caffeine',
      title: 'Smoked Brown Sugar Brulee Latte',
      desc: 'Blonde ristretto layered with torched molasses, brown sugar syrup, oat milk silk, and burnt honeycomb crumble.',
      price: 6.85,
      cal: '210 Cal',
      sweetness: '5/5',
      caffeineScore: '4/5',
      foam: '5/5',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&auto=format&fit=crop&q=80',
    },
  };

  const handleOrderHero = () => {
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    onAddToCart({
      id: `hero-${Date.now()}`,
      name: 'Iced Strawberry Matcha Cloud',
      subtitle: 'Grande • Quad Ice • Silk Oat Foam',
      price: 6.95,
      stars: 35,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&auto=format&fit=crop&q=80',
    });
    onShowToast('Iced Strawberry Matcha Cloud added to Bag!');
  };

  const handleQuickAdd = (name: string, price: number, subtitle: string, img: string) => {
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
    onAddToCart({
      id: `quick-${Date.now()}`,
      name,
      subtitle,
      price,
      stars: Math.round(price * 5),
      quantity: 1,
      image: img,
    });
    onShowToast(`Added "${name}" to Bag!`);
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-8 py-5 pb-28">
      {/* Sub-bar broadcast */}
      <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-[#0c1611] border border-[#1b2c22] mb-6">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00df82] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00df82]" />
          </span>
          <span className="font-mono-code font-bold text-[#00df82] text-[11px] tracking-wide">
            LIVE BROADCAST • SEATTLE LAB
          </span>
          <span className="text-[#8ba295] hidden sm:inline">
            Good Afternoon, Alex — Golden Hour Matcha drop is live
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono-code text-[11px] text-[#00df82]">
          <span>FREQ: 528Hz</span>
          <div className="flex items-end gap-0.5 h-3">
            <span className="w-0.5 h-full bg-[#00df82]" />
            <span className="w-0.5 h-2 bg-[#00df82]" />
            <span className="w-0.5 h-3 bg-[#00df82]" />
            <span className="w-0.5 h-1.5 bg-[#00df82]" />
          </div>
        </div>
      </div>

      {/* Hero Kinetic Drop Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#21382b] bg-gradient-to-r from-[#0c1813] via-[#09140f] to-[#0d1f16] p-6 lg:p-10 mb-8 shadow-2xl">
        {/* Background ambient image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=1600&auto=format&fit=crop&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080d0b] via-[#080d0b]/80 to-transparent pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-extrabold font-mono-code bg-[#142d1f] text-[#00df82] border border-[#00df82]/40 glow-green-sm">
                <Flame className="w-3 h-3 text-[#00df82]" />
                VIRAL SIPTOK #1 TRENDING
              </span>
              <span className="text-xs font-mono-code uppercase tracking-wider text-[#7e998b]">
                SEASONAL KINETIC DROP
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight uppercase">
              COFFEE IN MOTION.{' '}
              <span className="text-[#00df82] drop-shadow-[0_0_25px_rgba(0,223,130,0.5)] block sm:inline">
                TASTE THE FREQUENCY.
              </span>
            </h1>

            <p className="text-sm lg:text-base text-[#a0b8aa] max-w-xl mt-3 leading-relaxed">
              Engineered with cold-whipped strawberry clouds over micro-aerated ceremonial grade Uji matcha and Madagascar vanilla oat milk.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <button
                onClick={handleOrderHero}
                className="px-6 py-3 rounded-full bg-[#00df82] hover:bg-[#00c774] text-black font-extrabold text-sm transition-all shadow-[0_0_20px_rgba(0,223,130,0.4)] active:scale-95 cursor-pointer"
              >
                Order Now • $6.95
              </button>
              <button
                onClick={() => onNavigate('lab')}
                className="px-5 py-3 rounded-full bg-[#132219] hover:bg-[#1a2e23] border border-[#233a2d] text-white font-semibold text-sm transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#00df82]" />
                <span>Customize Formulation</span>
              </button>
              <span className="text-xs text-[#829c8e] font-mono-code px-3 py-1 rounded-full bg-[#0d1612] border border-[#1b2b22]">
                100% Plant-Based • 140 Cal
              </span>
            </div>
          </div>

          {/* Hero Right Widget: One-Tap Priority Slip */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-5 rounded-2xl border border-[#243d2f] shadow-xl relative">
              {/* Widget Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-[#829c8e]">
                  ONE-TAP PRIORITY SLIP
                </span>
                <ShieldCheck className="w-4 h-4 text-[#00df82]" />
              </div>

              <h3 className="text-lg font-bold font-display text-white">
                Iced Strawberry Matcha Cloud
              </h3>
              <p className="text-xs text-[#7e998b] mb-3">Grande • Quad Ice • Silk Oat Foam</p>

              {/* Drink Photo Preview */}
              <div className="relative h-36 rounded-xl overflow-hidden mb-3 border border-[#1e2f25]">
                <img
                  src="https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80"
                  alt="Iced Strawberry Matcha Cloud"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold text-white font-mono-code">
                  ★ 4.9 (14.8k orders)
                </span>
              </div>

              {/* Telemetry Row */}
              <div className="grid grid-cols-3 gap-2 py-2 mb-3 bg-[#0c1611] rounded-xl px-3 border border-[#1b2a21] text-center">
                <div>
                  <div className="text-[9px] uppercase font-mono-code text-[#708c7c]">SWEETNESS</div>
                  <div className="text-xs font-bold text-white">3/5</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase font-mono-code text-[#708c7c]">CAFFEINE</div>
                  <div className="text-xs font-bold text-[#00df82]">85mg</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase font-mono-code text-[#708c7c]">BARISTAS</div>
                  <div className="text-xs font-bold text-white">Ready</div>
                </div>
              </div>

              {/* Express Order Button */}
              <button
                onClick={() => {
                  handleOrderHero();
                  onNavigate('tracker');
                }}
                className="w-full py-3 rounded-xl bg-[#00df82] hover:bg-[#00c774] text-black font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,223,130,0.3)] cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Express Order • Pickup in 3m</span>
              </button>

              {/* Store wait info */}
              <div className="flex items-center justify-between text-[11px] text-[#7d998a] mt-3 pt-2 border-t border-[#1a2921]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00df82]" />
                  <span>Pike Place Sanctuary • 4 mins wait (6 Active)</span>
                </div>
                <button
                  onClick={() => onShowToast('Showing nearby Reserve Bar locations')}
                  className="text-xs text-[#00df82] hover:underline"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
        {filterTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTag === tag
                ? 'bg-[#15271e] text-[#00df82] border border-[#00df82]/40 glow-green-sm'
                : 'bg-[#0f1713] text-[#86a091] hover:text-white border border-[#1c2c23]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* SipTok Community Stream */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00df82] font-mono-code">
              <Play className="w-3 h-3 fill-[#00df82]" />
              <span>SIPTOK COMMUNITY STREAM</span>
            </div>
            <h2 className="text-2xl font-bold font-display text-white">Trending Drinks From Real Creators</h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#7e998b]">
            <span className="hidden sm:inline">Sound ON recommended</span>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 rounded-full bg-[#111c16] border border-[#1f3127] flex items-center justify-center hover:text-white">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded-full bg-[#111c16] border border-[#1f3127] flex items-center justify-center hover:text-white">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Creator Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="glass-panel rounded-2xl overflow-hidden border border-[#1e2f25] flex flex-col group hover:border-[#00df82]/50 transition-all">
            <div className="relative h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=80"
                alt="Midnight Brown Sugar"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono-code text-white">
                4.2M views
              </span>
              <button
                onClick={() => setLikedCard((prev) => ({ ...prev, 1: !prev[1] }))}
                className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:text-red-400 transition-colors"
              >
                <Heart className={`w-4 h-4 ${likedCard[1] ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
              <div className="absolute bottom-2.5 left-2.5 right-2.5">
                <div className="text-[11px] font-bold text-white flex items-center gap-1">
                  <span className="w-5 h-5 rounded-full bg-[#182a20] text-[#00df82] flex items-center justify-center text-[10px] font-mono-code font-bold">
                    MK
                  </span>
                  <span>@maya.brews • Seattle</span>
                </div>
              </div>
            </div>
            <div className="p-3.5 flex flex-col justify-between flex-1">
              <div>
                <h4 className="text-sm font-bold text-white font-display">Midnight Brown Sugar Shaken</h4>
                <p className="text-xs text-[#7e998b] mt-0.5 line-clamp-1">
                  Blonde roast, 3 pumps brown sugar, oat milk foam
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#1d2d24]">
                <button
                  onClick={() =>
                    handleQuickAdd(
                      'Midnight Brown Sugar Shaken',
                      6.25,
                      'Blonde roast, 3 pumps brown sugar, oat milk foam',
                      'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=80'
                    )
                  }
                  className="w-full py-2 rounded-xl bg-[#00df82] hover:bg-[#00c774] text-black font-bold text-xs transition-all shadow-[0_0_10px_rgba(0,223,130,0.2)]"
                >
                  Add to Bag • $6.25
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-panel rounded-2xl overflow-hidden border border-[#1e2f25] flex flex-col group hover:border-[#00df82]/50 transition-all">
            <div className="relative h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&auto=format&fit=crop&q=80"
                alt="Lavender Ube Foam Cold Brew"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono-code text-white">
                1.8M views
              </span>
              <button
                onClick={() => setLikedCard((prev) => ({ ...prev, 2: !prev[2] }))}
                className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:text-red-400 transition-colors"
              >
                <Heart className={`w-4 h-4 ${likedCard[2] ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
              <div className="absolute bottom-2.5 left-2.5 right-2.5">
                <div className="text-[11px] font-bold text-white flex items-center gap-1">
                  <span className="w-5 h-5 rounded-full bg-[#182a20] text-[#00df82] flex items-center justify-center text-[10px] font-mono-code font-bold">
                    DZ
                  </span>
                  <span>@danny_zen • NYC Roastery</span>
                </div>
              </div>
            </div>
            <div className="p-3.5 flex flex-col justify-between flex-1">
              <div>
                <h4 className="text-sm font-bold text-white font-display">Lavender Ube Foam Cold Brew</h4>
                <p className="text-xs text-[#7e998b] mt-0.5 line-clamp-1">
                  Cold brew + purple sweet potato sweet cold foam
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#1d2d24]">
                <button
                  onClick={() =>
                    handleQuickAdd(
                      'Lavender Ube Foam Cold Brew',
                      6.65,
                      'Cold brew + purple sweet potato sweet cold foam',
                      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&auto=format&fit=crop&q=80'
                    )
                  }
                  className="w-full py-2 rounded-xl bg-[#00df82] hover:bg-[#00c774] text-black font-bold text-xs transition-all shadow-[0_0_10px_rgba(0,223,130,0.2)]"
                >
                  Add to Bag • $6.65
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel rounded-2xl overflow-hidden border border-[#1e2f25] flex flex-col group hover:border-[#00df82]/50 transition-all">
            <div className="relative h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop&q=80"
                alt="Matcha Espresso Split Cloud"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono-code text-white">
                3.1M views • 94% Approval
              </span>
              <button
                onClick={() => setLikedCard((prev) => ({ ...prev, 3: !prev[3] }))}
                className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:text-red-400 transition-colors"
              >
                <Heart className={`w-4 h-4 ${likedCard[3] ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
              <div className="absolute bottom-2.5 left-2.5 right-2.5">
                <div className="text-[11px] font-bold text-white flex items-center gap-1">
                  <span className="w-5 h-5 rounded-full bg-[#182a20] text-[#00df82] flex items-center justify-center text-[10px] font-mono-code font-bold">
                    SL
                  </span>
                  <span>@sora.labs • Tokyo Shibuya</span>
                </div>
              </div>
            </div>
            <div className="p-3.5 flex flex-col justify-between flex-1">
              <div>
                <h4 className="text-sm font-bold text-white font-display">Matcha Espresso Split Cloud</h4>
                <p className="text-xs text-[#7e998b] mt-0.5 line-clamp-1">
                  Double ristretto floated over iced matcha & oat milk
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#1d2d24]">
                <button
                  onClick={() =>
                    handleQuickAdd(
                      'Matcha Espresso Split Cloud',
                      7.10,
                      'Double ristretto floated over iced matcha & oat milk',
                      'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop&q=80'
                    )
                  }
                  className="w-full py-2 rounded-xl bg-[#00df82] hover:bg-[#00c774] text-black font-bold text-xs transition-all shadow-[0_0_10px_rgba(0,223,130,0.2)]"
                >
                  Add to Bag • $7.10
                </button>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="glass-panel rounded-2xl overflow-hidden border border-[#1e2f25] flex flex-col group hover:border-[#00df82]/50 transition-all">
            <div className="relative h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80"
                alt="Pistachio Crème Brûlée Nitro"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono-code text-white">
                890K views • LIMITED BATCH
              </span>
              <button
                onClick={() => setLikedCard((prev) => ({ ...prev, 4: !prev[4] }))}
                className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:text-red-400 transition-colors"
              >
                <Heart className={`w-4 h-4 ${likedCard[4] ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
              <div className="absolute bottom-2.5 left-2.5 right-2.5">
                <div className="text-[11px] font-bold text-white flex items-center gap-1">
                  <span className="w-5 h-5 rounded-full bg-[#182a20] text-[#00df82] flex items-center justify-center text-[10px] font-mono-code font-bold">
                    EK
                  </span>
                  <span>@elena_k • Chicago</span>
                </div>
              </div>
            </div>
            <div className="p-3.5 flex flex-col justify-between flex-1">
              <div>
                <h4 className="text-sm font-bold text-white font-display">Pistachio Crème Brûlée Nitro</h4>
                <p className="text-xs text-[#7e998b] mt-0.5 line-clamp-1">
                  Micro-nitrogen cascade with caramelized pistachio dust
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#1d2d24]">
                <button
                  onClick={() =>
                    handleQuickAdd(
                      'Pistachio Crème Brûlée Nitro',
                      6.95,
                      'Micro-nitrogen cascade with caramelized pistachio dust',
                      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80'
                    )
                  }
                  className="w-full py-2 rounded-xl bg-[#00df82] hover:bg-[#00c774] text-black font-bold text-xs transition-all shadow-[0_0_10px_rgba(0,223,130,0.2)]"
                >
                  Add to Bag • $6.95
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Intuitive Formulation Engine: Dial in Your State of Mind */}
      <div className="glass-panel p-6 lg:p-8 rounded-3xl border border-[#1f3328] mb-12">
        <div className="mb-6">
          <div className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#00df82] mb-1">
            INTUITIVE FORMULATION ENGINE
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold font-display text-white">
            Dial in Your State of Mind
          </h2>
          <p className="text-sm text-[#8ba295] max-w-xl mt-1">
            Skip choice paralysis. Choose your rhythm, and our bar algorithm configures the optimal flavor, acidity, and caffeine profile instantly.
          </p>
        </div>

        {/* 4 Mood Option Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <button
            onClick={() => setActiveMood('brain')}
            className={`p-4 rounded-2xl text-left transition-all border flex flex-col gap-2 ${
              activeMood === 'brain'
                ? 'bg-[#00df82] text-black border-[#00df82] shadow-[0_0_20px_rgba(0,223,130,0.4)]'
                : 'bg-[#0d1612] text-[#8aa294] border-[#1d2d24] hover:border-[#2f493b]'
            }`}
          >
            <Zap className={`w-5 h-5 ${activeMood === 'brain' ? 'text-black' : 'text-[#00df82]'}`} />
            <div>
              <div className={`font-bold text-sm ${activeMood === 'brain' ? 'text-black font-display' : 'text-white'}`}>
                Brain Fuel
              </div>
              <div className={`text-xs ${activeMood === 'brain' ? 'text-black/80 font-medium' : 'text-[#708c7c]'}`}>
                Deep focus & high caffeine
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveMood('gym')}
            className={`p-4 rounded-2xl text-left transition-all border flex flex-col gap-2 ${
              activeMood === 'gym'
                ? 'bg-[#00df82] text-black border-[#00df82] shadow-[0_0_20px_rgba(0,223,130,0.4)]'
                : 'bg-[#0d1612] text-[#8aa294] border-[#1d2d24] hover:border-[#2f493b]'
            }`}
          >
            <Dumbbell className={`w-5 h-5 ${activeMood === 'gym' ? 'text-black' : 'text-[#00df82]'}`} />
            <div>
              <div className={`font-bold text-sm ${activeMood === 'gym' ? 'text-black font-display' : 'text-white'}`}>
                Post-Gym Clean
              </div>
              <div className={`text-xs ${activeMood === 'gym' ? 'text-black/80 font-medium' : 'text-[#708c7c]'}`}>
                Electrolytes & light cold froth
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveMood('zen')}
            className={`p-4 rounded-2xl text-left transition-all border flex flex-col gap-2 ${
              activeMood === 'zen'
                ? 'bg-[#00df82] text-black border-[#00df82] shadow-[0_0_20px_rgba(0,223,130,0.4)]'
                : 'bg-[#0d1612] text-[#8aa294] border-[#1d2d24] hover:border-[#2f493b]'
            }`}
          >
            <Moon className={`w-5 h-5 ${activeMood === 'zen' ? 'text-black' : 'text-[#00df82]'}`} />
            <div>
              <div className={`font-bold text-sm ${activeMood === 'zen' ? 'text-black font-display' : 'text-white'}`}>
                Zen Sunday Chill
              </div>
              <div className={`text-xs ${activeMood === 'zen' ? 'text-black/80 font-medium' : 'text-[#708c7c]'}`}>
                Herbal infusion & zero jitter
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveMood('dopamine')}
            className={`p-4 rounded-2xl text-left transition-all border flex flex-col gap-2 ${
              activeMood === 'dopamine'
                ? 'bg-[#00df82] text-black border-[#00df82] shadow-[0_0_20px_rgba(0,223,130,0.4)]'
                : 'bg-[#0d1612] text-[#8aa294] border-[#1d2d24] hover:border-[#2f493b]'
            }`}
          >
            <Sparkles className={`w-5 h-5 ${activeMood === 'dopamine' ? 'text-black' : 'text-[#00df82]'}`} />
            <div>
              <div className={`font-bold text-sm ${activeMood === 'dopamine' ? 'text-black font-display' : 'text-white'}`}>
                Sweet Dopamine
              </div>
              <div className={`text-xs ${activeMood === 'dopamine' ? 'text-black/80 font-medium' : 'text-[#708c7c]'}`}>
                Caramelized indulgence
              </div>
            </div>
          </button>
        </div>

        {/* Dynamic Matched Drink Box */}
        {(() => {
          const drink = moodDrinks[activeMood];
          return (
            <div className="p-5 rounded-2xl bg-[#09120e] border border-[#1f3127] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={drink.image}
                  alt={drink.title}
                  className="w-20 h-20 rounded-xl object-cover border border-[#21382b]"
                />
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono-code font-bold mb-1">
                    <span className="text-[#00df82]">{drink.tag}</span>
                    <span className="text-[#7e998b]">| {drink.caffeine}</span>
                  </div>
                  <h3 className="text-lg font-bold font-display text-white">{drink.title}</h3>
                  <p className="text-xs text-[#7e998b] max-w-md mt-0.5">{drink.desc}</p>
                  <div className="text-xs font-mono-code text-[#00df82] font-semibold mt-1">
                    ${drink.price.toFixed(2)} • {drink.cal}
                  </div>
                </div>
              </div>

              {/* Gauge scores & button */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 text-center">
                  <div>
                    <div className="w-10 h-10 rounded-full border border-[#00df82]/50 flex items-center justify-center font-mono-code font-bold text-xs text-white">
                      {drink.sweetness}
                    </div>
                    <div className="text-[9px] uppercase font-mono-code text-[#6b8577] mt-1">Sweetness</div>
                  </div>
                  <div>
                    <div className="w-10 h-10 rounded-full border border-[#00df82] bg-[#00df82]/10 flex items-center justify-center font-mono-code font-bold text-xs text-[#00df82]">
                      {drink.caffeineScore}
                    </div>
                    <div className="text-[9px] uppercase font-mono-code text-[#6b8577] mt-1">Caffeine</div>
                  </div>
                  <div>
                    <div className="w-10 h-10 rounded-full border border-[#00df82]/50 flex items-center justify-center font-mono-code font-bold text-xs text-white">
                      {drink.foam}
                    </div>
                    <div className="text-[9px] uppercase font-mono-code text-[#6b8577] mt-1">Silk Foam</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleQuickAdd(drink.title, drink.price, drink.desc, drink.image);
                    onNavigate('tracker');
                  }}
                  className="px-5 py-3 rounded-xl bg-[#00df82] hover:bg-[#00c774] text-black font-extrabold text-xs transition-all shadow-[0_0_15px_rgba(0,223,130,0.3)] whitespace-nowrap"
                >
                  Select & Brew
                </button>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Bottom Row: Cafe Floor Dynamics & Community Pulse */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Cafe Floor Dynamics (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl border border-[#1e2f25]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00df82]" />
              <h3 className="text-sm font-bold text-white font-display">Cafe Floor Dynamics</h3>
            </div>
            <span className="text-[10px] font-mono-code text-[#738e80]">Synced 12s ago</span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="p-3 rounded-xl bg-[#0c1611] border border-[#1c2a21]">
              <div className="text-[9px] uppercase font-mono-code text-[#708c7c]">AVG EXTRACTION WAIT</div>
              <div className="text-xl font-bold font-display text-white mt-1">
                3.8 <span className="text-xs font-normal text-[#8ba295]">min</span>
              </div>
              <div className="text-[10px] text-[#00df82] font-mono-code mt-0.5">Optimal speed</div>
            </div>

            <div className="p-3 rounded-xl bg-[#0c1611] border border-[#1c2a21]">
              <div className="text-[9px] uppercase font-mono-code text-[#708c7c]">MASTER BARISTAS</div>
              <div className="text-xl font-bold font-display text-white mt-1">
                6 <span className="text-xs font-normal text-[#8ba295]">on Bar</span>
              </div>
              <div className="text-[10px] text-[#708c7c] font-mono-code mt-0.5">2 dedicated cold craft</div>
            </div>

            <div className="p-3 rounded-xl bg-[#0c1611] border border-[#1c2a21]">
              <div className="text-[9px] uppercase font-mono-code text-[#708c7c]">OAT MILK RESERVE</div>
              <div className="text-xl font-bold font-display text-[#00df82] mt-1">
                94%
              </div>
              <div className="text-[10px] text-[#708c7c] font-mono-code mt-0.5">Restocked 10am</div>
            </div>
          </div>

          {/* Map display */}
          <div className="relative rounded-xl overflow-hidden h-28 border border-[#1d2d24] mb-3">
            <div
              className="absolute inset-0 bg-cover bg-center filter brightness-75 contrast-125"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80)',
              }}
            />
            <div className="absolute inset-0 bg-[#08150f]/60" />
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#00df82]" />
                <div>
                  <div className="text-xs font-bold text-white">1912 Pike Pl, Seattle</div>
                  <div className="text-[11px] text-[#00df82]">0.3 miles away</div>
                </div>
              </div>
              <button
                onClick={() => onShowToast('Opening Google Maps directions to Pike Place Hub')}
                className="px-3 py-1.5 rounded-full bg-[#102419] border border-[#00df82]/40 text-xs font-bold text-[#00df82]"
              >
                Directions
              </button>
            </div>
          </div>

          <div className="text-[11px] text-[#708c7c] flex items-center gap-1.5 font-mono-code">
            <span className="text-[#00df82]">✦</span>
            <span>Mobile pickups now skip line automatically at pickup cubby #3.</span>
          </div>
        </div>

        {/* Right: Community Pulse (Live) (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-[#1e2f25] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00df82] animate-ping" />
                <h3 className="text-sm font-bold text-white font-display">Community Pulse (Live)</h3>
              </div>
              <span className="text-[10px] font-mono-code text-[#738e80]">4,200+ Cafes</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                { rank: 1, name: 'Iced Brown Sugar Oat Latte', orders: '2,410 ordered this hour', price: 6.25 },
                { rank: 2, name: 'Strawberry Matcha Velvet', orders: '1,894 ordered this hour', price: 6.95 },
                { rank: 3, name: 'Vanilla Sweet Cream Cold Brew', orders: '1,520 ordered this hour', price: 5.75 },
                { rank: 4, name: 'Nitro Lavender Foam Hack', orders: '970 ordered this hour', price: 6.45 },
              ].map((item) => (
                <div
                  key={item.rank}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#0c1611] border border-[#1c2b21] hover:border-[#00df82]/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold font-mono-code text-[#00df82] w-4 text-center">
                      {item.rank}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white">{item.name}</div>
                      <div className="text-[10px] text-[#6b8577] font-mono-code">{item.orders}</div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      handleQuickAdd(
                        item.name,
                        item.price,
                        item.orders,
                        'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=200&auto=format&fit=crop&q=80'
                      )
                    }
                    className="w-7 h-7 rounded-full bg-[#14231b] hover:bg-[#00df82] hover:text-black text-[#00df82] flex items-center justify-center transition-colors"
                    title="Quick add to bag"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-[#102419] to-[#0c1813] border border-[#00df82]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#00df82] text-sm">★</span>
              <span className="text-xs font-semibold text-white">Double Star Day active on all mobile orders.</span>
            </div>
            <span className="text-xs font-bold font-mono-code text-[#00df82]">+50 Bonus</span>
          </div>
        </div>
      </div>
    </div>
  );
};
