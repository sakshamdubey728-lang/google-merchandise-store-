export type ProductCategory = 'Apparel' | 'Drinkware' | 'Accessories' | 'Headwear' | 'Bags' | 'Collectibles';

export type ProductCollection = 'Google' | 'Android' | 'Chrome' | 'YouTube' | '1998 Retro' | 'Limited Edition';

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  collection: ProductCollection;
  images: string[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isLimitedDrop?: boolean;
  isBestSeller?: boolean;
  totalLimit?: number;
  soldCount?: number;
  description: string;
  details: string[];
  materials: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  inStock: boolean;
  frequentlyBoughtWith?: string; // Product ID
}

export interface CartItem {
  id: string; // unique item id including variant
  productId: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  price: number;
}

export interface BundleDeal {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  primaryProductId: string;
  secondaryProductId: string;
  bundlePrice: number;
  originalPrice: number;
  savings: number;
}

export interface OrderDetails {
  orderId: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: 'Google Pay' | 'Credit Card' | 'Apple Pay';
  shippingAddress: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  estimatedDelivery: string;
}

export interface PriceDropAlert {
  id: string;
  productId: string;
  userEmail: string;
  currentPrice: number;
  targetPrice: number;
  createdAt: string;
  thresholdType: 'any' | '10_percent' | '20_percent' | 'custom';
}

export interface TriggeredPriceDropEvent {
  product: Product;
  oldPrice: number;
  newPrice: number;
  discountPercentage: number;
  email: string;
  timestamp: string;
}

export interface AnalyticsStats {
  pageViews: number;
  mobileSessionsShare: number; // e.g. 69.2%
  desktopSessionsShare: number; // e.g. 30.8%
  heroCtaClicks: number;
  productViews: number;
  addToCartCount: number;
  bundleAddCount: number;
  checkoutInitiated: number;
  googlePayCheckouts: number;
  ordersCompleted: number;
  totalRevenue: number;
  activeDevice: 'mobile' | 'desktop';
  filterBotTraffic: boolean;
}
