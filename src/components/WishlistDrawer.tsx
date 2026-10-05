import React from 'react';
import { X, Trash2, ShoppingBag, Heart, BellRing, Bell, TrendingDown, Zap, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    selectProduct,
    hasPriceAlert,
    getPriceAlert,
    setPriceDropModalProduct,
    simulatePriceDrop
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleMoveToCart = (prod: any) => {
    addToCart(prod);
    toggleWishlist(prod.id);
  };

  const handleOpenAlertModal = (prod: any) => {
    setPriceDropModalProduct(prod);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <h2 className="font-display text-lg font-bold text-stone-950">Saved Wishlist</h2>
              <span className="text-xs bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full font-bold font-mono">
                {wishlist.length}
              </span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-900"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-stone-900 text-base">Your wishlist is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Tap the heart icon on any Google merchandise item to save it here and subscribe to automatic price-drop alerts.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-2 px-5 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-xl"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              wishlistProducts.map(prod => {
                const alertConfig = getPriceAlert(prod.id);

                return (
                  <div
                    key={prod.id}
                    className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/90 relative space-y-3"
                  >
                    <div className="flex gap-3.5">
                      <div
                        onClick={() => {
                          selectProduct(prod);
                          setIsWishlistOpen(false);
                        }}
                        className="w-20 h-20 bg-white rounded-xl overflow-hidden shrink-0 border border-stone-200 cursor-pointer"
                      >
                        <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4
                            onClick={() => {
                              selectProduct(prod);
                              setIsWishlistOpen(false);
                            }}
                            className="font-semibold text-xs sm:text-sm text-stone-900 line-clamp-1 cursor-pointer hover:text-blue-600"
                          >
                            {prod.name}
                          </h4>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="font-mono font-bold text-sm text-stone-900 tabular-nums">
                              ${prod.price.toFixed(2)}
                            </span>
                            {prod.originalPrice && (
                              <span className="text-xs text-stone-400 line-through font-mono">
                                ${prod.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => handleMoveToCart(prod)}
                            className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Move to Bag</span>
                          </button>

                          <button
                            onClick={() => toggleWishlist(prod.id)}
                            className="p-1.5 text-stone-400 hover:text-red-500 rounded-lg"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price-Drop Alert Status & Trigger Strip */}
                    <div className="pt-2.5 border-t border-stone-200/70 flex flex-col gap-2">
                      {alertConfig ? (
                        <div className="p-2 rounded-xl bg-blue-50/80 border border-blue-200/80 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <BellRing className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <div className="truncate">
                              <span className="font-semibold text-blue-900 block truncate">
                                Alert active: notify at ≤ ${alertConfig.targetPrice.toFixed(2)}
                              </span>
                              <span className="text-[10px] text-blue-700 truncate block">
                                To: {alertConfig.userEmail}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 ml-2">
                            <button
                              onClick={() => handleOpenAlertModal(prod)}
                              className="text-[11px] font-semibold text-blue-700 hover:underline"
                            >
                              Edit
                            </button>
                            <span className="text-stone-300">·</span>
                            <button
                              onClick={() => simulatePriceDrop(prod.id, 20)}
                              title="Simulate 20% price drop to test notification"
                              className="text-[10px] font-mono bg-blue-600 text-white px-1.5 py-0.5 rounded flex items-center gap-0.5 hover:bg-blue-700"
                            >
                              <Zap className="w-2.5 h-2.5" />
                              <span>Test Drop</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-xs">
                          <button
                            onClick={() => handleOpenAlertModal(prod)}
                            className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 font-medium py-1 px-2 rounded-lg hover:bg-stone-100 transition-colors"
                          >
                            <Bell className="w-3.5 h-3.5 text-stone-500" />
                            <span>Notify me if price drops</span>
                          </button>

                          <button
                            onClick={() => handleOpenAlertModal(prod)}
                            className="text-[11px] text-blue-600 font-semibold hover:underline"
                          >
                            Set alert →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with Notification Guarantee */}
          <div className="p-5 border-t border-stone-200 bg-stone-50 text-xs text-stone-500 flex items-center gap-2.5">
            <BellRing className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              Price-drop alerts trigger instant email delivery when merchandise enters seasonal markdown or flash promotion.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

