import React, { useState, useEffect } from 'react';
import { ArrowRight, Flame, ShieldCheck, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { HERO_IMAGE } from '../data/products';

export const HeroBanner: React.FC = () => {
  const { setActiveView, selectProduct, products, recordAnalyticsEvent } = useStore();

  // Scarcity countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleShopTheDrop = () => {
    recordAnalyticsEvent('hero_cta');
    const dropProduct = products.find(p => p.id === 'prod-suit-up-39');
    if (dropProduct) {
      selectProduct(dropProduct);
    } else {
      setActiveView('drop-campaign');
    }
  };

  const handleExploreCollection = () => {
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-stone-950 text-white">
      {/* Background Subtle Gradient Scrim */}
      <div className="absolute inset-0 bg-radial from-stone-900 via-stone-950 to-black opacity-90" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Campaign Copy & Conversion Triggers */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Scarcity Lead-In */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-amber-400">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>Limited Release Drop</span>
              <span className="text-stone-500">·</span>
              <span className="text-stone-300">Edition of 39</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-none text-balance">
                SUIT UP FOR 39.
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-stone-300">
                Only 39 will suit up. Will you?
              </p>
            </div>

            <p className="text-stone-400 text-sm sm:text-base max-w-xl leading-relaxed">
              Engineered from 480 GSM organic French terry cotton. Individually serialized with a laser-etched metal collector tag (#01 to #39). Built for the engineers and creators who push past the edge.
            </p>

            {/* Live Scarcity & Countdown Module */}
            <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 max-w-lg space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-stone-300 font-medium">
                  <Flame className="w-4 h-4 text-red-500" />
                  <span>Remaining Inventory</span>
                </div>
                <span className="font-mono text-emerald-400 font-semibold tabular-nums">
                  37 / 39 SOLD · ONLY 2 REMAIN
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-500 via-red-500 to-red-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(37 / 39) * 100}%` }}
                />
              </div>

              {/* Countdown metrics */}
              <div className="flex items-center justify-between pt-1 border-t border-stone-800/80 text-xs">
                <span className="text-stone-400">Drop Window Closes In:</span>
                <div className="flex items-center gap-2 font-mono tabular-nums text-white font-medium">
                  <span className="bg-stone-800 px-2 py-0.5 rounded text-stone-200">
                    {String(timeLeft.hours).padStart(2, '0')}h
                  </span>
                  <span>:</span>
                  <span className="bg-stone-800 px-2 py-0.5 rounded text-stone-200">
                    {String(timeLeft.minutes).padStart(2, '0')}m
                  </span>
                  <span>:</span>
                  <span className="bg-stone-800 px-2 py-0.5 rounded text-amber-400">
                    {String(timeLeft.seconds).padStart(2, '0')}s
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={handleShopTheDrop}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-950 bg-white hover:bg-stone-100 rounded-xl shadow-lg shadow-white/5 transition-all transform hover:-translate-y-0.5 focus:ring-2 focus:ring-white focus:outline-none"
              >
                <span>SHOP THE DROP</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleExploreCollection}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 border border-stone-700/80 rounded-xl transition-all"
              >
                <span>EXPLORE COLLECTION</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4 text-xs text-stone-400 pt-1">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Individually Numbered</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-blue-400" />
                <span>Instant Google Pay Checkout</span>
              </div>
            </div>

          </div>

          {/* Right Column: High Fidelity Product Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative group cursor-pointer" onClick={handleShopTheDrop}>
              {/* Product Visual Container */}
              <div className="aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl relative">
                <img
                  src={HERO_IMAGE}
                  alt="Suit Up for 39 Limited Edition Doomsday Hoodie"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Floating Serial Tag Badge */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-stone-700 text-stone-200 px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>COLLECTOR TAG #38/39</span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent p-5 pt-12 flex items-end justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-stone-400">Doomsday Edition</p>
                    <h2 className="text-lg font-bold text-white">480 GSM Heavyweight Hoodie</h2>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-400 line-through mr-1.5">$135</span>
                    <span className="text-lg font-bold text-white font-mono tabular-nums">$110</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
