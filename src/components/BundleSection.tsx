import React, { useState } from 'react';
import { Plus, Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { RETRO_TUMBLER_BUNDLE } from '../data/products';

export const BundleSection: React.FC = () => {
  const { products, addBundleToCart, selectProduct } = useStore();
  const [bundleAdded, setBundleAdded] = useState(false);

  const retroHoodie = products.find(p => p.id === RETRO_TUMBLER_BUNDLE.primaryProductId);
  const spectraTumbler = products.find(p => p.id === RETRO_TUMBLER_BUNDLE.secondaryProductId);

  if (!retroHoodie || !spectraTumbler) return null;

  const handleAddBundle = () => {
    addBundleToCart(RETRO_TUMBLER_BUNDLE);
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2000);
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-stone-50 to-stone-100/60 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 tracking-wider uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Conversion Bundle · Save $14</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Complete the Retro Look
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Pair Google’s vintage 1998 heavy fleece hoodie with the double-walled Spectra Tumbler. Handpicked to elevate your desk setup while saving on your cart.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Eligible for Free 2-Day Shipping</span>
          </div>
        </div>

        {/* Interactive Bundle Card */}
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Products Visual Pairing */}
            <div className="lg:col-span-7 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              
              {/* Product 1: 1998 Retro Hoodie */}
              <div 
                onClick={() => selectProduct(retroHoodie)}
                className="w-full sm:w-1/2 group cursor-pointer bg-stone-50 rounded-xl p-3 border border-stone-200/80 hover:border-stone-300 transition-all"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-stone-100 mb-3 relative">
                  <img
                    src={retroHoodie.images[0]}
                    alt={retroHoodie.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-2 left-2 bg-stone-900/85 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    Hero Item
                  </span>
                </div>
                <p className="text-xs text-stone-500">{retroHoodie.collection}</p>
                <h4 className="font-semibold text-stone-900 text-sm line-clamp-1 group-hover:text-blue-600">
                  {retroHoodie.name}
                </h4>
                <p className="font-mono text-xs font-bold text-stone-900 mt-1 tabular-nums">
                  ${retroHoodie.price.toFixed(2)}
                </p>
              </div>

              {/* Plus Sign Divider */}
              <div className="shrink-0 w-8 h-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-600 font-bold">
                <Plus className="w-4 h-4" />
              </div>

              {/* Product 2: Spectra Tumbler */}
              <div 
                onClick={() => selectProduct(spectraTumbler)}
                className="w-full sm:w-1/2 group cursor-pointer bg-stone-50 rounded-xl p-3 border border-stone-200/80 hover:border-stone-300 transition-all"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-stone-100 mb-3 relative">
                  <img
                    src={spectraTumbler.images[0]}
                    alt={spectraTumbler.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-2 left-2 bg-blue-700/85 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    Cross-Sell Special
                  </span>
                </div>
                <p className="text-xs text-stone-500">{spectraTumbler.collection}</p>
                <h4 className="font-semibold text-stone-900 text-sm line-clamp-1 group-hover:text-blue-600">
                  {spectraTumbler.name}
                </h4>
                <p className="font-mono text-xs font-bold text-stone-900 mt-1 tabular-nums">
                  ${spectraTumbler.price.toFixed(2)}
                </p>
              </div>

            </div>

            {/* Bundle Pricing & One-Click Add */}
            <div className="lg:col-span-5 lg:pl-6 lg:border-l border-stone-200 flex flex-col justify-center space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl font-bold text-stone-950 font-mono tabular-nums">
                    ${RETRO_TUMBLER_BUNDLE.bundlePrice.toFixed(2)}
                  </span>
                  <span className="text-sm sm:text-base text-stone-400 line-through font-mono tabular-nums">
                    ${RETRO_TUMBLER_BUNDLE.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Save $14.00
                  </span>
                </div>
                <p className="text-xs text-stone-500">
                  Includes 1x 1998 Retro Hoodie (Size L) + 1x Spectra Tumbler (24oz)
                </p>
              </div>

              {/* One-Click Bundle CTA */}
              <button
                onClick={handleAddBundle}
                className="w-full py-3.5 px-6 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                {bundleAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Both Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <span>ADD BOTH TO CART</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-stone-400">
                You can easily customize sizes and colors in your cart drawer.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
