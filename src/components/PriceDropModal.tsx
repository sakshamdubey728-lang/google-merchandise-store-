import React, { useState, useEffect } from 'react';
import { X, Bell, BellRing, Check, Mail, TrendingDown, ArrowRight, ShieldCheck, Trash2, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PriceDropAlert } from '../types/store';

export const PriceDropModal: React.FC = () => {
  const {
    priceDropModalProduct,
    setPriceDropModalProduct,
    addPriceAlert,
    removePriceAlert,
    getPriceAlert,
    simulatePriceDrop
  } = useStore();

  const product = priceDropModalProduct;

  const [email, setEmail] = useState('alex.mercer@gmail.com');
  const [thresholdType, setThresholdType] = useState<PriceDropAlert['thresholdType']>('10_percent');
  const [customPrice, setCustomPrice] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);

  const existingAlert = product ? getPriceAlert(product.id) : undefined;

  useEffect(() => {
    if (existingAlert) {
      setEmail(existingAlert.userEmail);
      setThresholdType(existingAlert.thresholdType);
      if (existingAlert.thresholdType === 'custom') {
        setCustomPrice(existingAlert.targetPrice.toString());
      }
    } else if (product) {
      // Default custom price to 15% off
      setCustomPrice((product.price * 0.85).toFixed(2));
    }
    setIsSuccess(false);
  }, [existingAlert, product]);

  if (!product) return null;

  const calculateTargetPrice = (): number => {
    if (thresholdType === 'any') return Number((product.price - 0.01).toFixed(2));
    if (thresholdType === '10_percent') return Number((product.price * 0.9).toFixed(2));
    if (thresholdType === '20_percent') return Number((product.price * 0.8).toFixed(2));
    if (thresholdType === 'custom') {
      const parsed = parseFloat(customPrice);
      return isNaN(parsed) || parsed <= 0 ? Number((product.price * 0.9).toFixed(2)) : parsed;
    }
    return product.price;
  };

  const handleSaveAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    const targetPrice = calculateTargetPrice();
    addPriceAlert(product.id, email, targetPrice, thresholdType);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setPriceDropModalProduct(null);
    }, 1500);
  };

  const handleRemove = () => {
    removePriceAlert(product.id);
    setPriceDropModalProduct(null);
  };

  const handleSimulate = (discountPct: number) => {
    simulatePriceDrop(product.id, discountPct);
    setPriceDropModalProduct(null);
  };

  const targetPrice = calculateTargetPrice();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-stone-50 px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <BellRing className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-stone-900">Price-Drop Alert</h2>
              <p className="text-[11px] text-stone-500">Google Merchandise Store Notifications</p>
            </div>
          </div>
          <button
            onClick={() => setPriceDropModalProduct(null)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Preview Card */}
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-3.5 p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80">
            <div className="w-16 h-16 rounded-xl bg-white overflow-hidden border border-stone-200 shrink-0">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
                {product.collection} · {product.category}
              </span>
              <h3 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xs text-stone-500">Current Price:</span>
                <span className="text-sm font-bold font-mono text-stone-950 tabular-nums">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSaveAlert} className="space-y-4">
            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>Notify this Email Address</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@gmail.com"
                className="w-full px-3.5 py-2.5 text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:outline-none bg-stone-50/50"
              />
            </div>

            {/* Threshold Options */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-700 block">
                When should we email you?
              </label>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Any reduction */}
                <button
                  type="button"
                  onClick={() => setThresholdType('any')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    thresholdType === 'any'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <p className="font-bold text-xs">Any Price Drop</p>
                  <p className={`text-[10px] mt-0.5 ${thresholdType === 'any' ? 'text-stone-300' : 'text-stone-500'}`}>
                    Alert on even $1 decrease
                  </p>
                </button>

                {/* 10% off */}
                <button
                  type="button"
                  onClick={() => setThresholdType('10_percent')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    thresholdType === '10_percent'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <p className="font-bold text-xs">10% Off or More</p>
                  <p className={`text-[10px] mt-0.5 font-mono ${thresholdType === '10_percent' ? 'text-stone-300' : 'text-stone-500'}`}>
                    At or below ${(product.price * 0.9).toFixed(2)}
                  </p>
                </button>

                {/* 20% off */}
                <button
                  type="button"
                  onClick={() => setThresholdType('20_percent')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    thresholdType === '20_percent'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <p className="font-bold text-xs">20% Off or More</p>
                  <p className={`text-[10px] mt-0.5 font-mono ${thresholdType === '20_percent' ? 'text-stone-300' : 'text-stone-500'}`}>
                    At or below ${(product.price * 0.8).toFixed(2)}
                  </p>
                </button>

                {/* Custom price */}
                <button
                  type="button"
                  onClick={() => setThresholdType('custom')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    thresholdType === 'custom'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <p className="font-bold text-xs">Specific Target</p>
                  <p className={`text-[10px] mt-0.5 ${thresholdType === 'custom' ? 'text-stone-300' : 'text-stone-500'}`}>
                    Enter exact dollar amount
                  </p>
                </button>
              </div>

              {/* Custom Price Input if selected */}
              {thresholdType === 'custom' && (
                <div className="pt-2">
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-stone-500 font-bold">$</span>
                    <input
                      type="number"
                      step="0.50"
                      min="1"
                      max={product.price - 0.5}
                      value={customPrice}
                      onChange={e => setCustomPrice(e.target.value)}
                      placeholder="Target price..."
                      className="w-full pl-7 pr-3 py-2 text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>
                  <span className="text-[10px] text-stone-500 mt-1 block">
                    Must be lower than current price (${product.price.toFixed(2)})
                  </span>
                </div>
              )}
            </div>

            {/* Target Price Summary Banner */}
            <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl flex items-center justify-between text-xs text-blue-900">
              <span className="flex items-center gap-1.5 font-medium">
                <TrendingDown className="w-4 h-4 text-blue-600" />
                <span>Alert Trigger Target:</span>
              </span>
              <span className="font-mono font-bold text-sm text-blue-700 tabular-nums">
                ≤ ${targetPrice.toFixed(2)}
              </span>
            </div>

            {/* Submit & Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-stone-950 hover:bg-stone-900 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                {isSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Price Alert Configured!</span>
                  </>
                ) : existingAlert ? (
                  <>
                    <BellRing className="w-4 h-4 text-amber-400" />
                    <span>Update Price Alert</span>
                  </>
                ) : (
                  <>
                    <Bell className="w-4 h-4" />
                    <span>Activate Price-Drop Alert</span>
                  </>
                )}
              </button>

              {existingAlert && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="w-full py-2.5 text-xs text-red-600 hover:text-red-700 font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove active alert</span>
                </button>
              )}
            </div>
          </form>

          {/* Developer / Demo Simulator Box */}
          <div className="pt-4 border-t border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-stone-500">
              <span className="font-semibold text-stone-700 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Instant Demo: Test Alert Trigger</span>
              </span>
              <span className="text-[10px] text-stone-400">Live Simulation</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-normal">
              Simulate a price decrease right now to experience the real-time notification banner and email alert flow.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleSimulate(15)}
                className="py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-semibold rounded-lg transition-colors border border-stone-200 flex items-center justify-center gap-1"
              >
                <span>Simulate 15% Drop</span>
              </button>
              <button
                type="button"
                onClick={() => handleSimulate(25)}
                className="py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 text-[11px] font-semibold rounded-lg transition-colors border border-amber-200 flex items-center justify-center gap-1"
              >
                <span>Simulate 25% Drop</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>No spam guaranteed · One email per verified price drop</span>
          </div>

        </div>

      </div>
    </div>
  );
};
