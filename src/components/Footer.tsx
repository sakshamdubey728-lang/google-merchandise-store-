import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Truck, RotateCcw, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, setSelectedCategory, setSelectedCollection } = useStore();

  const handleNav = (category?: string, collection?: string) => {
    setActiveView('shop');
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
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-24 md:pb-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Proposition Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-stone-800 text-xs">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-stone-800 text-blue-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Carbon-Neutral Shipping</h4>
              <p className="text-stone-400 mt-1 leading-relaxed">
                Free standard delivery on all qualifying orders over $75 with zero-emission fulfillment.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-stone-800 text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">100% Google Authentic</h4>
              <p className="text-stone-400 mt-1 leading-relaxed">
                Official merchandise crafted with certified GOTS organic cotton and recycled materials.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-stone-800 text-amber-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Hassle-Free 30-Day Returns</h4>
              <p className="text-stone-400 mt-1 leading-relaxed">
                Prepaid return labels and rapid exchanges across the United States.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs">
          <div>
            <h5 className="font-semibold text-white uppercase tracking-wider mb-4">Shop Merchandise</h5>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button onClick={() => handleNav('Apparel')} className="hover:text-white transition-colors">
                  Apparel & Hoodies
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Drinkware')} className="hover:text-white transition-colors">
                  Spectra Tumblers & Bottles
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Bags')} className="hover:text-white transition-colors">
                  Backpacks & Tech Sleeves
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Headwear')} className="hover:text-white transition-colors">
                  Caps & Beanies
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Collectibles')} className="hover:text-white transition-colors">
                  Chrome Dino Collectibles
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white uppercase tracking-wider mb-4">Collections</h5>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button onClick={() => handleNav(undefined, '1998 Retro')} className="hover:text-white transition-colors text-amber-400 font-medium">
                  1998 Retro Collection
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('drop-campaign')} className="hover:text-white transition-colors">
                  Suit Up for 39 (Limited Drop)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav(undefined, 'Android')} className="hover:text-white transition-colors">
                  Android Ecosystem
                </button>
              </li>
              <li>
                <button onClick={() => handleNav(undefined, 'Chrome')} className="hover:text-white transition-colors">
                  Google Chrome Heritage
                </button>
              </li>
              <li>
                <button onClick={() => handleNav(undefined, 'YouTube')} className="hover:text-white transition-colors">
                  YouTube Creator Studio
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white uppercase tracking-wider mb-4">Customer Care</h5>
            <ul className="space-y-2.5 text-stone-400">
              <li><span className="hover:text-white cursor-pointer">Order Status & Tracking</span></li>
              <li><span className="hover:text-white cursor-pointer">Shipping & Delivery Rates</span></li>
              <li><span className="hover:text-white cursor-pointer">Returns & Exchanges</span></li>
              <li><span className="hover:text-white cursor-pointer">Unisex Sizing Guide</span></li>
              <li><span className="hover:text-white cursor-pointer">Gift Cards</span></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white uppercase tracking-wider mb-4">Official Store</h5>
            <p className="text-stone-400 leading-relaxed mb-3">
              Official Google Merchandise Store operated for fans, employees, and developers worldwide.
            </p>
            <div className="flex items-center gap-1 font-bold text-sm text-white">
              <span className="text-blue-400">G</span>
              <span className="text-red-400">o</span>
              <span className="text-amber-400">o</span>
              <span className="text-blue-400">g</span>
              <span className="text-emerald-400">l</span>
              <span className="text-red-400">e</span>
              <span className="text-stone-300 ml-1 font-normal text-xs">Merchandise Store</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 Google LLC. All rights reserved. Google, Android, YouTube, and Chrome are trademarks of Google LLC.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">Accessibility</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
