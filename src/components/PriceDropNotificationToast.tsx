import React, { useState } from 'react';
import { X, BellRing, Sparkles, Zap, ArrowRight, Mail, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PriceDropNotificationToast: React.FC = () => {
  const {
    activePriceDropNotification,
    dismissPriceDropNotification,
    addToCart,
    setIsGooglePayModalOpen,
    selectProduct
  } = useStore();

  const [showEmailPreview, setShowEmailPreview] = useState(false);

  if (!activePriceDropNotification) return null;

  const { product, oldPrice, newPrice, discountPercentage, email } = activePriceDropNotification;
  const savings = (oldPrice - newPrice).toFixed(2);

  const handleInstantBuy = () => {
    addToCart(product, undefined, undefined, 1);
    dismissPriceDropNotification();
    setIsGooglePayModalOpen(true);
  };

  const handleViewProduct = () => {
    selectProduct(product);
    dismissPriceDropNotification();
  };

  return (
    <div className="fixed top-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:w-[420px] z-50 animate-in slide-in-from-top-4 duration-300">
      <div className="bg-stone-950 text-white rounded-2xl shadow-2xl border border-amber-500/40 p-4 space-y-3 relative overflow-hidden">
        
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <BellRing className="w-3.5 h-3.5" />
              <span>Price-Drop Alert Triggered!</span>
            </span>
          </div>

          <button
            onClick={dismissPriceDropNotification}
            className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Alert Details */}
        <div className="flex items-start gap-3">
          <div
            onClick={handleViewProduct}
            className="w-14 h-14 rounded-xl bg-stone-900 border border-stone-800 overflow-hidden shrink-0 cursor-pointer"
          >
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 min-w-0">
            <h4
              onClick={handleViewProduct}
              className="font-bold text-xs text-white line-clamp-1 cursor-pointer hover:text-blue-400 transition-colors"
            >
              {product.name}
            </h4>
            <p className="text-[11px] text-stone-400 mt-0.5">
              Notification sent to <strong className="text-stone-200">{email}</strong>
            </p>

            <div className="flex items-baseline gap-2 mt-1.5 font-mono">
              <span className="text-stone-400 line-through text-xs tabular-nums">${oldPrice.toFixed(2)}</span>
              <span className="text-sm font-bold text-amber-400 tabular-nums">${newPrice.toFixed(2)}</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-1.5 py-0.2 rounded">
                Save ${savings} ({discountPercentage}% OFF)
              </span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleInstantBuy}
            className="py-2.5 px-3 bg-white hover:bg-stone-100 text-stone-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
            <span>Buy with GPay</span>
          </button>

          <button
            onClick={() => setShowEmailPreview(!showEmailPreview)}
            className="py-2.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 border border-stone-700 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-stone-400" />
            <span>{showEmailPreview ? 'Hide Email' : 'Preview Email'}</span>
          </button>
        </div>

        {/* Simulated Email Notification View */}
        {showEmailPreview && (
          <div className="mt-3 p-3.5 bg-stone-900 rounded-xl border border-stone-800 text-xs text-stone-300 space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-[11px]">
              <span className="text-stone-400">From: <strong>alerts@shop.merch.google</strong></span>
              <span className="text-emerald-400 font-mono">Sent Just Now</span>
            </div>
            <p className="font-semibold text-white">
              Good news, Alex! An item on your wishlist just dropped in price.
            </p>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              &quot;{product.name}&quot; has dropped by <strong>${savings}</strong> to <strong>${newPrice.toFixed(2)}</strong>. Quantities may be limited.
            </p>
            <div className="pt-1">
              <button
                onClick={handleInstantBuy}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1"
              >
                <span>Claim Deal at New Price</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
