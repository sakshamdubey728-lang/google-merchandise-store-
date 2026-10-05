import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ProductCategory, ProductCollection } from '../types/store';

export const ProductListingPage: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    selectedCollection,
    setSelectedCollection,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [sortBy, setSortBy] = useState<'recommended' | 'newest' | 'bestselling' | 'price-asc' | 'price-desc'>('recommended');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(150);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories: (ProductCategory | 'All')[] = [
    'All',
    'Apparel',
    'Drinkware',
    'Bags',
    'Headwear',
    'Accessories',
    'Collectibles'
  ];

  const collections: (ProductCollection | 'All')[] = [
    'All',
    '1998 Retro',
    'Google',
    'Android',
    'Chrome',
    'YouTube',
    'Limited Edition'
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
        if (selectedCollection !== 'All' && p.collection !== selectedCollection) return false;
        if (inStockOnly && !p.inStock) return false;
        if (p.price > maxPrice) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          const matchCollection = p.collection.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          if (!matchName && !matchCategory && !matchCollection && !matchDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        if (sortBy === 'bestselling') return (b.soldCount || 0) - (a.soldCount || 0);
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return b.rating - a.rating; // recommended default
      });
  }, [products, selectedCategory, selectedCollection, inStockOnly, maxPrice, searchQuery, sortBy]);

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedCollection !== 'All' ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (maxPrice < 150 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedCollection('All');
    setInStockOnly(false);
    setMaxPrice(150);
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title & Active Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-stone-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
            <span>Home</span>
            <span>/</span>
            <span className="text-stone-900 font-medium">Catalog</span>
            {selectedCollection !== 'All' && (
              <>
                <span>/</span>
                <span className="text-blue-600 font-medium">{selectedCollection}</span>
              </>
            )}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-950 tracking-tight">
            {selectedCollection !== 'All'
              ? `${selectedCollection} Collection`
              : selectedCategory !== 'All'
              ? selectedCategory
              : 'All Google Merchandise'}
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Showing <span className="font-semibold text-stone-900 font-mono tabular-nums">{filteredProducts.length}</span> curated items
          </p>
        </div>

        {/* Controls: Sort Dropdown & Mobile Filter Button */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl bg-white border border-stone-200 text-stone-900 shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-600" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 bg-stone-900 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs shadow-sm">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-stone-800 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="recommended">Featured / Recommended</option>
              <option value="bestselling">Best Selling</option>
              <option value="newest">Newest Additions</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Horizontal Category Quick Pills (interactive button segmented control) */}
      <div className="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar border-b border-stone-200">
        <span className="text-xs font-medium text-stone-400 shrink-0 mr-1">Category:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white text-stone-600 border border-stone-200 hover:text-stone-950 hover:bg-stone-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search status if active */}
      {searchQuery && (
        <div className="flex items-center justify-between bg-blue-50/80 border border-blue-200 rounded-xl px-4 py-2 mt-4 text-xs">
          <span className="text-blue-900">
            Results matching &quot;<strong>{searchQuery}</strong>&quot;
          </span>
          <button
            onClick={() => setSearchQuery('')}
            className="text-blue-700 hover:text-blue-950 font-semibold flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear search</span>
          </button>
        </div>
      )}

      {/* Main Grid + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="font-semibold text-stone-900 text-sm">Refine Results</span>
              {activeFilterCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Reset all
                </button>
              )}
            </div>

            {/* Collection Filter */}
            <div>
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-2">
                Collection
              </label>
              <div className="space-y-1.5">
                {collections.map(col => (
                  <button
                    key={col}
                    onClick={() => setSelectedCollection(col)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      selectedCollection === col
                        ? 'bg-stone-100 text-stone-900 font-semibold'
                        : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <span>{col}</span>
                    {selectedCollection === col && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-4 border-t border-stone-100">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  Max Price
                </label>
                <span className="text-xs font-mono font-bold text-stone-900 tabular-nums">
                  ${maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="150"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-stone-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono tabular-nums">
                <span>$20</span>
                <span>$150</span>
              </div>
            </div>

            {/* Stock status toggle */}
            <div className="pt-4 border-t border-stone-100">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-stone-300 text-stone-900 focus:ring-stone-900 w-4 h-4"
                />
                <span className="text-xs font-medium text-stone-700">In Stock Only</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Product Cards Grid */}
        <main className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center space-y-3">
              <div className="w-12 h-12 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto">
                <Filter className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-stone-900 text-base">No matching products found</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try clearing your filters or adjusting your search keyword to explore other Google merchandise.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-xs bg-white h-full p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h3 className="font-bold text-stone-900 text-base">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-stone-500 hover:text-stone-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Collections */}
              <div>
                <p className="text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">Collection</p>
                <div className="space-y-1">
                  {collections.map(col => (
                    <button
                      key={col}
                      onClick={() => setSelectedCollection(col)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between ${
                        selectedCollection === col ? 'bg-stone-900 text-white font-semibold' : 'text-stone-700 bg-stone-50'
                      }`}
                    >
                      <span>{col}</span>
                      {selectedCollection === col && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-stone-700 uppercase tracking-wider">Max Price</p>
                  <span className="text-xs font-bold font-mono">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="150"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-stone-900"
                />
              </div>

              {/* In stock */}
              <label className="flex items-center gap-2 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-stone-300 text-stone-900 w-4 h-4"
                />
                <span className="text-xs font-medium text-stone-800">In Stock Only</span>
              </label>
            </div>

            <div className="pt-6 border-t border-stone-200 space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-stone-900 text-white text-xs font-semibold rounded-xl"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              <button
                onClick={resetFilters}
                className="w-full py-2.5 text-xs text-stone-600 hover:text-stone-900 font-medium"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
