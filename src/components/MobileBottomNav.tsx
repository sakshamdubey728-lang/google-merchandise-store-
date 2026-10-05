import React from 'react';
import { Home, Compass, Search, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MobileBottomNav: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cartCount,
    wishlist,
    setIsCartDrawerOpen,
    setIsSearchOpen,
    setIsWishlistOpen
  } = useStore();

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200 safe-bottom"
    >
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto px-1 items-center">
        {/* Home */}
        <button
          onClick={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 transition-colors min-h-[44px] ${
            activeView === 'home' ? 'text-blue-600' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px] font-medium mt-1">Home</span>
        </button>

        {/* Shop */}
        <button
          onClick={() => {
            setActiveView('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 transition-colors min-h-[44px] ${
            activeView === 'shop' ? 'text-blue-600' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[11px] font-medium mt-1">Shop</span>
        </button>

        {/* Search */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center justify-center py-1 text-stone-500 hover:text-stone-900 transition-colors min-h-[44px]"
        >
          <Search className="w-5 h-5" />
          <span className="text-[11px] font-medium mt-1">Search</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 text-stone-500 hover:text-stone-900 transition-colors min-h-[44px]"
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium mt-1">Wishlist</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 text-stone-500 hover:text-stone-900 transition-colors min-h-[44px]"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-stone-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium mt-1">Cart</span>
        </button>
      </div>
    </nav>
  );
};
