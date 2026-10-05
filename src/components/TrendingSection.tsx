import React, { useState } from 'react';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { useStore } from '../context/StoreContext';

export const TrendingSection: React.FC = () => {
  const { products, setActiveView, setSelectedCategory } = useStore();
  const [tab, setTab] = useState<'trending' | 'new'>('trending');

  const displayedProducts = tab === 'trending'
    ? products.filter(p => p.isBestSeller || p.rating >= 4.9).slice(0, 4)
    : products.filter(p => p.isNew || p.isLimitedDrop).slice(0, 4);

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Top with Segmented Control Buttons (compliant with SKILL.md for interactive filters) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Fast Discovery</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight mt-0.5">
            {tab === 'trending' ? 'Trending Now' : 'Fresh Drops & New Arrivals'}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Segmented Filter Control */}
          <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200">
            <button
              onClick={() => setTab('trending')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                tab === 'trending'
                  ? 'bg-white text-stone-950 shadow-sm'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Trending</span>
            </button>
            <button
              onClick={() => setTab('new')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                tab === 'new'
                  ? 'bg-white text-stone-950 shadow-sm'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>New Arrivals</span>
            </button>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('All');
              setActiveView('shop');
            }}
            className="hidden sm:flex items-center gap-1 text-xs font-semibold text-stone-700 hover:text-stone-950 px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <span>See all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Grid: 2-column mobile, 4-column desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
