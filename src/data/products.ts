import { Product, BundleDeal } from '../types/store';

export const HERO_IMAGE = '/src/assets/images/hero_suit_up_drop_1791219352910.jpg';
export const RETRO_HOODIE_IMAGE = '/src/assets/images/product_retro_pullover_1791219371317.jpg';
export const SPECTRA_TUMBLER_IMAGE = '/src/assets/images/product_spectra_tumbler_1791219385284.jpg';
export const ANDROID_BACKPACK_IMAGE = '/src/assets/images/product_android_backpack_1791219400166.jpg';
export const CHROME_CAP_IMAGE = '/src/assets/images/product_chrome_cap_1791219417253.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-suit-up-39',
    name: 'Suit Up for 39: Doomsday Edition Hoodie',
    slug: 'suit-up-for-39-doomsday-hoodie',
    subtitle: 'Ultra-heavyweight 480 GSM French Terry with numbered collector tag',
    price: 110.00,
    originalPrice: 135.00,
    category: 'Apparel',
    collection: 'Limited Edition',
    images: [
      HERO_IMAGE,
      RETRO_HOODIE_IMAGE
    ],
    rating: 4.95,
    reviewCount: 38,
    isLimitedDrop: true,
    isNew: true,
    totalLimit: 39,
    soldCount: 37,
    description: 'Commissioned in celebration of extreme resilience and Google engineering culture. Built with heavyweight 480 GSM organic unbrushed French terry, customized tonal matte eyelets, and laser-stitched Google primary spectrum embroidery on the left sleeve. Each piece carries an individually numbered metal collector tag.',
    details: [
      'Strictly limited to 39 individually numbered units worldwide',
      'Solid numbered stainless steel collector tag sewn onto hem (e.g. 37/39)',
      '100% GOTS certified organic combed cotton (480 GSM)',
      'Reinforced double-ribbed side gussets for lifetime shape retention',
      'Designed at Google Bay View, Mountain View, CA'
    ],
    materials: '100% Organic Heavyweight French Terry Cotton. Machine wash cold, hang dry.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Obsidian Black', hex: '#1e1e1e' },
      { name: 'Slate Heather', hex: '#4b5563' }
    ],
    inStock: true,
    frequentlyBoughtWith: 'prod-spectra-tumbler'
  },
  {
    id: 'prod-retro-1998-hoodie',
    name: '1998 Retro Google Collection Hoodie',
    slug: '1998-retro-google-hoodie',
    subtitle: 'Vintage wash organic fleece featuring the original 1998 primary wordmark',
    price: 78.00,
    originalPrice: 88.00,
    category: 'Apparel',
    collection: '1998 Retro',
    images: [
      RETRO_HOODIE_IMAGE,
      HERO_IMAGE
    ],
    rating: 4.88,
    reviewCount: 142,
    isBestSeller: true,
    description: 'Inspired by the humble beginnings at the Menlo Park garage in September 1998. Features authentic vintage color-matched Google lettering with soft-distressed vintage dye and relaxed drop-shoulder cut.',
    details: [
      'Heritage 1998 Google serif logo puff-screenprinted on chest',
      '380 GSM ring-spun organic cotton with plush fleeced interior',
      'Double-lined hood with custom unbleached natural cotton drawcords',
      'Kangaroo front pouch with concealed interior phone stash sleeve'
    ],
    materials: '85% Organic Cotton, 15% Recycled Polyester fleece. Preshrunk.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Vintage Oatmeal', hex: '#f3ede2' },
      { name: 'Chalk White', hex: '#fafafa' },
      { name: 'Garage Navy', hex: '#1e293b' }
    ],
    inStock: true,
    frequentlyBoughtWith: 'prod-spectra-tumbler'
  },
  {
    id: 'prod-spectra-tumbler',
    name: 'Google Spectra Insulated Tumbler 24oz',
    slug: 'google-spectra-insulated-tumbler',
    subtitle: 'Double-wall vacuum insulated stainless steel with leakproof mag-lock lid',
    price: 28.00,
    originalPrice: 34.00,
    category: 'Drinkware',
    collection: 'Google',
    images: [
      SPECTRA_TUMBLER_IMAGE
    ],
    rating: 4.92,
    reviewCount: 318,
    isBestSeller: true,
    isNew: false,
    description: 'Engineered for the Google workspace and daily commutes. Keeps cold drinks iced for 24 hours and coffee piping hot for 12 hours. Features a durable powder-coat finish, ergonomic faceted grip, and laser-etched monochrome Google G icon.',
    details: [
      '24oz (710ml) capacity, fits all standard automotive cup holders',
      'Pro-grade 18/8 food-safe stainless steel with zero flavor transfer',
      'Leak-tight magnetic slider lid with removable silicone seal for easy cleaning',
      'Cupholder friendly tapered design with condensation-free matte finish'
    ],
    materials: 'Kitchen-grade 18/8 Stainless Steel, BPA-free Tritan slider lid.',
    sizes: ['24oz Standard'],
    colors: [
      { name: 'Matte Obsidian', hex: '#18181b' },
      { name: 'Alabaster White', hex: '#f4f4f5' },
      { name: 'Google Blue', hex: '#2563eb' }
    ],
    inStock: true,
    frequentlyBoughtWith: 'prod-retro-1998-hoodie'
  },
  {
    id: 'prod-android-backpack',
    name: 'Android Eco-Canvas Commuter Backpack',
    slug: 'android-eco-canvas-commuter-backpack',
    subtitle: 'Weatherproof 22L pack made with 100% ocean-bound recycled textiles',
    price: 95.00,
    originalPrice: 115.00,
    category: 'Bags',
    collection: 'Android',
    images: [
      ANDROID_BACKPACK_IMAGE
    ],
    rating: 4.84,
    reviewCount: 96,
    isNew: true,
    description: 'Minimalist exterior with maximum tech organization. Tailored for software engineers, designers, and students on the move, with dedicated suspended compartment for up to 16" laptops, charger caddies, and subtle Android green woven accents.',
    details: [
      '16" padded laptop pocket with impact-absorbing bottom suspension',
      'Hydrophobic DWR coating sheds heavy rain and splashes effortlessly',
      'Luggage handle pass-through strap for seamless airport travel',
      'Discreet passport security pocket against the breathable lumbar mesh'
    ],
    materials: 'Recycled 600D Ocean-bound Ripstop Polyester with matte TPU laminate.',
    sizes: ['22L Capacity'],
    colors: [
      { name: 'Charcoal Grey', hex: '#374151' },
      { name: 'Bugdroid Green', hex: '#3ddc84' }
    ],
    inStock: true,
    frequentlyBoughtWith: 'prod-spectra-tumbler'
  },
  {
    id: 'prod-chrome-cap',
    name: 'Google Chrome Heritage Low-Profile Cap',
    slug: 'google-chrome-heritage-cap',
    subtitle: 'Washed organic cotton twill with micro-embroidered Chrome icon',
    price: 26.00,
    category: 'Headwear',
    collection: 'Chrome',
    images: [
      CHROME_CAP_IMAGE
    ],
    rating: 4.79,
    reviewCount: 88,
    isBestSeller: false,
    description: 'Unstructured 6-panel silhouette crafted from soft vintage-washed cotton twill. Features an antique brass buckle adjustment strap, moisture-wicking sweatband, and a clean tonal Chrome emblem.',
    details: [
      'Low profile 6-panel unstructured crown for natural contour',
      'Adjustable antique brass clasp with tuck-in fabric keeper',
      'Curved brim with UV-shielding underbill finish',
      'Embroidered ventilation eyelets for all-day thermal comfort'
    ],
    materials: '100% Washed Organic Cotton Twill. Spot clean only.',
    sizes: ['One Size (Adjustable)'],
    colors: [
      { name: 'Deep Navy', hex: '#1e293b' },
      { name: 'Sand Khaki', hex: '#d6c8b2' }
    ],
    inStock: true,
    frequentlyBoughtWith: 'prod-retro-1998-hoodie'
  },
  {
    id: 'prod-youtube-crewneck',
    name: 'YouTube Studio Minimalist Crewneck',
    slug: 'youtube-studio-minimalist-crewneck',
    subtitle: 'Midweight combed cotton fleece with tonal red YouTube play mark',
    price: 64.00,
    category: 'Apparel',
    collection: 'YouTube',
    images: [
      HERO_IMAGE
    ],
    rating: 4.81,
    reviewCount: 74,
    description: 'Designed for marathon editing sessions and studio creators. Features flatlock anti-chafe stitching, ribbed V-notch collar, and an understated tonal crimson micro-embroidery at the wrist.',
    details: [
      '340 GSM midweight fleece with ultra-soft sueded face',
      'Durable 1x1 rib collar, cuffs, and waist with Lycra bounceback',
      'Subtle red YouTube play symbol on left cuff',
      'Pre-shrunk for consistent fit wash after wash'
    ],
    materials: '80% Combed Cotton, 20% Recycled Polyester.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal Black', hex: '#18181b' },
      { name: 'Studio Grey', hex: '#64748b' }
    ],
    inStock: true
  },
  {
    id: 'prod-dino-plush',
    name: 'Chrome Offline Dino Collector Plush (12")',
    slug: 'chrome-offline-dino-collector-plush',
    subtitle: 'Velvety pixel-accurate recreation of the iconic No-Internet T-Rex',
    price: 24.00,
    category: 'Collectibles',
    collection: 'Chrome',
    images: [
      RETRO_HOODIE_IMAGE
    ],
    rating: 4.97,
    reviewCount: 412,
    isBestSeller: true,
    description: 'The beloved companion for when the Wi-Fi drops out. Faithfully translated from 8-bit pixels into an ultra-soft desk plushie with weighted bean base so he stands upright next to your monitor.',
    details: [
      'Weighted bean base allows him to stand proudly on any desk',
      'High-density memory cloud stuffing with hyper-soft short microfleece',
      'Embroidered pixel details and cactus tag accessory',
      'Official Google Chrome collectible series #01'
    ],
    materials: '100% Recycled Polyester fibers and non-toxic poly pellets.',
    sizes: ['12" Standing Height'],
    colors: [
      { name: 'Pixel Heather Grey', hex: '#52525b' }
    ],
    inStock: true
  },
  {
    id: 'prod-material-you-notebook',
    name: 'Google Material You Hardcover Refillable Journal',
    slug: 'google-material-you-journal',
    subtitle: 'FSC-certified dotted stone paper with magnetic lay-flat spine',
    price: 20.00,
    category: 'Accessories',
    collection: 'Google',
    images: [
      SPECTRA_TUMBLER_IMAGE
    ],
    rating: 4.86,
    reviewCount: 120,
    description: 'Engineered for UX wireframing, sprint brainstorming, and clean note taking. Contains 192 numbered pages of silky bleedproof 120 GSM fountain-pen friendly stone paper.',
    details: [
      '192 dotted numbered pages on 120 GSM stone paper',
      'Integrated pen loop color-matched to Google Material palette',
      'Expandable inner pocket for receipts and stickers',
      'Dual grosgrain ribbon bookmarks'
    ],
    materials: 'Vegan PU Leather exterior with recycled stone paper leaves.',
    sizes: ['A5 (5.8 x 8.3 in)'],
    colors: [
      { name: 'Google Sage', hex: '#849b87' },
      { name: 'Coral Rose', hex: '#f28b82' },
      { name: 'Storm Grey', hex: '#4b5563' }
    ],
    inStock: true
  }
];

