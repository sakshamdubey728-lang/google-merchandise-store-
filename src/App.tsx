/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { TrendingSection } from './components/TrendingSection';
import { BundleSection } from './components/BundleSection';
import { CollectionGrid } from './components/CollectionGrid';
import { ProductListingPage } from './components/ProductListingPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { LimitedDropPage } from './components/LimitedDropPage';
import { OrderConfirmation } from './components/OrderConfirmation';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AnalyticsDashboardModal } from './components/AnalyticsDashboardModal';
import { PriceDropModal } from './components/PriceDropModal';
import { PriceDropNotificationToast } from './components/PriceDropNotificationToast';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';

const StoreContent: React.FC = () => {
  const { activeView } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Real-time Price Drop Alert Notification Toast */}
      <PriceDropNotificationToast />

      {/* Top Header compliant with Top Bar Contract */}
      <Header />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'home' && (
          <div>
            <HeroBanner />
            <TrendingSection />
            <BundleSection />
            <CollectionGrid />
          </div>
        )}

        {activeView === 'shop' && <ProductListingPage />}
        {activeView === 'product-detail' && <ProductDetailPage />}
        {activeView === 'drop-campaign' && <LimitedDropPage />}
        {activeView === 'order-confirmation' && <OrderConfirmation />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent Mobile Bottom Navigation (Home | Shop | Search | Wishlist | Cart) */}
      <MobileBottomNav />

      {/* Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <SearchModal />
      <WishlistDrawer />
      <PriceDropModal />
      <AnalyticsDashboardModal />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
