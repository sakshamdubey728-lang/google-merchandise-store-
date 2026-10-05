import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, BarChart3, X, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cartCount,
    wishlist,
    setIsCartDrawerOpen,
    setIsSearchOpen,
    setIsWishlistOpen,
    setIsAnalyticsOpen,
    setSelectedCategory,
    setSelectedCollection
  } = useStore();

  const [showBanner, setShowBanner] = useState(true);

  const handleNavClick = (view: 'home' | 'shop' | 'drop-campaign', category?: string, collection?: string) => {
    setActiveView(view);
    if (category) {
      setSelectedCategory(category as any);
      setSelectedCollection('All');
    } else if (collection) {
      setSelectedCollection(collection as any);
      setSelectedCategory('All');
    } else {
      setSelectedCategory('All');
      setSelectedCollection('All');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Slim Top Conversion & Scarcity Banner */}
      {showBanner && (
        <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 flex items-center justify-between transition-all">
          <div className="flex-1 flex items-center justify-center gap-2 text-center truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse"></span>
            <span className="font-medium text-white truncate">
              Suit Up for 39 Drop Live · 37/39 Claimed · Free shipping over $75 with Google Pay
            </span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            aria-label="Dismiss banner"
            className="text-stone-400 hover:text-white ml-2 p-0.5 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Top Bar: Strict 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Zone 1: Single Text Element Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left font-display font-bold text-xl tracking-tight text-stone-950 flex items-center gap-1.5 focus:outline-none"
        >
          <span className="text-blue-600">G</span>
          <span className="text-red-500">o</span>
          <span className="text-amber-500">o</span>
          <span className="text-blue-600">g</span>
          <span className="text-emerald-500">l</span>
          <span className="text-red-500">e</span>
          <span className="text-stone-900 font-semibold tracking-tight ml-1">Merch</span>
        </button>

        {/* Zone 2: 4-6 Clean Nav Links (Single-line, subtle underlines) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => handleNavClick('shop')}
            className={`transition-colors hover:text-stone-950 pb-0.5 whitespace-nowrap ${
              activeView === 'shop' ? 'text-stone-950 border-b-2 border-stone-950 font-semibold' : ''
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => handleNavClick('shop', 'Apparel')}
            className="transition-colors hover:text-stone-950 pb-0.5 whitespace-nowrap"
          >
            Apparel
          </button>
          <button
            onClick={() => handleNavClick('shop', 'Drinkware')}
            className="transition-colors hover:text-stone-950 pb-0.5 whitespace-nowrap"
          >
            Drinkware
          </button>
          <button
            onClick={() => handleNavClick('shop', undefined, '1998 Retro')}
            className="transition-colors hover:text-stone-950 pb-0.5 whitespace-nowrap text-amber-700 font-semibold"
          >
            1998 Retro
          </button>
          <button
            onClick={() => handleNavClick('drop-campaign')}
            className={`transition-colors hover:text-stone-950 pb-0.5 whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'drop-campaign' ? 'text-stone-950 border-b-2 border-stone-950 font-semibold' : 'text-stone-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-bounce" />
            <span>Suit Up for 39</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Search, Wishlist, Cart, Analytics Inspector) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* PRD Analytics & Conversion Inspector Button */}
          <button
            onClick={() => setIsAnalyticsOpen(true)}
            title="View PRD Mobile Conversion Analytics"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
          >
            <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden lg:inline">Conversion Radar</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search products"
            className="p-2 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            aria-label="Saved items"
            className="relative p-2 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Trigger with Tabular Count */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            aria-label="Open cart"
            className="relative flex items-center gap-2 px-3 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-stone-900"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-semibold tabular-nums">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
