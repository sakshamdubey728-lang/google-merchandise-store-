import React, { useState, useEffect } from 'react';
import {
  Flame,
  ShieldCheck,
  Zap,
  ArrowRight,
  Clock,
  Sparkles,
  Lock,
  Share2,
  Check
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { HERO_IMAGE } from '../data/products';
import { BundleSection } from './BundleSection';

export const LimitedDropPage: React.FC = () => {
  const { products, addToCart, setIsGooglePayModalOpen, setActiveView } = useStore();
  const [copiedShare, setCopiedShare] = useState(false);

  const dropProduct = products.find(p => p.id === 'prod-suit-up-39') || products[0];

  const [remainingTime, setRemainingTime] = useState({
    hours: 14,
    minutes: 41,
    seconds: 38
  });

  const [selectedSize, setSelectedSize] = useState('L');

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleBuyNowGooglePay = () => {
    addToCart(dropProduct, selectedSize, 'Obsidian Black', 1);
    setIsGooglePayModalOpen(true);
  };

  const handleShareDrop = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="bg-stone-950 text-white min-h-screen pb-20">
      
      {/* Campaign Hero Block */}
      <section className="relative overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Visual Showcase with Collector Badge */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 shadow-2xl relative">
              <img
                src={HERO_IMAGE}
                alt="Suit Up for 39 Doomsday Hoodie"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />

              {/* Numbered Tag Plaque */}
              <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-md border border-amber-500/40 px-3.5 py-2 rounded-xl flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-mono text-xs font-bold text-amber-300">
                  ALLOTTED UNIT #38 / 39
                </span>
              </div>

              {/* Live Remaining Badge */}
              <div className="absolute bottom-4 right-4 bg-stone-900/95 border border-stone-700 px-3.5 py-1.5 rounded-lg text-xs font-mono text-emerald-400">
                2 PIECES REMAINING
              </div>
            </div>
          </div>

          {/* Scarcity Purchase Block */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-amber-400 uppercase bg-amber-950/40 border border-amber-800/60 px-3 py-1.5 rounded-lg">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>STRICT LIMITED DROP · NEVER RESTOCKED</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                SUIT UP FOR 39
              </h1>
              <p className="text-xl text-stone-300 font-medium">
                Only 39 will suit up. Will you?
              </p>
            </div>

            <p className="text-stone-400 text-sm leading-relaxed">
              Designed as a testament to Google's most demanding engineering sprints. Finished in 480 GSM French Terry cotton with tonal stitchwork and individual metal serial badges. When the 39th unit is claimed, this mold is officially retired.
            </p>

            {/* Countdown & Remaining Meter */}
            <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400 font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-300" />
                  Drop Closes In
                </span>
                <span className="font-mono text-amber-400 font-bold tabular-nums">
                  {String(remainingTime.hours).padStart(2, '0')}h : {String(remainingTime.minutes).padStart(2, '0')}m : {String(remainingTime.seconds).padStart(2, '0')}s
                </span>
              </div>

              {/* Stock Bar */}
              <div>
                <div className="flex justify-between text-[11px] font-mono text-stone-400 mb-1.5">
                  <span>Claimed: 37 / 39</span>
                  <span className="text-red-400 font-bold">95% SOLD</span>
                </div>
                <div className="w-full bg-stone-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 h-full rounded-full"
                    style={{ width: '94.8%' }}
                  />
                </div>
              </div>

              {/* Price & Size Selector */}
              <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold font-mono text-white">$110.00</span>
                  <span className="text-xs text-stone-500 line-through ml-2 font-mono">$135.00</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {['S', 'M', 'L', 'XL'].map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all ${
                        selectedSize === sz
                          ? 'bg-white text-stone-950 shadow-md'
                          : 'bg-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Express Buy CTAs */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleBuyNowGooglePay}
                  className="w-full py-4 px-6 bg-white hover:bg-stone-100 text-stone-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-xl active:scale-[0.99] transition-all"
                >
                  <Zap className="w-4 h-4 text-blue-600 fill-blue-600" />
                  <span>CLAIM WITH GOOGLE PAY · $110.00</span>
                </button>

                <button
                  onClick={() => addToCart(dropProduct, selectedSize, 'Obsidian Black', 1)}
                  className="w-full py-3 px-6 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700/80 font-semibold text-xs rounded-xl transition-all"
                >
                  Add to Shopping Bag
                </button>
              </div>

            </div>

            {/* Social Share Trigger */}
            <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Certified authentic collector numbered certificate</span>
              </div>
              <button
                onClick={handleShareDrop}
                className="flex items-center gap-1.5 text-stone-300 hover:text-white underline cursor-pointer"
              >
                {copiedShare ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Drop</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Story Behind the Drop Section */}
      <section className="py-16 bg-stone-900/50 border-t border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase text-amber-400 tracking-widest">
              The Genesis
            </span>
            <h2 className="font-display text-3xl font-bold text-white">
              The Story Behind the Number
            </h2>
            <p className="text-stone-400 text-sm max-w-xl mx-auto">
              Every design choice in the Doomsday Hoodie commemorates real engineering resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center text-amber-400 font-mono font-bold">
                01
              </div>
              <h3 className="font-bold text-white text-base">480 GSM Armor</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Woven on vintage circular knitting machines using heavyweight long-staple organic cotton. Zero synthetics against the skin.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center text-emerald-400 font-mono font-bold">
                02
              </div>
              <h3 className="font-bold text-white text-base">Numbered Metal Plaque</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Laser-etched 316L medical grade stainless steel tag riveted to the hem, verifying your place among the 39 owners.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center text-blue-400 font-mono font-bold">
                03
              </div>
              <h3 className="font-bold text-white text-base">Tonal Google Spectrum</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Laser-stitched micro embroidery on the forearm representing the 4 Google primary colors in understated matte thread.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Complete the Look Section */}
      <div className="text-stone-900">
        <BundleSection />
      </div>

    </div>
  );
};
