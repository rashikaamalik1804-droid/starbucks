/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavTab, CartItem } from './types';
import { Header } from './components/Header';
import { BottomPlayerBar } from './components/BottomPlayerBar';
import { DrinkLabView } from './views/DrinkLabView';
import { ExploreFeedView } from './views/ExploreFeedView';
import { OrderTrackerView } from './views/OrderTrackerView';
import { ExclusiveDropsView } from './views/ExclusiveDropsView';
import { BagDrawer } from './components/BagDrawer';
import { SearchModal } from './components/SearchModal';
import { BarcodeModal } from './components/BarcodeModal';
import { RaffleModal } from './components/RaffleModal';
import { DownloadModal } from './components/DownloadModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('lab');
  const [stars, setStars] = useState(480);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBarcodeOpen, setIsBarcodeOpen] = useState(false);
  const [isRaffleOpen, setIsRaffleOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  // Cart state initialized with the 2 signature items shown in the designs
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'init-1',
      name: 'Venti Strawberry Matcha Cloud',
      subtitle: 'Oat Milk • Extra Cold Foam • 2 Pumps Vanilla',
      price: 7.85,
      stars: 48,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 'init-2',
      name: 'Warmed Almond Croissant',
      subtitle: 'Warmed Crisp • Butter Flake',
      price: 4.45,
      stars: 20,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=150&auto=format&fit=crop&q=80',
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQ = i.quantity + delta;
            return newQ > 0 ? { ...i, quantity: newQ } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    showToast('Item removed from order bag.');
  };

  const handleCheckout = () => {
    setIsBagOpen(false);
    setActiveTab('tracker');
    showToast('🚀 Order transmitted to Pike Place Bar 2! Status: In the Shaker!');
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  return (
    <div className="min-h-screen bg-[#080d0b] text-[#e2e8e5] flex flex-col font-sans selection:bg-[#00df82]/30 selection:text-[#00df82]">
      {/* Top Persistent Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cartCount={totalCartCount}
        cartTotal={totalCartPrice}
        onOpenCart={() => setIsBagOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenDownload={() => setIsDownloadOpen(true)}
        stars={stars}
      />

      {/* Screen Views */}
      <main className="flex-1">
        {activeTab === 'lab' && (
          <DrinkLabView
            onAddToCart={handleAddToCart}
            onOpenTracker={() => setActiveTab('tracker')}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'feed' && (
          <ExploreFeedView
            onNavigate={setActiveTab}
            onAddToCart={handleAddToCart}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'tracker' && (
          <OrderTrackerView
            onShowBarcode={() => setIsBarcodeOpen(true)}
            onShowToast={showToast}
            onReorder={() => {
              showToast('Reordered signature items! Routing to Bar 2.');
            }}
          />
        )}

        {activeTab === 'drops' && (
          <ExclusiveDropsView
            onOpenRaffle={() => setIsRaffleOpen(true)}
            onAddToCart={handleAddToCart}
            onShowToast={showToast}
            stars={stars}
            onUpdateStars={setStars}
          />
        )}
      </main>

      {/* Persistent Bottom Bar */}
      <BottomPlayerBar
        onQuickReorder={() => {
          setActiveTab('tracker');
          showToast('Triggered 1-Click Reorder for your morning ritual.');
        }}
        onShare={() => {
          showToast('Shareable formula link copied to clipboard!');
        }}
      />

      {/* Modals & Drawers */}
      <BagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        stars={stars}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={setActiveTab}
        onAddToCart={handleAddToCart}
      />

      <BarcodeModal
        isOpen={isBarcodeOpen}
        onClose={() => setIsBarcodeOpen(false)}
      />

      <RaffleModal
        isOpen={isRaffleOpen}
        onClose={() => setIsRaffleOpen(false)}
        onShowToast={showToast}
      />

      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        onShowToast={showToast}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 px-4 py-3 rounded-2xl bg-[#0e1a14] border border-[#00df82]/50 text-white text-xs font-semibold shadow-[0_0_25px_rgba(0,223,130,0.3)] animate-in fade-in slide-in-from-top duration-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00df82] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
