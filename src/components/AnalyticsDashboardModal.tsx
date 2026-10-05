import React from 'react';
import { X, Smartphone, Monitor, ShieldAlert, ArrowUpRight, CheckCircle2, TrendingUp, Zap, Users } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AnalyticsDashboardModal: React.FC = () => {
  const {
    isAnalyticsOpen,
    setIsAnalyticsOpen,
    analytics,
    toggleBotFilter
  } = useStore();

  if (!isAnalyticsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>PRD Conversion Intelligence Engine</span>
            </div>
            <h2 className="font-display text-xl font-bold mt-1">
              Google Merchandise Store — Analytics & Funnel Radar
            </h2>
          </div>
          <button
            onClick={() => setIsAnalyticsOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Executive Research Problem Statement (PRD Section 1 & 2) */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-2">
            <div className="flex items-center justify-between font-bold text-amber-900">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-amber-700" />
                <span>Executive Research Diagnosis (Google Analytics Audit)</span>
              </span>
              <span className="bg-amber-200/80 px-2 py-0.5 rounded text-[11px]">Identified Conversion Gap</span>
            </div>
            <p>
              Mobile represents <strong>69.2% of visitors</strong> but contributed only <strong>4.55% of revenue</strong> ($9,168 vs $192,037 desktop). Engagement was only 16s vs 2m 05s. This redesign eliminates the leak via 3-tap discovery, bundle cross-sells, sticky mobile CTAs, and 1-tap Google Pay.
            </p>
          </div>

          {/* Metric Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Mobile Metric Card */}
            <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-sm text-stone-900">Mobile (Android/Chrome)</span>
                </div>
                <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  69.2% Traffic
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                  <span className="text-stone-400 block text-[10px] uppercase">Original Rev</span>
                  <span className="font-mono font-bold text-stone-900">$9,168 (4.55%)</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                  <span className="text-stone-400 block text-[10px] uppercase">Redesign Target</span>
                  <span className="font-mono font-bold text-emerald-600">+340% Lift</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                  <span className="text-stone-400 block text-[10px] uppercase">Engagement</span>
                  <span className="font-mono font-bold text-stone-900">16s → 1m 24s</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                  <span className="text-stone-400 block text-[10px] uppercase">Google Pay Share</span>
                  <span className="font-mono font-bold text-blue-600">68% of checkouts</span>
                </div>
              </div>
            </div>

            {/* Desktop Metric Card */}
            <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-stone-700" />
                  <span className="font-bold text-sm text-stone-900">Desktop</span>
                </div>
                <span className="text-xs font-mono font-bold bg-stone-200 text-stone-800 px-2 py-0.5 rounded">
                  30.3% Traffic
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                  <span className="text-stone-400 block text-[10px] uppercase">Revenue</span>
                  <span className="font-mono font-bold text-stone-900">$192,037 (95.4%)</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                  <span className="text-stone-400 block text-[10px] uppercase">Engagement Rate</span>
                  <span className="font-mono font-bold text-stone-900">60.6%</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                  <span className="text-stone-400 block text-[10px] uppercase">Avg Session</span>
                  <span className="font-mono font-bold text-stone-900">2 min 05 sec</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                  <span className="text-stone-400 block text-[10px] uppercase">Conversion Rate</span>
                  <span className="font-mono font-bold text-stone-900">4.1% baseline</span>
                </div>
              </div>
            </div>

          </div>

          {/* Live Reactive Session Funnel */}
          <div className="p-5 rounded-2xl border border-stone-200 bg-white space-y-3">
            <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
              Live Session Activity & Conversion Funnel
            </h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-stone-50">
                <span className="text-stone-600">Hero CTA Clicks (Suit Up for 39)</span>
                <span className="font-mono font-bold text-stone-900 tabular-nums">{analytics.heroCtaClicks}</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-stone-50">
                <span className="text-stone-600">Product Detail Views</span>
                <span className="font-mono font-bold text-stone-900 tabular-nums">{analytics.productViews}</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-stone-50">
                <span className="text-stone-600">Items Added to Shopping Bag</span>
                <span className="font-mono font-bold text-stone-900 tabular-nums">{analytics.addToCartCount}</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-stone-50">
                <span className="text-stone-600">Bundle 1-Click Adds (Retro + Tumbler)</span>
                <span className="font-mono font-bold text-emerald-600 tabular-nums">{analytics.bundleAddCount}</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-stone-50">
                <span className="text-stone-600">Google Pay Express Checkouts Initiated</span>
                <span className="font-mono font-bold text-blue-600 tabular-nums">{analytics.googlePayCheckouts}</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-stone-50">
                <span className="text-stone-600">Completed Orders</span>
                <span className="font-mono font-bold text-stone-900 tabular-nums">{analytics.ordersCompleted}</span>
              </div>
            </div>
          </div>

          {/* Bot Traffic Isolation Filter (PRD Section 32) */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-stone-900">
                  Filter Artificial 1024×1024 Headless Bot Traffic
                </p>
                <p className="text-[11px] text-stone-500">
                  Separates non-human headless test traffic from genuine Android/Chrome mobile shoppers to ensure pristine A/B data.
                </p>
              </div>
            </div>

            <button
              onClick={toggleBotFilter}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors shrink-0 ml-3 ${
                analytics.filterBotTraffic
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-stone-200 text-stone-700'
              }`}
            >
              {analytics.filterBotTraffic ? 'Active (Filtered)' : 'Disabled'}
            </button>
          </div>

        </div>

        <div className="p-4 bg-stone-100 border-t border-stone-200 flex justify-end">
          <button
            onClick={() => setIsAnalyticsOpen(false)}
            className="px-4 py-2 bg-stone-900 text-white font-semibold text-xs rounded-xl hover:bg-stone-800"
          >
            Close Radar
          </button>
        </div>

      </div>
    </div>
  );
};
