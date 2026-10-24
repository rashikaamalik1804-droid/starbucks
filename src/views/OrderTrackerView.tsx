import React, { useState, useEffect } from 'react';
import {
  Wifi,
  QrCode,
  RotateCw,
  Check,
  Lock,
  Sparkles,
  Users,
  Thermometer,
  Radio,
  Maximize2,
  FileEdit,
  Navigation,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OrderTrackerViewProps {
  onShowBarcode: () => void;
  onShowToast: (msg: string) => void;
  onReorder: () => void;
}

export const OrderTrackerView: React.FC<OrderTrackerViewProps> = ({
  onShowBarcode,
  onShowToast,
  onReorder,
}) => {
  const [pickupMode, setPickupMode] = useState<'counter' | 'curbside' | 'drivethru'>('counter');
  const [nfcCheckedIn, setNfcCheckedIn] = useState(false);
  const [tipSelected, setTipSelected] = useState<number | null>(null);
  const [highFiveSent, setHighFiveSent] = useState(false);
  const [progress, setProgress] = useState(72);

  // Simulate subtle real-time 60Hz progress creep
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 98 ? 72 : prev + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleNfcTap = () => {
    setNfcCheckedIn(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00df82', '#49c5b6', '#ffffff'],
    });
    onShowToast('NFC Beacon Verified! Barista Maya has been notified you are at Cubby Shelf B-3.');
  };

  const handleTip = (amount: number, stars: number) => {
    setTipSelected(amount);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#00df82', '#ffd700'],
    });
    onShowToast(`Tipped Barista Maya $${amount.toFixed(2)}! You earned +${stars} Bonus Stars.`);
  };

  const handleHighFive = () => {
    setHighFiveSent(true);
    confetti({ particleCount: 50, spread: 60 });
    onShowToast('🎉 Sent High-Five cheer to Maya on Bar 2!');
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-8 py-5 pb-28">
      {/* Sub-bar telemetry header */}
      <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-[#0c1611] border border-[#1b2c22] mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00df82] animate-ping" />
          <span className="font-mono-code font-bold text-[#00df82] text-[11px] tracking-wide">
            LIVE TELEMETRY • BARISTA COUNTER 02
          </span>
        </div>
        <div className="text-[#8ba295] font-mono-code text-[11px]">
          Ticket <span className="text-white font-bold">#SB-8921</span>
        </div>
      </div>

      {/* Giant Hero Headline */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black font-display tracking-tight text-white uppercase flex items-baseline gap-3 flex-wrap">
            <span>In the Shaker!</span>
            <span className="text-xl lg:text-2xl font-bold text-[#00df82] normal-case tracking-normal">
              Ready in ~3 mins (2:48 PM)
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleNfcTap}
            className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-xs transition-all shadow-[0_0_20px_rgba(0,223,130,0.3)] active:scale-95 ${
              nfcCheckedIn
                ? 'bg-[#102419] border border-[#00df82] text-[#00df82]'
                : 'bg-[#00df82] hover:bg-[#00c774] text-black'
            }`}
          >
            <Wifi className="w-4 h-4" />
            <span>{nfcCheckedIn ? "Checked In at Cubby ✓" : "I've Arrived (NFC Tap)"}</span>
          </button>

          <button
            onClick={onShowBarcode}
            className="p-3 rounded-full bg-[#111c16] hover:bg-[#192b21] border border-[#20362b] text-[#8ba295] hover:text-[#00df82] transition-colors"
            title="Show Ticket Barcode"
          >
            <QrCode className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Tracker Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Precision Sequence & Barista (lg: 7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Artisan Build Status Card */}
          <div className="glass-panel p-6 rounded-2xl border border-[#1e2f25]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-[#708c7c]">
                  PRECISION SEQUENCE
                </div>
                <h2 className="text-xl font-bold font-display text-white">Artisan Build Status</h2>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono-code text-[#00df82]">
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>Syncing 60Hz</span>
              </div>
            </div>

            {/* Live Vertical Stepper */}
            <div className="relative pl-6 space-y-7 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#00df82] before:via-[#00df82] before:to-[#1e2f25]">
              {/* Step 1: Order Received */}
              <div className="relative">
                <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-[#00df82] flex items-center justify-center text-black shadow-[0_0_10px_rgba(0,223,130,0.5)]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">Order Received & Queued</h4>
                  <span className="text-xs font-mono-code text-[#6b8577]">2:41 PM</span>
                </div>
                <p className="text-xs text-[#7e998b] mt-0.5">
                  Confirmed by Pike Place Cloud Terminal. Routing recipe parameters to Bar 2.
                </p>
              </div>

              {/* Step 2: Extraction */}
              <div className="relative">
                <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-[#00df82] flex items-center justify-center text-black shadow-[0_0_10px_rgba(0,223,130,0.5)]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">Blonde Espresso Extraction</h4>
                  <span className="text-xs font-mono-code text-[#6b8577]">2:43 PM</span>
                </div>
                <p className="text-xs text-[#7e998b] mt-0.5">
                  Mastrena II pulled dual ristretto shots at 9.2 bars pressure • 21.4 seconds extraction.
                </p>
              </div>

              {/* Step 3: Active Now (Crafting & Micro-Foam Cascade) */}
              <div className="relative p-4 rounded-xl bg-[#0f1f16] border border-[#00df82]/50 shadow-[0_0_20px_rgba(0,223,130,0.15)]">
                <div className="absolute -left-6 top-4 w-6 h-6 rounded-full bg-[#08130d] border-2 border-[#00df82] flex items-center justify-center shadow-[0_0_15px_#00df82]">
                  <span className="w-2 h-2 rounded-full bg-[#00df82] animate-ping" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">Crafting & Micro-Foam Cascade</span>
                  </div>
                  <span className="text-[10px] font-bold font-mono-code px-2 py-0.5 rounded bg-[#00df82] text-black">
                    ACTIVE NOW
                  </span>
                </div>
                <p className="text-xs text-[#8ca497] mt-1 leading-relaxed">
                  Barista Maya is aerating oat milk with ceremonial-grade Uji matcha and pouring cold foam cloud layer.
                </p>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-white font-semibold">Emulsifying Cold Cloud ({progress}%)</span>
                    <span className="text-[#00df82] font-mono-code font-bold">~45s remaining</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#15251c] overflow-hidden">
                    <div
                      style={{ width: `${progress}%` }}
                      className="h-full bg-gradient-to-r from-[#00df82] to-[#79ffd0] rounded-full transition-all duration-700 shadow-[0_0_10px_#00df82]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Ready at Shelf */}
              <div className="relative opacity-60">
                <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-[#121c17] border border-[#2b4134] flex items-center justify-center text-[#708c7c]">
                  <Lock className="w-3 h-3" />
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">Ready at Express Hub Shelf B-3</h4>
                  <span className="text-xs font-mono-code text-[#6b8577]">Est. 2:48 PM</span>
                </div>
                <p className="text-xs text-[#7e998b] mt-0.5">
                  Direct grab-and-go from heated/insulated cubby. Verified with contactless ticket ID.
                </p>
              </div>
            </div>
          </div>

          {/* Barista Profile Card */}
          <div className="glass-panel p-5 rounded-2xl border border-[#1e2f25] flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80"
                  alt="Maya Sterling"
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-[#00df82]"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#00df82] text-black rounded-full flex items-center justify-center text-[10px] font-bold">
                  ✓
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white font-display">Maya Sterling</h3>
                  <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded bg-[#102419] text-[#00df82] border border-[#00df82]/30">
                    Certified Coffee Master
                  </span>
                </div>
                <p className="text-xs text-[#7e998b] mt-0.5 max-w-sm">
                  3,420+ signature drinks poured • Speciality in nitrogen aeration & micro-foam artistry.
                </p>
              </div>
            </div>

            {/* Tipping & High Five Buttons */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <button
                onClick={() => handleTip(1.0, 25)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  tipSelected === 1.0
                    ? 'bg-[#00df82] text-black border-[#00df82]'
                    : 'bg-[#0d1612] hover:bg-[#15251c] text-white border-[#21352a]'
                }`}
              >
                Tip $1.00 <span className="text-[#00df82] font-mono-code text-[10px]">★ +25 pts</span>
              </button>
              <button
                onClick={() => handleTip(2.0, 50)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  tipSelected === 2.0
                    ? 'bg-[#00df82] text-black border-[#00df82]'
                    : 'bg-[#0d1612] hover:bg-[#15251c] text-white border-[#21352a]'
                }`}
              >
                Tip $2.00 <span className="text-[#00df82] font-mono-code text-[10px]">★ +50 pts</span>
              </button>
              <button
                onClick={handleHighFive}
                className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#14261d] hover:bg-[#1c3327] text-white border border-[#2b4436] transition-all flex items-center gap-1"
              >
                <span>{highFiveSent ? "High-Five Sent! 🙌" : "Send High-Five 🎉"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Store Location & Order Summary (lg: 5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Store Location Card */}
          <div className="glass-panel p-5 rounded-2xl border border-[#1e2f25]">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-white font-display">Pike Place Reserve Hub</h3>
                <p className="text-xs text-[#7e998b]">0.3 mi away • 1912 Pike St</p>
              </div>
              <button
                onClick={() => onShowToast('Navigating to Pike Place Reserve')}
                className="p-2 rounded-full bg-[#102419] text-[#00df82] hover:bg-[#163323] transition-colors"
              >
                <Navigation className="w-4 h-4" />
              </button>
            </div>

            {/* Pickup Mode Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#0c1611] rounded-xl border border-[#1c2c22] mb-4 text-center">
              <button
                onClick={() => setPickupMode('counter')}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  pickupMode === 'counter'
                    ? 'bg-[#00df82] text-black shadow-[0_0_10px_rgba(0,223,130,0.3)]'
                    : 'text-[#7e998b] hover:text-white'
                }`}
              >
                In-Store Counter
              </button>
              <button
                onClick={() => setPickupMode('curbside')}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  pickupMode === 'curbside'
                    ? 'bg-[#00df82] text-black shadow-[0_0_10px_rgba(0,223,130,0.3)]'
                    : 'text-[#7e998b] hover:text-white'
                }`}
              >
                Curbside #4
              </button>
              <button
                onClick={() => setPickupMode('drivethru')}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  pickupMode === 'drivethru'
                    ? 'bg-[#00df82] text-black shadow-[0_0_10px_rgba(0,223,130,0.3)]'
                    : 'text-[#7e998b] hover:text-white'
                }`}
              >
                Drive-Thru Lane
              </button>
            </div>

            {/* Interactive Map Visual with Cubby Shelf Spot */}
            <div className="relative rounded-xl overflow-hidden h-36 border border-[#1d2d24] mb-4">
              <div
                className="absolute inset-0 bg-cover bg-center filter brightness-90 contrast-110"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80)',
                }}
              />
              <div className="absolute inset-0 bg-[#091510]/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-[#00df82] text-white text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(0,223,130,0.4)]">
                  <span className="w-2 h-2 rounded-full bg-[#00df82] animate-ping" />
                  <span>Your Spot: Cubby Shelf B-3</span>
                </div>
              </div>
            </div>

            {/* Ambient telemetry indicators */}
            <div className="grid grid-cols-3 gap-2 text-center py-2 px-3 bg-[#0c1611] rounded-xl border border-[#1b2b21]">
              <div className="flex flex-col items-center">
                <Users className="w-3.5 h-3.5 text-[#00df82] mb-1" />
                <span className="text-sm font-bold text-white font-display">3</span>
                <span className="text-[10px] text-[#708c7c]">Ahead in queue</span>
              </div>
              <div className="flex flex-col items-center">
                <Thermometer className="w-3.5 h-3.5 text-[#49c5b6] mb-1" />
                <span className="text-sm font-bold text-white font-display">71°F</span>
                <span className="text-[10px] text-[#708c7c]">Cafe climate</span>
              </div>
              <div className="flex flex-col items-center">
                <Radio className="w-3.5 h-3.5 text-[#00df82] mb-1" />
                <span className="text-sm font-bold text-white font-display">78 bpm</span>
                <span className="text-[10px] text-[#708c7c]">Rain in Shibuya</span>
              </div>
            </div>
          </div>

          {/* Order Summary (2 Items) */}
          <div className="glass-panel p-5 rounded-2xl border border-[#1e2f25]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white font-display">Order Summary (2 Items)</h3>
              <span className="text-sm font-bold font-mono-code text-[#00df82]">Total: $12.30</span>
            </div>

            <div className="space-y-3">
              {/* Item 1 */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0c1611] border border-[#1b2a21]">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=150&auto=format&fit=crop&q=80"
                    alt="Venti Strawberry Matcha Cloud"
                    className="w-11 h-11 rounded-lg object-cover border border-[#21352a]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">Venti Strawberry Matcha Cloud</h4>
                    <p className="text-[10px] text-[#7e998b]">Oat Milk • Extra Cold Foam • 2 Pumps Vanilla</p>
                    <span className="text-[10px] font-mono-code text-[#00df82]">+48 Stars Earned</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-white font-mono-code">$7.85</span>
              </div>

              {/* Item 2 */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0c1611] border border-[#1b2a21]">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=150&auto=format&fit=crop&q=80"
                    alt="Warmed Almond Croissant"
                    className="w-11 h-11 rounded-lg object-cover border border-[#21352a]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">Warmed Almond Croissant</h4>
                    <p className="text-[10px] text-[#7e998b]">Warmed Crisp • Butter Flake</p>
                    <span className="text-[10px] font-mono-code text-[#00df82]">+20 Stars Earned</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-white font-mono-code">$4.45</span>
              </div>
            </div>

            {/* Express Counter Barcode preview */}
            <div
              onClick={onShowBarcode}
              className="mt-4 p-3 rounded-xl bg-[#09120e] border border-[#1f3127] flex items-center justify-between cursor-pointer hover:border-[#00df82]/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded p-1 flex items-center justify-center">
                  <QrCode className="w-8 h-8 text-black" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Express Counter Barcode</div>
                  <div className="text-[10px] text-[#7e998b]">Tap to max brightness</div>
                </div>
              </div>
              <button className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#14231b] text-xs font-semibold text-[#00df82]">
                <Maximize2 className="w-3 h-3" />
                <span>Expand</span>
              </button>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-[#1d2d24]">
              <button
                onClick={() => onShowToast('Notes updated for Barista Maya: "Extra Cold"')}
                className="py-2.5 rounded-xl bg-[#101b15] hover:bg-[#182820] text-xs font-semibold text-[#8ca497] hover:text-white border border-[#213529] flex items-center justify-center gap-1.5 transition-colors"
              >
                <FileEdit className="w-3.5 h-3.5 text-[#00df82]" />
                <span>Modify Notes</span>
              </button>
              <button
                onClick={onReorder}
                className="py-2.5 rounded-xl bg-[#00df82] hover:bg-[#00c774] text-xs font-bold text-black flex items-center justify-center gap-1.5 transition-all shadow-[0_0_12px_rgba(0,223,130,0.3)] active:scale-95"
              >
                <RotateCw className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>1-Click Reorder</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
