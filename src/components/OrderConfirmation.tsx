import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, Share2, ArrowRight, Package, Truck, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const OrderConfirmation: React.FC = () => {
  const { completedOrder, products, setActiveView } = useStore();
  const [copiedLink, setCopiedLink] = useState(false);

  const order = completedOrder || {
    orderNumber: 'GMS-94021',
    date: 'Oct 5, 2026',
    items: [],
    subtotal: 92.00,
    shipping: 0,
    tax: 7.59,
    total: 99.59,
    paymentMethod: 'Google Pay',
    estimatedDelivery: 'Oct 9 – Oct 12, 2026',
    shippingAddress: {
      fullName: 'Alex Mercer',
      email: 'alex.mercer@gmail.com',
      address: '1600 Amphitheatre Pkwy',
      city: 'Mountain View',
      state: 'CA',
      zipCode: '94043',
      country: 'United States'
    }
  };

  const referralLink = `https://shop.merch.google/referral?code=${order.orderNumber.replace('GMS-', 'REF-')}`;

  const handleCopyReferral = () => {
    navigator.clipboard?.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const postPurchaseRecommendations = products.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Success Hero Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-950 tracking-tight">
          You&apos;re all set! 🎉
        </h1>
        <p className="text-stone-600 text-sm max-w-md mx-auto">
          Thank you for shopping at the official Google Merchandise Store. We&apos;ve sent your order confirmation receipt to <strong className="text-stone-900">{order.shippingAddress.email}</strong>.
        </p>
      </div>

      {/* Order Status Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-100 gap-4">
          <div>
            <span className="text-xs text-stone-400 uppercase tracking-wider">Order Reference</span>
            <p className="font-mono text-xl font-bold text-stone-900 mt-0.5">{order.orderNumber}</p>
          </div>
          <div className="sm:text-right">
            <span className="text-xs text-stone-400 uppercase tracking-wider">Estimated Delivery</span>
            <p className="text-sm font-bold text-emerald-700 flex items-center gap-1.5 sm:justify-end mt-0.5">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>{order.estimatedDelivery}</span>
            </p>
          </div>
        </div>

        {/* Tracking progress pills */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 font-semibold">
            <span>1. Order Confirmed</span>
          </div>
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-600">
            <span>2. Warehouse Pack</span>
          </div>
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-600">
            <span>3. Out for Delivery</span>
          </div>
        </div>

        {/* Shipping address & payment summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-xs">
          <div className="space-y-1">
            <h4 className="font-semibold text-stone-900 uppercase tracking-wider">Shipping To</h4>
            <p className="text-stone-600">{order.shippingAddress.fullName}</p>
            <p className="text-stone-600">{order.shippingAddress.address}</p>
            <p className="text-stone-600">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
          </div>
          <div className="space-y-1 sm:text-right">
            <h4 className="font-semibold text-stone-900 uppercase tracking-wider">Payment Method</h4>
            <p className="text-stone-700 font-medium">{order.paymentMethod}</p>
            <p className="font-mono text-stone-900 font-bold text-sm tabular-nums">
              Total Paid: ${order.total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* PRD Section 21: Social & Referral Share Card */}
      <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-mono uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Google Fan Community Share</span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-bold">
          Give $10, Get $10 on Google Gear
        </h3>
        <p className="text-stone-300 text-xs sm:text-sm max-w-lg leading-relaxed">
          Share your custom referral link with teammates or friends. When they use Google Pay on their first purchase, they unlock $10 off, and you earn $10 store credit.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          <div className="flex-1 bg-stone-800/90 border border-stone-700 px-4 py-2.5 rounded-xl font-mono text-xs text-stone-300 truncate">
            {referralLink}
          </div>
          <button
            onClick={handleCopyReferral}
            className="px-5 py-2.5 bg-white text-stone-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 hover:bg-stone-100 transition-colors shrink-0"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Post-Purchase Recommendations (PRD Section 21) */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-xl font-bold text-stone-950">You May Also Like</h3>
            <p className="text-xs text-stone-500">Add to your upcoming shipment before it dispatches</p>
          </div>
          <button
            onClick={() => setActiveView('shop')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>Back to Store</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {postPurchaseRecommendations.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

    </div>
  );
};
