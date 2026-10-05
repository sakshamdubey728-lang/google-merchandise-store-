import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { POPULAR_SEARCH_TERMS } from '../data/products';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    selectProduct,
    setSearchQuery,
    setActiveView
  } = useStore();

  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setInputVal('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results = inputVal.trim()
    ? products.filter(p => {
        const q = inputVal.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelectTerm = (term: string) => {
    setInputVal(term);
    setSearchQuery(term);
    setActiveView('shop');
    setIsSearchOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputVal.trim()) {
      setSearchQuery(inputVal.trim());
      setActiveView('shop');
      setIsSearchOpen(false);
    }
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-start justify-center pt-12 sm:pt-20 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search hoodies, tumblers, backpacks, collections..."
            className="w-full text-stone-900 placeholder:text-stone-400 text-sm sm:text-base focus:outline-none font-medium"
          />
          {inputVal ? (
            <button
              onClick={() => setInputVal('')}
              className="p-1 text-stone-400 hover:text-stone-700 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-[10px] font-mono text-stone-400 border border-stone-200 px-1.5 py-0.5 rounded hidden sm:inline">
              ESC
            </span>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-semibold text-stone-600 hover:text-stone-950 px-2 py-1"
          >
            Cancel
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 max-h-[70vh] overflow-y-auto">
          {inputVal.trim() ? (
            // Results List
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                <span>Matching Items ({results.length})</span>
                {results.length > 0 && (
                  <button
                    onClick={() => {
                      setSearchQuery(inputVal);
                      setActiveView('shop');
                      setIsSearchOpen(false);
                    }}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    View all in catalog →
                  </button>
                )}
              </div>

              {results.length === 0 ? (
                <div className="py-8 text-center text-xs text-stone-500">
                  No merchandise found matching &quot;{inputVal}&quot;. Try terms like <em>Retro</em>, <em>Tumbler</em>, or <em>Backpack</em>.
                </div>
              ) : (
                <div className="divide-y divide-stone-100">
                  {results.map(prod => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        selectProduct(prod);
                        setIsSearchOpen(false);
                      }}
                      className="py-3 flex items-center justify-between hover:bg-stone-50 px-2 rounded-xl cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                          <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-xs text-stone-400 uppercase tracking-wider">{prod.collection} · {prod.category}</p>
                          <h4 className="text-xs sm:text-sm font-semibold text-stone-900">{prod.name}</h4>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-stone-950 tabular-nums">
                        ${prod.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Trending & Popular Terms (PRD Section 14)
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                  <span>Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCH_TERMS.map(term => (
                    <button
                      key={term}
                      onClick={() => handleSelectTerm(term)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Popular Collections</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['1998 Retro Collection', 'Suit Up Drops', 'Google Drinkware', 'Android Accessories'].map(col => (
                    <button
                      key={col}
                      onClick={() => handleSelectTerm(col.split(' ')[0])}
                      className="p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-left hover:border-stone-400 font-medium text-stone-800 transition-all flex items-center justify-between"
                    >
                      <span>{col}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
