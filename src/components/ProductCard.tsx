import React from 'react';
import { Heart, Plus, Star, Check } from 'lucide-react';
import { Product } from '../types/store';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { selectProduct, addToCart, isInWishlist, toggleWishlist } = useStore();
  const [justAdded, setJustAdded] = React.useState(false);

  const isFavorite = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => selectProduct(product)}
      className="group flex flex-col bg-white border border-stone-200/90 rounded-2xl overflow-hidden hover:border-stone-300 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      {/* Visual Image Container (65-75% height) */}
      <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm text-stone-700 hover:text-red-500 hover:bg-white shadow-sm transition-all z-10"
        >
          <Heart
            className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
          />
        </button>

        {/* Unboxed Status Kicker (Zero-Pill: pure unboxed text) */}
        {product.isLimitedDrop && (
          <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-sm text-amber-400 text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded">
            Only {product.totalLimit! - product.soldCount!} Left
          </div>
        )}
        {!product.isLimitedDrop && product.isNew && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded">
            New Arrival
          </div>
        )}
        {!product.isLimitedDrop && !product.isNew && product.isBestSeller && (
          <div className="absolute top-3 left-3 bg-stone-900/90 text-stone-200 text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded">
            Best Seller
          </div>
        )}

        {/* Quick Add overlay button on desktop */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block z-10">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-4 bg-stone-950/95 hover:bg-stone-900 text-white text-xs font-semibold rounded-xl backdrop-blur-sm flex items-center justify-center gap-1.5 shadow-lg transition-transform active:scale-95"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata Row: Unboxed clean text with typographic separator */}
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>{product.collection}</span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-stone-900 text-sm sm:text-base line-clamp-1 mt-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-stone-600">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="font-medium text-stone-900">{product.rating}</span>
            <span className="text-stone-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price and Mobile Add Button */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-stone-950 font-mono tabular-nums">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Mobile Tap Quick Add (Touch friendly >= 44px) */}
          <button
            onClick={handleQuickAdd}
            aria-label="Add to cart"
            className="sm:hidden p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-900 active:scale-95 transition-all min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            {justAdded ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