export const RETRO_TUMBLER_BUNDLE: BundleDeal = {
  id: 'bundle-retro-spectra',
  title: 'Complete the Retro Look',
  subtitle: '1998 Retro Hoodie + Google Spectra Tumbler',
  tagline: 'Pair Google’s #1 best-selling hoodie with the 24hr insulated Spectra Tumbler and unlock $14 in instant bundle savings.',
  primaryProductId: 'prod-retro-1998-hoodie',
  secondaryProductId: 'prod-spectra-tumbler',
  originalPrice: 106.00, // $78 + $28
  bundlePrice: 92.00,
  savings: 14.00
};

export const POPULAR_SEARCH_TERMS = [
  'Retro Hoodie',
  'Spectra Tumbler',
  'Suit Up for 39',
  'Android Backpack',
  'Chrome Cap',
  'Dino Plush',
  'Limited Drops',
  'Organic Cotton'
];

export const INITIAL_ANALYTICS_DATA = {
  pageViews: 14820,
  mobileSessionsShare: 69.2,
  desktopSessionsShare: 30.8,
  heroCtaClicks: 2140,
  productViews: 6890,
  addToCartCount: 1420,
  bundleAddCount: 490,
  checkoutInitiated: 659,
  googlePayCheckouts: 420,
  ordersCompleted: 588,
  totalRevenue: 201205,
  activeDevice: 'mobile' as const,
  filterBotTraffic: true
};
