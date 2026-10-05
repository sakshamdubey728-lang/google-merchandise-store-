import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, BundleDeal, OrderDetails, AnalyticsStats, ProductCategory, ProductCollection, PriceDropAlert, TriggeredPriceDropEvent } from '../types/store';
import { PRODUCTS, RETRO_TUMBLER_BUNDLE, INITIAL_ANALYTICS_DATA } from '../data/products';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: Product[];
  activeView: 'home' | 'shop' | 'product-detail' | 'drop-campaign' | 'order-confirmation';
  setActiveView: (view: 'home' | 'shop' | 'product-detail' | 'drop-campaign' | 'order-confirmation') => void;
  selectedProduct: Product | null;
  selectProduct: (product: Product) => void;
  
  // Cart Actions
  addToCart: (product: Product, size?: string, color?: string, quantity?: number) => void;
  addBundleToCart: (bundle: BundleDeal) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Cart Calculations
  cartCount: number;
  cartSubtotal: number;
  freeShippingThreshold: number;
  shippingRemaining: number;
  shippingFee: number;
  estimatedTax: number;
  cartTotal: number;

  // Drawers & Modals
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isAnalyticsOpen: boolean;
  setIsAnalyticsOpen: (open: boolean) => void;
  isGooglePayModalOpen: boolean;
  setIsGooglePayModalOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;

  // Price Drop Alerts
  priceAlerts: PriceDropAlert[];
  addPriceAlert: (productId: string, email: string, targetPrice: number, thresholdType: PriceDropAlert['thresholdType']) => void;
  removePriceAlert: (productId: string) => void;
  getPriceAlert: (productId: string) => PriceDropAlert | undefined;
  hasPriceAlert: (productId: string) => boolean;
  priceDropModalProduct: Product | null;
  setPriceDropModalProduct: (product: Product | null) => void;
  activePriceDropNotification: TriggeredPriceDropEvent | null;
  dismissPriceDropNotification: () => void;
  simulatePriceDrop: (productId: string, discountPercentage?: number) => void;

  // Wishlist
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Filter & Search
  selectedCategory: ProductCategory | 'All';
  setSelectedCategory: (cat: ProductCategory | 'All') => void;
  selectedCollection: ProductCollection | 'All';
  setSelectedCollection: (col: ProductCollection | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Order & Checkout
  completedOrder: OrderDetails | null;
  completeCheckout: (paymentMethod: 'Google Pay' | 'Credit Card', customerInfo?: { name: string; email: string; address: string; city: string; zip: string }) => void;

  // Analytics
  analytics: AnalyticsStats;
  recordAnalyticsEvent: (event: 'hero_cta' | 'add_to_cart' | 'bundle_add' | 'checkout_init' | 'google_pay_click' | 'order_complete') => void;
  toggleBotFilter: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Initial starter item so user can see cart state immediately
    const retro = PRODUCTS.find(p => p.id === 'prod-retro-1998-hoodie');
    if (retro) {
      return [{
        id: 'init-retro-l-oatmeal',
        productId: retro.id,
        product: retro,
        quantity: 1,
        selectedSize: 'L',
        selectedColor: 'Vintage Oatmeal',
        price: retro.price
      }];
    }
    return [];
  });
  
  const [wishlist, setWishlist] = useState<string[]>(['prod-suit-up-39', 'prod-spectra-tumbler']);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [activeView, setActiveView] = useState<'home' | 'shop' | 'product-detail' | 'drop-campaign' | 'order-confirmation'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isGooglePayModalOpen, setIsGooglePayModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Price Drop Alerts State
  const [priceAlerts, setPriceAlerts] = useState<PriceDropAlert[]>([
    {
      id: 'alert-initial-spectra',
      productId: 'prod-spectra-tumbler',
      userEmail: 'alex.mercer@gmail.com',
      currentPrice: 28.00,
      targetPrice: 24.00,
      createdAt: 'Today',
      thresholdType: '10_percent'
    }
  ]);
  const [priceDropModalProduct, setPriceDropModalProduct] = useState<Product | null>(null);
  const [activePriceDropNotification, setActivePriceDropNotification] = useState<TriggeredPriceDropEvent | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [selectedCollection, setSelectedCollection] = useState<ProductCollection | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsStats>(INITIAL_ANALYTICS_DATA);

  // Send SPA page_view and custom events to Google Tag (gtag)
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      const pagePath =
        activeView === 'home'
          ? '/'
          : activeView === 'shop'
          ? '/shop'
          : activeView === 'product-detail' && selectedProduct
          ? `/products/${selectedProduct.slug}`
          : activeView === 'drop-campaign'
          ? '/drops/suit-up-for-39'
          : activeView === 'order-confirmation'
          ? '/order-confirmation'
          : `/${activeView}`;

      (window as any).gtag('event', 'page_view', {
        page_path: pagePath,
        page_title: document.title
      });
    }
  }, [activeView, selectedProduct]);

  // Cart calculations
  const freeShippingThreshold = 75.00;
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 7.99;
  const estimatedTax = Number((cartSubtotal * 0.0825).toFixed(2));
  const cartTotal = cartSubtotal + shippingFee + estimatedTax;

  const selectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 6);
    });

    setAnalytics(prev => ({
      ...prev,
      productViews: prev.productViews + 1
    }));
  };

  const addToCart = (product: Product, size?: string, color?: string, quantity: number = 1) => {
    const chosenSize = size || product.sizes?.[0] || 'Standard';
    const chosenColor = color || product.colors?.[0]?.name || 'Default';
    const cartItemId = `${product.id}-${chosenSize}-${chosenColor}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          quantity,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          price: product.price
        }
      ];
    });

    setIsCartDrawerOpen(true);
    recordAnalyticsEvent('add_to_cart');
  };

  const addBundleToCart = (bundle: BundleDeal) => {
    const prod1 = products.find(p => p.id === bundle.primaryProductId);
    const prod2 = products.find(p => p.id === bundle.secondaryProductId);

    if (prod1 && prod2) {
      // Add both items with special bundle discount
      const id1 = `${prod1.id}-bundle-${Date.now()}`;
      const id2 = `${prod2.id}-bundle-${Date.now()}`;

      // Proportionately apply bundle discount
      const p1Discounted = Number((prod1.price - bundle.savings * 0.7).toFixed(2));
      const p2Discounted = Number((prod2.price - bundle.savings * 0.3).toFixed(2));

      setCart(prev => [
        ...prev,
        {
          id: id1,
          productId: prod1.id,
          product: prod1,
          quantity: 1,
          selectedSize: prod1.sizes?.[1] || prod1.sizes?.[0] || 'L',
          selectedColor: prod1.colors?.[0]?.name || 'Default',
          price: p1Discounted
        },
        {
          id: id2,
          productId: prod2.id,
          product: prod2,
          quantity: 1,
          selectedSize: prod2.sizes?.[0] || 'Standard',
          selectedColor: prod2.colors?.[0]?.name || 'Default',
          price: p2Discounted
        }
      ]);

      setIsCartDrawerOpen(true);
      recordAnalyticsEvent('bundle_add');
    }
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const addPriceAlert = (
    productId: string,
    email: string,
    targetPrice: number,
    thresholdType: PriceDropAlert['thresholdType']
  ) => {
    const existingIndex = priceAlerts.findIndex(a => a.productId === productId);
    const prod = products.find(p => p.id === productId);
    const newAlert: PriceDropAlert = {
      id: `alert-${Date.now()}`,
      productId,
      userEmail: email,
      currentPrice: prod ? prod.price : targetPrice,
      targetPrice,
      createdAt: 'Just now',
      thresholdType
    };

    if (existingIndex >= 0) {
      setPriceAlerts(prev => prev.map((a, i) => (i === existingIndex ? newAlert : a)));
    } else {
      setPriceAlerts(prev => [...prev, newAlert]);
    }
  };

  const removePriceAlert = (productId: string) => {
    setPriceAlerts(prev => prev.filter(a => a.productId !== productId));
  };

  const getPriceAlert = (productId: string) => {
    return priceAlerts.find(a => a.productId === productId);
  };

  const hasPriceAlert = (productId: string) => {
    return priceAlerts.some(a => a.productId === productId);
  };

  const dismissPriceDropNotification = () => {
    setActivePriceDropNotification(null);
  };

  const simulatePriceDrop = (productId: string, discountPercentage: number = 20) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    const oldPrice = prod.price;
    const discountFactor = (100 - discountPercentage) / 100;
    const newPrice = Number((oldPrice * discountFactor).toFixed(2));

    // Update product price in state
    setProducts(prev =>
      prev.map(p =>
        p.id === productId
          ? {
              ...p,
              price: newPrice,
              originalPrice: p.originalPrice || oldPrice
            }
          : p
      )
    );

    // Also update selectedProduct if it matches
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(prev =>
        prev ? { ...prev, price: newPrice, originalPrice: prev.originalPrice || oldPrice } : null
      );
    }

    // Check if an alert was registered for this product
    const matchingAlert = priceAlerts.find(a => a.productId === productId);
    const userEmail = matchingAlert ? matchingAlert.userEmail : 'alex.mercer@gmail.com';

    // Trigger instant notification event
    const triggerEvent: TriggeredPriceDropEvent = {
      product: { ...prod, price: newPrice, originalPrice: prod.originalPrice || oldPrice },
      oldPrice,
      newPrice,
      discountPercentage,
      email: userEmail,
      timestamp: 'Just now'
    };

    setActivePriceDropNotification(triggerEvent);
  };

  const recordAnalyticsEvent = (event: 'hero_cta' | 'add_to_cart' | 'bundle_add' | 'checkout_init' | 'google_pay_click' | 'order_complete') => {
    setAnalytics(prev => {
      switch (event) {
        case 'hero_cta':
          return { ...prev, heroCtaClicks: prev.heroCtaClicks + 1 };
        case 'add_to_cart':
          return { ...prev, addToCartCount: prev.addToCartCount + 1 };
        case 'bundle_add':
          return { ...prev, bundleAddCount: prev.bundleAddCount + 1, addToCartCount: prev.addToCartCount + 2 };
        case 'checkout_init':
          return { ...prev, checkoutInitiated: prev.checkoutInitiated + 1 };
        case 'google_pay_click':
          return { ...prev, googlePayCheckouts: prev.googlePayCheckouts + 1, checkoutInitiated: prev.checkoutInitiated + 1 };
        case 'order_complete':
          return {
            ...prev,
            ordersCompleted: prev.ordersCompleted + 1,
            totalRevenue: prev.totalRevenue + cartTotal
          };
        default:
          return prev;
      }
    });
  };

  const toggleBotFilter = () => {
    setAnalytics(prev => ({
      ...prev,
      filterBotTraffic: !prev.filterBotTraffic
    }));
  };

  const completeCheckout = (
    paymentMethod: 'Google Pay' | 'Credit Card',
    customerInfo?: { name: string; email: string; address: string; city: string; zip: string }
  ) => {
    const orderNumber = `GMS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderDetails = {
      orderId: `order-${Date.now()}`,
      orderNumber,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: 0,
      shipping: shippingFee,
      tax: estimatedTax,
      total: cartTotal,
      paymentMethod,
      shippingAddress: {
        fullName: customerInfo?.name || 'Alex Mercer',
        email: customerInfo?.email || 'alex.mercer@gmail.com',
        address: customerInfo?.address || '1600 Amphitheatre Pkwy',
        city: customerInfo?.city || 'Mountain View',
        state: 'CA',
        zipCode: customerInfo?.zip || '94043',
        country: 'United States'
      },
      estimatedDelivery: 'Oct 9 – Oct 12, 2026'
    };

    setCompletedOrder(newOrder);
    recordAnalyticsEvent('order_complete');
    clearCart();
    setIsCartDrawerOpen(false);
    setIsGooglePayModalOpen(false);
    setIsCheckoutModalOpen(false);
    setActiveView('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        recentlyViewed,
        activeView,
        setActiveView,
        selectedProduct,
        selectProduct,
        addToCart,
        addBundleToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        freeShippingThreshold,
        shippingRemaining,
        shippingFee,
        estimatedTax,
        cartTotal,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isSearchOpen,
        setIsSearchOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isAnalyticsOpen,
        setIsAnalyticsOpen,
        isGooglePayModalOpen,
        setIsGooglePayModalOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        priceAlerts,
        addPriceAlert,
        removePriceAlert,
        getPriceAlert,
        hasPriceAlert,
        priceDropModalProduct,
        setPriceDropModalProduct,
        activePriceDropNotification,
        dismissPriceDropNotification,
        simulatePriceDrop,
        toggleWishlist,
        isInWishlist,
        selectedCategory,
        setSelectedCategory,
        selectedCollection,
        setSelectedCollection,
        searchQuery,
        setSearchQuery,
        completedOrder,
        completeCheckout,
        analytics,
        recordAnalyticsEvent,
        toggleBotFilter
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
