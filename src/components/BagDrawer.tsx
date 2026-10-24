import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Sparkles, Star } from 'lucide-react';
import { CartItem } from '../types';
import confetti from 'canvas-confetti';

interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  stars: number;
}

export const BagDrawer: React.FC<BagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
  stars,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalStars = items.reduce((sum, item) => sum + item.stars * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-md h-full bg-[#0a120e] border-l border-[#1e2f25] flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#1b2b21] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#00df82]" />
            <h3 className="text-base font-bold text-white font-display">Your Order Bag</h3>
            <span className="text-xs font-mono-code px-2 py-0.5 rounded bg-[#132219] text-[#00df82] border border-[#00df82]/30">
              {items.length} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#708c7c] hover:text-white hover:bg-[#16251d] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 text-[#708c7c]">
              <ShoppingBag className="w-12 h-12 mx-auto stroke-1 mb-2 opacity-50" />
              <p className="text-sm">Your order bag is currently empty.</p>
              <p className="text-xs mt-1">Architect a formula in the Drink Lab or pick from SipTok drops!</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-[#0e1713] border border-[#1c2c22] flex flex-col gap-2.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover border border-[#21352a]"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-[#14231b] border border-[#00df82]/30 flex items-center justify-center text-[#00df82]">
                        ☕
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.name}</h4>
                      <p className="text-[10px] text-[#7e998b] leading-tight mt-0.5">{item.subtitle}</p>
                      {item.customization && (
                        <div className="text-[9px] font-mono-code text-[#00df82] mt-1 line-clamp-1">
                          {item.customization.join(' • ')}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold font-mono-code text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <div className="text-[10px] font-mono-code text-[#00df82]">
                      +{item.stars * item.quantity} ★
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#17251d]">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-[#759182] hover:text-red-400 text-xs flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>

                  <div className="flex items-center gap-2 bg-[#14221a] px-2.5 py-1 rounded-full border border-[#1f3126]">
                    <button
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="w-4 h-4 flex items-center justify-center text-[#8ca497] hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold font-mono-code text-[#00df82] w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="w-4 h-4 flex items-center justify-center text-[#8ca497] hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#1b2b21] bg-[#0c1511] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#8ca497]">
              <span>Pickup Spot</span>
              <span className="text-white font-semibold">Pike Place Reserve (Shelf B-3)</span>
            </div>

            <div className="flex items-center justify-between text-xs text-[#8ca497]">
              <span>Star Points Earned</span>
              <span className="text-[#00df82] font-mono-code font-bold">+{totalStars} Stars</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#18261e]">
              <span className="text-sm font-bold text-white font-display">Subtotal</span>
              <span className="text-xl font-extrabold font-mono-code text-[#00df82]">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => {
                confetti({
                  particleCount: 80,
                  spread: 70,
                  origin: { y: 0.6 },
                  colors: ['#00df82', '#ffffff', '#ffd700'],
                });
                onCheckout();
              }}
              className="w-full py-3.5 rounded-xl bg-[#00df82] hover:bg-[#00c774] text-black font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,223,130,0.4)] cursor-pointer"
            >
              <span>Transmit Order to Bar 2 • ${subtotal.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
