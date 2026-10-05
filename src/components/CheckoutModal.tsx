import React, { useState } from 'react';
import { X, Check, ShieldCheck, Zap, CreditCard, ChevronRight, Lock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CheckoutModal: React.FC = () => {
  const {
    isGooglePayModalOpen,
    setIsGooglePayModalOpen,
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    cartTotal,
    cartSubtotal,
    shippingFee,
    estimatedTax,
    completeCheckout
  } = useStore();

  const [isProcessing, setIsProcessing] = useState(false);

  // Standard checkout form state
  const [formData, setFormData] = useState({
    fullName: 'Alex Mercer',
    email: 'alex.mercer@gmail.com',
    address: '1600 Amphitheatre Pkwy',
    city: 'Mountain View',
    zipCode: '94043',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvv: '912'
  });

  if (!isGooglePayModalOpen && !isCheckoutModalOpen) return null;

  const handleGooglePayConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      completeCheckout('Google Pay', {
        name: formData.fullName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zip: formData.zipCode
      });
    }, 1200);
  };

  const handleStandardCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      completeCheckout('Credit Card', {
        name: formData.fullName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zip: formData.zipCode
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      {/* 1. Google Pay Express Bottom Sheet / Modal */}
      {isGooglePayModalOpen && (
        <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Google Pay Header Bar */}
          <div className="bg-stone-50 px-6 py-4 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-blue-600">G</span>
              <span className="font-bold text-lg text-stone-700">Pay</span>
              <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full ml-2">
                1-Tap Express
              </span>
            </div>
            <button
              onClick={() => setIsGooglePayModalOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Account Profile info */}
          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  A
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-900">Alex Mercer</p>
                  <p className="text-[11px] text-stone-500">alex.mercer@gmail.com</p>
                </div>
              </div>
              <span className="text-[11px] text-blue-600 font-semibold">Change</span>
            </div>

            {/* Stored Shipping Address */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Shipping Destination
              </label>
              <div className="p-3.5 border border-stone-200 rounded-xl flex items-center justify-between bg-white text-xs">
                <div>
                  <p className="font-semibold text-stone-900">Alex Mercer (Google Bay View)</p>
                  <p className="text-stone-600">1600 Amphitheatre Pkwy, Mountain View, CA 94043</p>
                  <p className="text-emerald-600 font-medium text-[11px] mt-0.5">Free 2-Day Priority Delivery</p>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
              </div>
            </div>

            {/* Payment Method Selected */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Payment Method
              </label>
              <div className="p-3.5 border border-stone-200 rounded-xl flex items-center justify-between bg-white text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 bg-blue-900 text-white rounded flex items-center justify-center font-bold text-[10px] tracking-widest">
                    VISA
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">Chase Sapphire Reserve ···· 4242</p>
                    <p className="text-stone-500 text-[11px]">Default payment card</p>
                  </div>
                </div>
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>
            </div>

            {/* Order total inline */}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-xs text-stone-500">Total charge to card</p>
                <p className="text-xs text-stone-400">{cart.length} items with taxes included</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold font-mono text-stone-950 tabular-nums">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Instant Confirmation Button */}
            <button
              onClick={handleGooglePayConfirm}
              disabled={isProcessing}
              className="w-full py-4 px-6 bg-stone-950 hover:bg-stone-900 disabled:opacity-75 text-white font-bold text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing with Google Pay...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-blue-400" />
                  <span>Pay ${cartTotal.toFixed(2)} with Google Pay</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-stone-400">
              By confirming, you authorize Google Merchandise Store to charge your card. Google Pay protects your payment information with multiple layers of security.
            </p>
          </div>
        </div>
      )}

      {/* 2. Standard Multi-Field Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-bold text-stone-950">Standard Checkout</h2>
              <p className="text-xs text-stone-500">Google Merchandise Store secure checkout</p>
            </div>
            <button
              onClick={() => setIsCheckoutModalOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleStandardCheckoutSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Contact */}
            <div>
              <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                1. Contact Details
              </h3>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address (for order updates)"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Shipping */}
            <div>
              <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                2. Shipping Address
              </h3>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Street Address"
                  required
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Zip Code"
                    required
                    value={formData.zipCode}
                    onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div>
              <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                3. Payment Information
              </h3>
              <div className="p-3 border border-stone-200 rounded-xl space-y-2 bg-stone-50/50">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-stone-600" />
                  <span className="text-xs font-medium text-stone-900">Card Payment</span>
                </div>
                <input
                  type="text"
                  placeholder="Card Number"
                  required
                  value={formData.cardNumber}
                  onChange={e => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg bg-white"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    required
                    value={formData.expDate}
                    onChange={e => setFormData({ ...formData, expDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg bg-white"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    required
                    value={formData.cvv}
                    onChange={e => setFormData({ ...formData, cvv: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="p-3 bg-stone-100 rounded-xl space-y-1 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className="font-mono tabular-nums">{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated Tax</span>
                <span className="font-mono tabular-nums">${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-stone-900 pt-1 border-t border-stone-200 text-sm">
                <span>Total</span>
                <span className="font-mono tabular-nums">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 px-6 bg-stone-950 hover:bg-stone-900 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              {isProcessing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing Order...</span>
                </>
              ) : (
                <span>Place Order · ${cartTotal.toFixed(2)}</span>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
