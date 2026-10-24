import React, { useState } from 'react';
import { Bookmark, Share2, Plus, Minus, Check, Sparkles, ArrowRight, Grid, Snowflake, Waves, ShoppingBag } from 'lucide-react';
import { CupSize, CartItem } from '../types';
import { GlassCupStack } from '../components/GlassCupStack';
import confetti from 'canvas-confetti';

interface DrinkLabViewProps {
  onAddToCart: (item: CartItem) => void;
  onOpenTracker: () => void;
  onShowToast: (msg: string) => void;
}

export const DrinkLabView: React.FC<DrinkLabViewProps> = ({
  onAddToCart,
  onShowToast,
}) => {
  // Formulation state
  const [cupSize, setCupSize] = useState<CupSize>('Grande');
  const [activeStepTab, setActiveStepTab] = useState<'base' | 'milk' | 'foam' | 'syrup' | 'ice'>('base');

  const [selectedBase, setSelectedBase] = useState('blonde');
  const [dosage, setDosage] = useState(3);
  const [selectedMilk, setSelectedMilk] = useState('oatly');
  const [selectedFoam, setSelectedFoam] = useState('lavender');
  const [brownSugarPumps, setBrownSugarPumps] = useState(2);
  const [vanillaPumps, setVanillaPumps] = useState(1);
  const [hasCrosshatch, setHasCrosshatch] = useState(true);
  const [iceLevel, setIceLevel] = useState<'crushed' | 'light' | 'none'>('crushed');

  // Options Definitions
  const baseOptions = [
    {
      id: 'blonde',
      name: 'Blonde Espresso (3x)',
      price: 0,
      kcal: 15,
      caffeine: 225,
      desc: 'Smooth, sweet citrus undertones with heavy natural crema.',
      color: '#4a2c16',
      label: 'Included',
    },
    {
      id: 'nitro',
      name: 'Nitro Cold Brew',
      price: 0.50,
      kcal: 5,
      caffeine: 280,
      desc: 'Micro-nitrogen infused, velvet cascading body.',
      color: '#2a1a10',
      label: '+$0.50',
    },
    {
      id: 'matcha',
      name: 'Uji Ceremonial Matcha',
      price: 0.75,
      kcal: 25,
      caffeine: 80,
      desc: 'Stoneground first-harvest green tea umami extract.',
      color: '#2d6139',
      label: '+$0.75',
    },
    {
      id: 'black',
      name: 'Shaken Black Reserve',
      price: 0,
      kcal: 0,
      caffeine: 45,
      desc: 'Bold tannic structured tea leaves aerated over ice.',
      color: '#3d1f11',
      label: 'Included',
    },
  ];

  const milkOptions = [
    {
      id: 'oatly',
      name: 'Barista Oatly Standard',
      price: 0,
      kcal: 90,
      desc: 'Rich mouthfeel, toasted grains notes.',
      co2: '14.2kg CO2 saved',
      color: '#e4d3ba',
      label: 'Free',
      vegan: true,
      dairyFree: true,
    },
    {
      id: 'almond',
      name: 'Almond Silk Reserve',
      price: 0,
      kcal: 45,
      desc: 'Light, nutty aroma, ultra-clean finish.',
      co2: 'Zero Added Cane',
      color: '#eae0cc',
      label: 'Free',
      vegan: true,
      dairyFree: true,
    },
    {
      id: 'coconut',
      name: 'Coconut Velvet',
      price: 0.40,
      kcal: 80,
      desc: 'Silky tropical creaminess with light foam.',
      co2: 'Organic',
      color: '#f5f0e6',
      label: '+$0.40',
      vegan: true,
      dairyFree: true,
    },
    {
      id: 'dairy',
      name: 'Organic Dairy Whole',
      price: 0,
      kcal: 140,
      desc: 'Traditional pasture-raised sweet dairy profile.',
      co2: 'Heavy Texture',
      color: '#fffbf0',
      label: 'Free',
      vegan: false,
      dairyFree: false,
    },
  ];

  const foamOptions = [
    {
      id: 'lavender',
      name: 'Lavender Sweet Cloud',
      price: 1.25,
      kcal: 70,
      desc: 'French culinary lavender, Madagascar vanilla bean.',
      tag: 'Floral Silk',
      color: '#d6c4eb',
      label: '+$1.25',
    },
    {
      id: 'strawberry',
      name: 'Strawberry Matcha Cloud',
      price: 1.40,
      kcal: 85,
      desc: 'Dual-layered berry puree + matcha foam strike.',
      tag: 'TikTok Viral',
      color: '#f3b5c6',
      label: '+$1.40',
    },
    {
      id: 'salted_caramel',
      name: 'Salted Caramel Cream',
      price: 1.25,
      kcal: 95,
      desc: 'Sea salt crystals folded into dense sweet cream.',
      tag: 'Decadent',
      color: '#ebd6b3',
      label: '+$1.25',
    },
    {
      id: 'sugar_free_oat',
      name: 'Sugar-Free Oat Cloud',
      price: 1.10,
      kcal: 30,
      desc: 'Monk fruit sweetened, aerated oat base.',
      tag: 'Zero Cane Sugar',
      color: '#f2e8da',
      label: '+$1.10',
    },
  ];

  // Dynamic calculations
  const currBase = baseOptions.find((b) => b.id === selectedBase) || baseOptions[0];
  const currMilk = milkOptions.find((m) => m.id === selectedMilk) || milkOptions[0];
  const currFoam = foamOptions.find((f) => f.id === selectedFoam) || foamOptions[0];

  const basePrice = 5.45;
  const sizeMultiplier = cupSize === 'Tall' ? 0.9 : cupSize === 'Grande' ? 1.0 : cupSize === 'Venti' ? 1.15 : 1.25;
  const totalPrice = Number(
    ((basePrice * sizeMultiplier) + currBase.price + currMilk.price + currFoam.price + (hasCrosshatch ? 0.50 : 0) + (brownSugarPumps * 0.15) + (vanillaPumps * 0.15)).toFixed(2)
  );

  const starPoints = Math.round(totalPrice * 5);
  const totalKcal = Math.round((currBase.kcal + currMilk.kcal + currFoam.kcal + (brownSugarPumps * 20) + (vanillaPumps * 20) + (hasCrosshatch ? 30 : 0)));
  const totalCaffeine = Math.round(currBase.caffeine * (dosage / 3));
  const totalSweetness = Math.min(100, Math.round(30 + (brownSugarPumps * 10) + (vanillaPumps * 10) + (hasCrosshatch ? 15 : 0)));
  const chillTemp = iceLevel === 'crushed' ? -2 : iceLevel === 'light' ? 0 : 4;

  const handleDeployToBag = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00df82', '#ffffff', '#ffd700'],
    });

    const item: CartItem = {
      id: `lab-${Date.now()}`,
      name: `${cupSize} Cloud Espresso Ritual`,
      subtitle: `${currBase.name} • ${currMilk.name} • ${currFoam.name}`,
      price: totalPrice,
      stars: starPoints,
      quantity: 1,
      customization: [
        `${dosage}x Ristretto Shots`,
        `${brownSugarPumps} Pumps Brown Sugar`,
        `${vanillaPumps} Pumps Vanilla`,
        hasCrosshatch ? 'Caramel Crosshatch' : 'No Crosshatch',
        `${iceLevel.toUpperCase()} Ice`,
      ],
    };

    onAddToCart(item);
    onShowToast(`Deployed "${item.name}" to Bag! Earned +${starPoints} Stars`);
  };

  const handleLoadPreset = (preset: {
    base: string;
    dosage: number;
    milk: string;
    foam: string;
    brownSugar: number;
    vanilla: number;
    crosshatch: boolean;
    ice: 'crushed' | 'light' | 'none';
    name: string;
  }) => {
    setSelectedBase(preset.base);
    setDosage(preset.dosage);
    setSelectedMilk(preset.milk);
    setSelectedFoam(preset.foam);
    setBrownSugarPumps(preset.brownSugar);
    setVanillaPumps(preset.vanilla);
    setHasCrosshatch(preset.crosshatch);
    setIceLevel(preset.ice);
    onShowToast(`Loaded preset formula: "${preset.name}"`);
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-8 py-6 pb-28">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#739281] uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-[#00df82]" />
            <span>LAB PROTOTYPE V3.4 • Custom Formulation Studio</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-white">
            The Drink Lab <span className="italic font-serif text-[#00df82] font-normal underline decoration-[#00df82]/40">Customizer</span>
          </h1>
          <p className="text-sm text-[#8ba295] max-w-2xl mt-1.5 leading-relaxed">
            Architect your custom sensory drink stack layer by layer. Real-time viscosity modeling, calorie telemetry, and barista ticket generation.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onShowToast('Secret recipe saved to your Vault Profile!')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#111c16] hover:bg-[#182920] border border-[#233a2d] text-xs font-medium text-white transition-all"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#00df82]" />
            <span>Save Secret Recipe</span>
          </button>
          <button
            onClick={() => onShowToast('Formula link copied to clipboard!')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#111c16] hover:bg-[#182920] border border-[#233a2d] text-xs font-medium text-white transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-[#00df82]" />
            <span>Share Formula</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Glass Cup Sensory Stack (lg: 5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl relative border border-[#1e2f25]">
          <GlassCupStack
            cupSize={cupSize}
            onSelectSize={setCupSize}
            baseBrewName={currBase.name.split(' (')[0]}
            baseBrewColor={currBase.color}
            dosage={dosage}
            milkName={currMilk.name.split(' ')[0]}
            milkColor={currMilk.color}
            coldFoamName={currFoam.name}
            coldFoamColor={currFoam.color}
            syrupName={brownSugarPumps > 0 ? 'BROWN SUGAR' : ''}
            hasCaramelDrizzle={hasCrosshatch}
            iceType={iceLevel}
            kcal={totalKcal}
            caffeine={totalCaffeine}
            sweetness={totalSweetness}
            tempCelsius={chillTemp}
            isVegan={currMilk.vegan}
            isDairyFree={currMilk.dairyFree}
          />
        </div>

        {/* Right Column: Formulation Matrix (lg: 7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Step Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'base', label: '01 Base Brew' },
              { id: 'milk', label: '02 Milk Alchemy' },
              { id: 'foam', label: '03 Cold Foam' },
              { id: 'syrup', label: '04 Syrups & Drizzle' },
              { id: 'ice', label: '05 Ice & Temp' },
            ].map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStepTab(step.id as any)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all ${
                  activeStepTab === step.id
                    ? 'bg-[#00df82] text-black shadow-[0_0_15px_rgba(0,223,130,0.3)]'
                    : 'bg-[#101b15] text-[#7d998a] hover:text-white border border-[#1e3025]'
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>

          {/* 01 / Foundation Brew */}
          <div className="glass-panel p-5 rounded-2xl border border-[#1e2f25]">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-white font-display">01 / Foundation Brew</h3>
                <p className="text-xs text-[#7e998b]">Select the core kinetic extraction source.</p>
              </div>
              <span className="text-[10px] font-bold font-mono-code px-2 py-0.5 rounded bg-[#16271e] text-[#00df82] border border-[#00df82]/30">
                REQUIRED STEP
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {baseOptions.map((opt) => {
                const isSelected = selectedBase === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedBase(opt.id)}
                    className={`p-3.5 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-[#15251c] border-[#00df82] shadow-[0_0_15px_rgba(0,223,130,0.2)]'
                        : 'bg-[#0d1612] border-[#1d2d24] hover:border-[#2f4a3b]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#00df82] bg-[#00df82]' : 'border-[#385544]'
                        }`}>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                        </div>
                        <span className="text-xs font-bold text-white">{opt.name}</span>
                      </div>
                      <span className="text-[11px] font-mono-code text-[#00df82] font-semibold">{opt.label}</span>
                    </div>
                    <p className="text-[11px] text-[#7d998b] mt-1.5 leading-normal">{opt.desc}</p>
                    <div className="text-[10px] font-mono-code text-[#5e7c6d] mt-2">
                      {opt.kcal} kcal • {opt.caffeine}mg Caffeine
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Extraction Dosage */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#1d2d24]">
              <div>
                <div className="text-xs font-bold text-white">Extraction Dosage</div>
                <div className="text-[11px] text-[#7e998b]">Ristretto pull for denser crema profile</div>
              </div>
              <div className="flex items-center gap-3 bg-[#0d1612] px-3 py-1.5 rounded-full border border-[#1e3025]">
                <button
                  onClick={() => setDosage(Math.max(1, dosage - 1))}
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[#8ca497] hover:text-white"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold font-mono-code text-[#00df82] w-3 text-center">{dosage}</span>
                <button
                  onClick={() => setDosage(Math.min(5, dosage + 1))}
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[#8ca497] hover:text-white"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* 02 / Milk Matrix & Emulsion */}
          <div className="glass-panel p-5 rounded-2xl border border-[#1e2f25]">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-white font-display">02 / Milk Matrix & Emulsion</h3>
                <p className="text-xs text-[#7e998b]">Creamy suspension medium calibrated for cold solubility.</p>
              </div>
              <span className="text-[10px] font-bold font-mono-code px-2 py-0.5 rounded bg-[#102419] text-[#00df82] border border-[#00df82]/30">
                Zero Dairy Default
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {milkOptions.map((opt) => {
                const isSelected = selectedMilk === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedMilk(opt.id)}
                    className={`p-3.5 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-[#15251c] border-[#00df82] shadow-[0_0_15px_rgba(0,223,130,0.2)]'
                        : 'bg-[#0d1612] border-[#1d2d24] hover:border-[#2f4a3b]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#00df82] bg-[#00df82]' : 'border-[#385544]'
                        }`}>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                        </div>
                        <span className="text-xs font-bold text-white">{opt.name}</span>
                      </div>
                      <span className="text-[11px] font-mono-code text-[#00df82] font-semibold">{opt.label}</span>
                    </div>
                    <p className="text-[11px] text-[#7d998b] mt-1.5 leading-normal">{opt.desc}</p>
                    <div className="text-[10px] font-mono-code text-[#5e7c6d] mt-2">
                      {opt.kcal} kcal • {opt.co2}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 03 / Cold Foam Alchemy */}
          <div className="glass-panel p-5 rounded-2xl border border-[#1e2f25]">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-white font-display">03 / Cold Foam Alchemy</h3>
                <p className="text-xs text-[#7e998b]">Micro-whipped floating clouds infused with botanical oils.</p>
              </div>
              <span className="text-[10px] font-bold font-mono-code px-2 py-0.5 rounded bg-[#102419] text-[#00df82] border border-[#00df82]/30">
                Aerated Top Layer
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {foamOptions.map((opt) => {
                const isSelected = selectedFoam === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedFoam(opt.id)}
                    className={`p-3.5 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-[#15251c] border-[#00df82] shadow-[0_0_15px_rgba(0,223,130,0.2)]'
                        : 'bg-[#0d1612] border-[#1d2d24] hover:border-[#2f4a3b]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#00df82] bg-[#00df82]' : 'border-[#385544]'
                        }`}>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                        </div>
                        <span className="text-xs font-bold text-white">{opt.name}</span>
                      </div>
                      <span className="text-[11px] font-mono-code text-[#00df82] font-semibold">{opt.label}</span>
                    </div>
                    <p className="text-[11px] text-[#7d998b] mt-1.5 leading-normal">{opt.desc}</p>
                    <div className="text-[10px] font-mono-code text-[#5e7c6d] mt-2">
                      {opt.kcal} kcal • {opt.tag}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 04 / Syrups & Drizzle Drops */}
          <div className="glass-panel p-5 rounded-2xl border border-[#1e2f25]">
            <div className="mb-3">
              <h3 className="text-base font-bold text-white font-display">04 / Syrups & Drizzle Drops</h3>
              <p className="text-xs text-[#7e998b]">Calibrate precise sweetness pumps & inner cup wall art.</p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Brown Sugar */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0d1612] border border-[#1d2d24]">
                <div>
                  <div className="text-xs font-bold text-white">Brown Sugar Syrup</div>
                  <div className="text-[11px] text-[#7d998b]">Warm molasses, cinnamon undertones</div>
                </div>
                <div className="flex items-center gap-3 bg-[#131f18] px-3 py-1 rounded-full border border-[#1e3025]">
                  <button
                    onClick={() => setBrownSugarPumps(Math.max(0, brownSugarPumps - 1))}
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[#8ca497] hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold font-mono-code text-[#00df82] w-3 text-center">
                    {brownSugarPumps}
                  </span>
                  <button
                    onClick={() => setBrownSugarPumps(Math.min(6, brownSugarPumps + 1))}
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[#8ca497] hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Madagascar Vanilla */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0d1612] border border-[#1d2d24]">
                <div>
                  <div className="text-xs font-bold text-white">Madagascar Vanilla</div>
                  <div className="text-[11px] text-[#7d998b]">Pure vanilla bean extract</div>
                </div>
                <div className="flex items-center gap-3 bg-[#131f18] px-3 py-1 rounded-full border border-[#1e3025]">
                  <button
                    onClick={() => setVanillaPumps(Math.max(0, vanillaPumps - 1))}
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[#8ca497] hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold font-mono-code text-[#00df82] w-3 text-center">
                    {vanillaPumps}
                  </span>
                  <button
                    onClick={() => setVanillaPumps(Math.min(6, vanillaPumps + 1))}
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[#8ca497] hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Caramel Crosshatch */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0d1612] border border-[#1d2d24]">
                <div>
                  <div className="text-xs font-bold text-white">Dark Caramel Cup-Wall Crosshatch</div>
                  <div className="text-[11px] text-[#7d998b]">Hand-lined buttery burnt sugar ribbon</div>
                </div>
                <button
                  onClick={() => setHasCrosshatch(!hasCrosshatch)}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    hasCrosshatch ? 'bg-[#00df82]' : 'bg-[#1b2b22]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-black transition-transform ${
                      hasCrosshatch ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 05 / Thermal & Ice Matrix */}
          <div className="glass-panel p-5 rounded-2xl border border-[#1e2f25]">
            <div className="mb-3">
              <h3 className="text-base font-bold text-white font-display">05 / Thermal & Ice Matrix</h3>
              <p className="text-xs text-[#7e998b]">Control thermal decay and liquid-to-solid ratio.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setIceLevel('crushed')}
                className={`p-3.5 rounded-xl text-left transition-all border flex flex-col justify-between h-24 ${
                  iceLevel === 'crushed'
                    ? 'bg-[#15251c] border-[#00df82] shadow-[0_0_15px_rgba(0,223,130,0.2)]'
                    : 'bg-[#0d1612] border-[#1d2d24] hover:border-[#2f4a3b]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Grid className="w-4 h-4 text-[#00df82]" />
                  {iceLevel === 'crushed' && (
                    <span className="text-[9px] font-mono-code font-bold bg-[#00df82] text-black px-1.5 py-0.5 rounded">
                      Active
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold text-white leading-tight">Extra Crushed Sonic-Style</span>
              </button>

              <button
                onClick={() => setIceLevel('light')}
                className={`p-3.5 rounded-xl text-left transition-all border flex flex-col justify-between h-24 ${
                  iceLevel === 'light'
                    ? 'bg-[#15251c] border-[#00df82] shadow-[0_0_15px_rgba(0,223,130,0.2)]'
                    : 'bg-[#0d1612] border-[#1d2d24] hover:border-[#2f4a3b]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Snowflake className="w-4 h-4 text-[#49c5b6]" />
                  {iceLevel === 'light' && (
                    <span className="text-[9px] font-mono-code font-bold bg-[#00df82] text-black px-1.5 py-0.5 rounded">
                      Active
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold text-white leading-tight">Light Solid Cubes</span>
              </button>

              <button
                onClick={() => setIceLevel('none')}
                className={`p-3.5 rounded-xl text-left transition-all border flex flex-col justify-between h-24 ${
                  iceLevel === 'none'
                    ? 'bg-[#15251c] border-[#00df82] shadow-[0_0_15px_rgba(0,223,130,0.2)]'
                    : 'bg-[#0d1612] border-[#1d2d24] hover:border-[#2f4a3b]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Waves className="w-4 h-4 text-[#8ba295]" />
                  {iceLevel === 'none' && (
                    <span className="text-[9px] font-mono-code font-bold bg-[#00df82] text-black px-1.5 py-0.5 rounded">
                      Active
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold text-white leading-tight">Zero Ice (Pure Yield)</span>
              </button>
            </div>
          </div>

          {/* Bottom Calculated Ticket & Deploy to Bag */}
          <div className="glass-panel p-5 rounded-2xl border border-[#00df82]/30 bg-gradient-to-r from-[#0d1c14] to-[#12241a] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono-code text-[#739282] uppercase tracking-wider">
                CALCULATED TICKET
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-display text-white">
                  ${totalPrice.toFixed(2)}
                </span>
                <span className="text-xs font-mono-code text-[#00df82] font-semibold">
                  +{starPoints} Star Points Earned
                </span>
              </div>
            </div>

            <button
              onClick={handleDeployToBag}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#00df82] hover:bg-[#00c774] text-black font-extrabold text-sm transition-all shadow-[0_0_25px_rgba(0,223,130,0.4)] active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 fill-black" />
              <span>Deploy to Bag</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trending Remixes: Community Lab Formulas Today */}
      <div className="mt-14 pt-8 border-t border-[#1a2b22]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#00df82] font-mono-code">
              TRENDING REMIXES
            </div>
            <h2 className="text-xl font-bold font-display text-white">Community Lab Formulas Today</h2>
          </div>
          <button
            onClick={() => onShowToast('Browsing 1,420 Community Lab Formulations')}
            className="flex items-center gap-1 text-xs font-semibold text-[#8ba295] hover:text-[#00df82] transition-colors"
          >
            <span>Explore All 1,420 Drops</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="glass-panel p-4 rounded-xl border border-[#1e2f25] hover:border-[#00df82]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="px-2 py-0.5 rounded-full bg-[#102419] text-[#00df82] text-[10px] font-mono-code font-bold">
                  #1 Trending Seattle
                </span>
                <span className="text-[#8ba295] text-[11px]">★ 4.9 (840)</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Midnight Matcha Eclipse</h4>
              <p className="text-xs text-[#7e998b] leading-relaxed">
                Ceremonial Matcha layer over double shot cold-pressed espresso with Pistachio cloud foam.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#1d2d24]">
              <span className="text-sm font-bold text-white">$8.20</span>
              <button
                onClick={() =>
                  handleLoadPreset({
                    base: 'matcha',
                    dosage: 2,
                    milk: 'oatly',
                    foam: 'sugar_free_oat',
                    brownSugar: 1,
                    vanilla: 1,
                    crosshatch: false,
                    ice: 'crushed',
                    name: 'Midnight Matcha Eclipse',
                  })
                }
                className="flex items-center gap-1 text-xs font-semibold text-[#00df82] hover:underline"
              >
                <span>Load Preset</span>
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-4 rounded-xl border border-[#1e2f25] hover:border-[#00df82]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="px-2 py-0.5 rounded-full bg-[#102419] text-[#00df82] text-[10px] font-mono-code font-bold">
                  Barista Pick
                </span>
                <span className="text-[#8ba295] text-[11px]">★ 4.8 (620)</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Kyoto Fog Velvet Cold</h4>
              <p className="text-xs text-[#7e998b] leading-relaxed">
                Nitro Cold Brew base, 3 pumps Madagascar Vanilla, topped with Lavender Sweet Cloud.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#1d2d24]">
              <span className="text-sm font-bold text-white">$7.65</span>
              <button
                onClick={() =>
                  handleLoadPreset({
                    base: 'nitro',
                    dosage: 3,
                    milk: 'oatly',
                    foam: 'lavender',
                    brownSugar: 0,
                    vanilla: 3,
                    crosshatch: false,
                    ice: 'light',
                    name: 'Kyoto Fog Velvet Cold',
                  })
                }
                className="flex items-center gap-1 text-xs font-semibold text-[#00df82] hover:underline"
              >
                <span>Load Preset</span>
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-4 rounded-xl border border-[#1e2f25] hover:border-[#00df82]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="px-2 py-0.5 rounded-full bg-[#102419] text-[#00df82] text-[10px] font-mono-code font-bold">
                  Low Calorie
                </span>
                <span className="text-[#8ba295] text-[11px]">★ 4.7 (412)</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Golden Oat Minimalist</h4>
              <p className="text-xs text-[#7e998b] leading-relaxed">
                Blonde Espresso Quad, Barista Oatly standard, dash of cinnamon powder, zero syrup.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#1d2d24]">
              <span className="text-sm font-bold text-white">$6.45</span>
              <button
                onClick={() =>
                  handleLoadPreset({
                    base: 'blonde',
                    dosage: 4,
                    milk: 'oatly',
                    foam: 'sugar_free_oat',
                    brownSugar: 0,
                    vanilla: 0,
                    crosshatch: false,
                    ice: 'crushed',
                    name: 'Golden Oat Minimalist',
                  })
                }
                className="flex items-center gap-1 text-xs font-semibold text-[#00df82] hover:underline"
              >
                <span>Load Preset</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
