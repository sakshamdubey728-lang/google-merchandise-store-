import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Zap, Sparkles, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    freeShippingThreshold,
    shippingRemaining,
    shippingFee,
    estimatedTax,
    cartTotal,
    setIsGooglePayModalOpen,
    setIsCheckoutModalOpen,
    products,
    addToCart
  } = useStore();

  if (!isCartDrawerOpen) return null;

  // Cross-sell item in cart drawer (Spectra Tumbler if not already in cart)
  const isTumblerInCart = cart.some(item => item.productId === 'prod-spectra-tumbler');
  const tumblerProduct = products.find(p => p.id === 'prod-spectra-tumbler');

  const handleGooglePay = () => {
    setIsCartDrawerOpen(false);
    setIsGooglePayModalOpen(true);
  };

  const handleStandardCheckout = () => {
    setIsCartDrawerOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-lg font-bold text-stone-950">Your Shopping Bag</h2>
              <span className="text-xs bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full font-bold font-mono">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-900 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-stone-50 px-5 py-3 border-b border-stone-200 text-xs">
            {shippingRemaining > 0 ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-medium text-stone-700">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Add <strong className="font-mono text-stone-950">${shippingRemaining.toFixed(2)}</strong> for Free 2-Day Shipping</span>
                  </span>
                  <span className="text-[11px] font-mono text-stone-400">Goal: ${freeShippingThreshold}</span>
                </div>
                <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>You unlocked FREE Standard Shipping! 🎉</span>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingBagIcon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-stone-900 text-base">Your bag is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our limited drops, retro classics, and smart desk accessories to get started.
                </p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="mt-2 px-5 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-stone-50/80 rounded-xl border border-stone-200/80 relative"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-white rounded-lg overflow-hidden shrink-0 border border-stone-200">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start pr-6">
                        <h4 className="font-semibold text-xs sm:text-sm text-stone-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        {item.selectedSize && item.selectedColor && <span> · </span>}
                        {item.selectedColor && <span>{item.selectedColor}</span>}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-200 bg-white rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-stone-500 hover:text-stone-900 rounded"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold font-mono tabular-nums text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-stone-500 hover:text-stone-900 rounded"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="font-bold text-xs sm:text-sm text-stone-950 font-mono tabular-nums">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Remove Item */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-3 right-3 text-stone-400 hover:text-red-500 p-1 rounded"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}

            {/* In-Cart Cross-Sell Recommendation (PRD Section 12 & 19) */}
            {!isTumblerInCart && tumblerProduct && cart.length > 0 && (
              <div className="mt-4 p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-900">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Frequently Added Together</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                    Popular Cross-sell
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-white overflow-hidden border border-blue-200 shrink-0">
                    <img src={tumblerProduct.images[0]} alt={tumblerProduct.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-stone-900 truncate">{tumblerProduct.name}</p>
                    <p className="text-xs font-bold text-stone-900 font-mono tabular-nums mt-0.5">
                      ${tumblerProduct.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => addToCart(tumblerProduct, '24oz Standard', 'Matte Obsidian', 1)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors shrink-0"
                  >
                    + Add
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-white space-y-4 shadow-lg">
              {/* Cost Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-mono text-stone-900 font-medium tabular-nums">
                    ${cartSubtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Estimated Shipping</span>
                  <span className="font-mono text-stone-900 font-medium tabular-nums">
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Estimated Taxes (8.25%)</span>
                  <span className="font-mono text-stone-900 font-medium tabular-nums">
                    ${estimatedTax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-200">
                  <span>Estimated Total</span>
                  <span className="font-mono text-base tabular-nums">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Express Checkout: Google Pay (PRD Requirement M4) */}
              <div className="space-y-2">
                <button
                  onClick={handleGooglePay}
                  className="w-full py-3.5 px-4 bg-stone-950 hover:bg-stone-900 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                >
                  <Zap className="w-4 h-4 text-blue-400 fill-blue-400" />
                  <span>Express Checkout with</span>
                  <span className="font-bold flex items-center gap-0.5">
                    <span className="text-blue-400">G</span>
                    <span className="text-white">Pay</span>
                  </span>
                </button>

                {/* Standard Checkout */}
                <button
                  onClick={handleStandardCheckout}
                  className="w-full py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Standard Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>256-bit Encrypted Checkout · Guaranteed Google Authentic</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

const ShoppingBagIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);
