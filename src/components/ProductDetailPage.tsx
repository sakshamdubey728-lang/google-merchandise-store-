import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Check,
  Zap,
  ArrowRight,
  Bell,
  BellRing
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { RETRO_TUMBLER_BUNDLE } from '../data/products';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    products,
    addToCart,
    addBundleToCart,
    isInWishlist,
    toggleWishlist,
    setActiveView,
    setIsGooglePayModalOpen,
    recentlyViewed,
    setPriceDropModalProduct,
    hasPriceAlert,
    getPriceAlert
  } = useStore();

  const product = selectedProduct || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes?.[0] || 'Standard'
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors?.[0]?.name || 'Default'
  );
  const [quantity, setQuantity] = useState(1);
  const [isAddedNotice, setIsAddedNotice] = useState(false);

  // Accordion state
  const [openSection, setOpenSection] = useState<'materials' | 'sizing' | 'shipping' | 'reviews' | null>('materials');

  const isFavorite = isInWishlist(product.id);
  const alertConfig = getPriceAlert(product.id);
  const hasAlert = hasPriceAlert(product.id);

  // Frequently bought together companion
  const crossSellCompanion = product.frequentlyBoughtWith
    ? products.find(p => p.id === product.frequentlyBoughtWith)
    : products.find(p => p.id !== product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsAddedNotice(true);
    setTimeout(() => setIsAddedNotice(false), 2000);
  };

  const handleExpressBuy = () => {
    // Add to cart and immediately open Google Pay Express checkout
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsGooglePayModalOpen(true);
  };

  const handleBundleAdd = () => {
    addBundleToCart(RETRO_TUMBLER_BUNDLE);
  };

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 md:pb-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6">
        <button onClick={() => setActiveView('home')} className="hover:text-stone-900 transition-colors">
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => setActiveView('shop')}
          className="hover:text-stone-900 transition-colors"
        >
          {product.category}
        </button>
        <span>/</span>
        <span className="text-stone-900 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid: Gallery Left + Contiguous Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual Display */}
          <div className="relative aspect-4/3 rounded-2xl bg-stone-100 overflow-hidden border border-stone-200 shadow-sm">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />

            {/* Wishlist Floating Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-md text-stone-700 hover:text-red-500 shadow-md transition-all"
              aria-label="Save to wishlist"
            >
              <Heart
                className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
              />
            </button>

            {/* Scarcity tag if limited */}
            {product.isLimitedDrop && (
              <div className="absolute top-4 left-4 bg-stone-950/90 text-amber-400 text-xs font-mono px-3 py-1.5 rounded-lg border border-stone-800">
                LIMITED DROP · {product.totalLimit! - product.soldCount!} OF {product.totalLimit} REMAIN
              </div>
            )}
          </div>

          {/* Thumbnails row if multiple images */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx ? 'border-stone-950 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            {/* Unboxed Metadata Kicker */}
            <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-wider mb-2 font-medium">
              <span>{product.collection}</span>
              <span aria-hidden="true">·</span>
              <span>{product.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-semibold">In Stock & Ready to Ship</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight leading-snug">
              {product.name}
            </h1>

            {/* Ratings and Reviews */}
            <div className="flex items-center gap-2 mt-2 text-xs">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-stone-900 font-mono tabular-nums">{product.rating}</span>
              <span className="text-stone-400">·</span>
              <span className="text-stone-600 underline cursor-pointer">
                {product.reviewCount} verified buyer reviews
              </span>
            </div>

            {/* Price Box */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-stone-950 font-mono tabular-nums">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-stone-400 line-through font-mono tabular-nums">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-stone-600 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-stone-900">Color:</span>
                <span className="text-stone-500 font-medium">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map(col => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    title={col.name}
                    className={`w-7 h-7 rounded-full transition-all flex items-center justify-center border ${
                      selectedColor === col.name
                        ? 'ring-2 ring-stone-950 ring-offset-2 scale-110'
                        : 'hover:scale-105 border-stone-300'
                    }`}
                    style={{ backgroundColor: col.hex }}
                  >
                    {selectedColor === col.name && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-stone-900">Select Size:</span>
                <button
                  onClick={() => setOpenSection(openSection === 'sizing' ? null : 'sizing')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Size Chart
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
                      selectedSize === sz
                        ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Stepper & Add to Cart Controls */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-stone-200 bg-white rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-bold font-mono tabular-nums text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 bg-stone-950 hover:bg-stone-900 text-white font-semibold text-sm rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {isAddedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <span>ADD TO CART</span>
                )}
              </button>
            </div>

            {/* Express Google Pay Button (PRD Priority Requirement) */}
            <button
              onClick={handleExpressBuy}
              className="w-full py-3.5 px-6 bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 font-semibold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-blue-600 fill-blue-600" />
              <span>Buy now with</span>
              <span className="font-bold flex items-center gap-0.5">
                <span className="text-blue-600">G</span>
                <span className="text-stone-700">Pay</span>
              </span>
            </button>

            {/* Price Alert & Wishlist Secondary Action Bar */}
            <div className="flex items-center justify-between pt-1 px-1 text-xs">
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 py-1 transition-colors"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{isFavorite ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>

              <button
                type="button"
                onClick={() => setPriceDropModalProduct(product)}
                className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium py-1 transition-colors"
              >
                {hasAlert ? (
                  <>
                    <BellRing className="w-3.5 h-3.5 text-amber-500" />
                    <span>Price Alert Set (≤ ${alertConfig?.targetPrice.toFixed(2)})</span>
                  </>
                ) : (
                  <>
                    <Bell className="w-3.5 h-3.5 text-stone-400" />
                    <span>Get Price-Drop Alert</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Delivery & Shipping Perks */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2.5 text-xs text-stone-600">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-stone-800 shrink-0" />
              <span>Free standard delivery on orders over $75. Estimated arrival: 3-5 days.</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-stone-800 shrink-0" />
              <span>30-day hassle-free returns. Free exchanges within the US.</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-stone-800 shrink-0" />
              <span>Official Google Merchandise with authenticity guarantee.</span>
            </div>
          </div>

          {/* Expandable Accordions */}
          <div className="border-t border-stone-200 pt-4 space-y-2 text-xs">
            {/* Details & Specs */}
            <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setOpenSection(openSection === 'materials' ? null : 'materials')}
                className="w-full p-3.5 flex items-center justify-between text-left font-semibold text-stone-900 hover:bg-stone-50"
              >
                <span>Product Specifications & Details</span>
                {openSection === 'materials' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openSection === 'materials' && (
                <div className="p-3.5 pt-0 text-stone-600 border-t border-stone-100 space-y-2">
                  <p className="font-medium text-stone-800">{product.materials}</p>
                  <ul className="list-disc pl-4 space-y-1">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Size Chart */}
            {product.sizes && (
              <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setOpenSection(openSection === 'sizing' ? null : 'sizing')}
                  className="w-full p-3.5 flex items-center justify-between text-left font-semibold text-stone-900 hover:bg-stone-50"
                >
                  <span>Size & Fit Guide</span>
                  {openSection === 'sizing' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSection === 'sizing' && (
                  <div className="p-3.5 pt-0 text-stone-600 border-t border-stone-100">
                    <p className="mb-2">Standard US unisex sizing with relaxed athletic drape.</p>
                    <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-mono">
                      <div className="bg-stone-100 p-1.5 rounded font-bold">Size</div>
                      <div className="bg-stone-100 p-1.5 rounded font-bold">Chest (in)</div>
                      <div className="bg-stone-100 p-1.5 rounded font-bold">Length</div>
                      <div className="bg-stone-100 p-1.5 rounded font-bold">Sleeve</div>
                      <div className="p-1">S</div><div className="p-1">36-38</div><div className="p-1">27.5&quot;</div><div className="p-1">33.5&quot;</div>
                      <div className="p-1">M</div><div className="p-1">39-41</div><div className="p-1">28.5&quot;</div><div className="p-1">34.5&quot;</div>
                      <div className="p-1">L</div><div className="p-1">42-44</div><div className="p-1">29.5&quot;</div><div className="p-1">35.5&quot;</div>
                      <div className="p-1">XL</div><div className="p-1">45-48</div><div className="p-1">30.5&quot;</div><div className="p-1">36.5&quot;</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Frequently Bought Together Module */}
      {crossSellCompanion && (
        <section className="mt-16 pt-12 border-t border-stone-200">
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8">
            <h3 className="font-display text-lg font-bold text-stone-900 mb-1">
              Frequently Bought Together
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Customers who purchased this item also paired it with the following recommended gear.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-stone-200 shrink-0">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-stone-400 font-bold">+</span>
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-stone-200 shrink-0">
                  <img src={crossSellCompanion.images[0]} alt={crossSellCompanion.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900">{crossSellCompanion.name}</h4>
                  <p className="text-xs text-stone-500 font-mono">${crossSellCompanion.price.toFixed(2)}</p>
                </div>
              </div>

              <button
                onClick={handleBundleAdd}
                className="w-full sm:w-auto px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2"
              >
                <span>Add Companion Item</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Related Products Grid */}
      <section className="mt-16 pt-12 border-t border-stone-200">
        <h3 className="font-display text-xl font-bold text-stone-950 mb-6">
          More from the {product.collection} Line
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {relatedProducts.map(rel => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </section>

      {/* Mobile Sticky Add to Cart Bar (Strictly compliant with 15% mobile viewport cap) */}
      <div className="md:hidden fixed bottom-16 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-2.5 shadow-lg flex items-center justify-between gap-3 max-h-[64px]">
        <div>
          <span className="text-[11px] text-stone-500 block truncate max-w-[120px]">
            {product.name}
          </span>
          <span className="text-sm font-bold text-stone-950 font-mono tabular-nums">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExpressBuy}
            className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold rounded-lg flex items-center gap-1 border border-stone-300"
          >
            <Zap className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
            <span>GPay</span>
          </button>

          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-stone-950 text-white text-xs font-semibold rounded-lg shadow-sm"
          >
            {isAddedNotice ? 'Added!' : 'Add to Bag'}
          </button>
        </div>
      </div>

    </div>
  );
};
