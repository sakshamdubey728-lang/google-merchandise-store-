import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCollection } from '../types/store';

interface CollectionItem {
  id: ProductCollection;
  name: string;
  tagline: string;
  count: number;
  bgGradient: string;
  accentColor: string;
  badge?: string;
}

const COLLECTIONS: CollectionItem[] = [
  {
    id: '1998 Retro',
    name: '1998 Retro Heritage',
    tagline: 'Vintage washed fleece & original serif typography',
    count: 6,
    bgGradient: 'from-amber-50 to-orange-50/60',
    accentColor: 'text-amber-700',
    badge: 'Popular'
  },
  {
    id: 'Limited Edition',
    name: 'Suit Up Drops',
    tagline: 'Serialized numbered runs & experimental releases',
    count: 2,
    bgGradient: 'from-stone-900 to-stone-950',
    accentColor: 'text-amber-400',
    badge: 'Scarcity Drop'
  },
  {
    id: 'Google',
    name: 'Google Workspace',
    tagline: 'Vacuum tumblers, refillable stone journals & desk essentials',
    count: 12,
    bgGradient: 'from-blue-50 to-indigo-50/60',
    accentColor: 'text-blue-700'
  },
  {
    id: 'Android',
    name: 'Android Ecosystem',
    tagline: 'Recycled marine canvas backpacks & Bugdroid apparel',
    count: 8,
    bgGradient: 'from-emerald-50 to-teal-50/60',
    accentColor: 'text-emerald-700'
  },
  {
    id: 'Chrome',
    name: 'Chrome Hardware & Gear',
    tagline: 'Dino collectibles, low-profile dad caps & accessories',
    count: 5,
    bgGradient: 'from-red-50 to-rose-50/60',
    accentColor: 'text-red-700'
  },
  {
    id: 'YouTube',
    name: 'YouTube Creators',
    tagline: 'Minimalist studio crewnecks and broadcast apparel',
    count: 4,
    bgGradient: 'from-rose-50 to-stone-100',
    accentColor: 'text-rose-700'
  }
];

export const CollectionGrid: React.FC = () => {
  const { setSelectedCollection, setActiveView, setSelectedCategory } = useStore();

  const handleSelectCollection = (col: ProductCollection) => {
    setSelectedCollection(col);
    setSelectedCategory('All');
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
        <div>
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Curated Universes</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight mt-0.5">
            Shop by Collection
          </h2>
        </div>
        <button
          onClick={() => {
            setSelectedCollection('All');
            setActiveView('shop');
          }}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group self-start sm:self-auto"
        >
          <span>View all collections</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Grid: 2-col on mobile, 3-col on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {COLLECTIONS.map((c) => {
          const isDark = c.id === 'Limited Edition';

          return (
            <div
              key={c.id}
              onClick={() => handleSelectCollection(c.id)}
              className={`group relative p-6 rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[170px] ${
                isDark
                  ? 'bg-stone-950 border-stone-800 text-white hover:border-amber-500/50 shadow-md'
                  : 'bg-white border-stone-200/90 hover:border-stone-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${c.accentColor}`}>
                    {c.badge || `${c.count} items`}
                  </span>
                  <div className={`p-1.5 rounded-full ${isDark ? 'bg-stone-800 text-stone-300' : 'bg-stone-100 text-stone-600'} group-hover:scale-110 transition-transform`}>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className={`font-display text-lg font-bold mt-2 ${isDark ? 'text-white' : 'text-stone-900'} group-hover:text-blue-600 transition-colors`}>
                  {c.name}
                </h3>
                <p className={`text-xs mt-1 line-clamp-2 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  {c.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100/10 flex items-center justify-between text-xs">
                <span className={isDark ? 'text-stone-400' : 'text-stone-400'}>
                  Explore category
                </span>
                <span className={`font-semibold ${isDark ? 'text-amber-400' : 'text-stone-900'}`}>
                  Browse →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
