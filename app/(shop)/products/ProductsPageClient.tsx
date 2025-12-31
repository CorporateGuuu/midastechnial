"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Lock, Smartphone } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  image?: string;
  images?: string;
  badge?: string;
  category: string;
}

interface ProductsPageClientProps {
  products: Product[];
  categoryName: string;
  searchQuery?: string;
}

export default function ProductsPageClient({ products, categoryName, searchQuery }: ProductsPageClientProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Extract category from URL to check if it's pre-owned, apple, samsung, motorola, google, other-parts, game-console, accessories, tools-supplies, refurbishing, or board-components
  const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const category = urlParams.get('category');
  const isPreOwnedCategory = category === 'pre-owned';
  const isAppleCategory = category === 'apple';
  const isSamsungCategory = category === 'samsung';
  const isMotorolaCategory = category === 'motorola';
  const isGoogleCategory = category === 'google';
  const isOtherPartsCategory = category === 'other-parts';
  const isGameConsoleCategory = category === 'game-console';
  const isAccessoriesCategory = category === 'accessories';
  const isToolsSuppliesCategory = category === 'tools-supplies';
  const isRefurbishingCategory = category === 'refurbishing';
  const isBoardComponentsCategory = category === 'board-components';

  const [showLoginModal, setShowLoginModal] = useState(isPreOwnedCategory);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Apple subcategories for filtering
  const appleSubcategories = [
    { name: 'All Apple Parts', href: '/products?category=apple' },
    { name: 'Apollo SSDs', href: '/products?category=apollo-2-5-pc-ssd' },
    { name: 'AirPods', href: '/products?category=airpods-max-2nd-gen' },
    { name: 'iMacs', href: '/products?category=imac-27-a2115-2019-2020' },
    { name: 'Mac Minis', href: '/products?category=mac-mini-a2943-2024-m4' },
    { name: 'Mac Pros', href: '/products?category=mac-pro-tower-a2786-2023-m2-ultra' },
    { name: 'Mac Studios', href: '/products?category=mac-studio-a3143-2025-m4' },
    { name: 'Studio Display', href: '/products?category=studio-display-27-2022' },
    { name: 'MacBooks', href: '/products?category=macbook-12-a1534-2017' },
    { name: 'MacBook Air', href: '/products?category=macbook-air-15-a2941' },
    { name: 'MacBook Pro', href: '/products?category=macbook-pro-14-a3434-2025-m5' },
    { name: 'iPod Touch', href: '/products?category=ipod-touch-7' },
    { name: 'iPod Nano', href: '/products?category=ipod-nano-7' },
    { name: 'Apple Watch', href: '/products?category=watch-series-ultra-3rd-gen-49mm' },
    { name: 'iPhones', href: '/products?category=iphone-17-pro-max' },
    { name: 'iPad Pro', href: '/products?category=ipad-pro-13-8th-gen-2025' },
    { name: 'iPad Air', href: '/products?category=ipad-air-13-2025' },
    { name: 'iPad', href: '/products?category=ipad-11-2025' },
    { name: 'iPad Mini', href: '/products?category=ipad-mini-7-2024' }
  ];

  // Samsung subcategories for filtering
  const samsungSubcategories = [
    { name: 'All Samsung Parts', href: '/products?category=samsung' },
    { name: 'Galaxy S Series', href: '/products?category=samsung&subcategory=s-series' },
    { name: 'Galaxy Note Series', href: '/products?category=samsung&subcategory=note-series' },
    { name: 'Galaxy Fold Series', href: '/products?category=samsung&subcategory=fold-series' },
    { name: 'Galaxy Flip Series', href: '/products?category=samsung&subcategory=flip-series' },
    { name: 'Galaxy Z Series', href: '/products?category=samsung&subcategory=z-series' },
    { name: 'Galaxy A Series', href: '/products?category=samsung&subcategory=a-series' },
    { name: 'Galaxy M Series', href: '/products?category=samsung&subcategory=m-series' },
    { name: 'Galaxy Tab Series', href: '/products?category=samsung&subcategory=tab-series' },
    { name: 'Galaxy Book Series', href: '/products?category=samsung&subcategory=book-series' },
    { name: 'Galaxy Watch Series', href: '/products?category=samsung&subcategory=watch-series' }
  ];

  // Motorola subcategories for filtering
  const motorolaSubcategories = [
    { name: 'All Motorola Parts', href: '/products?category=motorola' },
    { name: 'Moto G Series', href: '/products?category=motorola&subcategory=moto-g-series' },
    { name: 'Moto Edge Series', href: '/products?category=motorola&subcategory=moto-edge-series' },
    { name: 'Moto One Series', href: '/products?category=motorola&subcategory=moto-one-series' },
    { name: 'Moto E Series', href: '/products?category=motorola&subcategory=moto-e-series' },
    { name: 'Moto Z Series', href: '/products?category=motorola&subcategory=moto-z-series' },
    { name: 'Razr Series', href: '/products?category=motorola&subcategory=razr-series' },
    { name: 'Droid Series', href: '/products?category=motorola&subcategory=droid-series' },
    { name: 'ThinkPad Series', href: '/products?category=motorola&subcategory=thinkpad-series' },
    { name: 'Defy Series', href: '/products?category=motorola&subcategory=defy-series' },
    { name: 'X Series', href: '/products?category=motorola&subcategory=x-series' },
    { name: 'Watch Series', href: '/products?category=motorola&subcategory=watch-series' },
    { name: 'M Series', href: '/products?category=motorola&subcategory=m-series' }
  ];

  // Google subcategories for filtering
  const googleSubcategories = [
    { name: 'All Google Parts', href: '/products?category=google' },
    { name: 'Pixel Series', href: '/products?category=google&subcategory=pixel-series' },
    { name: 'Pixelbook Series', href: '/products?category=google&subcategory=pixelbook-series' },
    { name: 'Pixel Tablet', href: '/products?category=google&subcategory=pixel-tablet' },
    { name: 'Watch Series', href: '/products?category=google&subcategory=watch-series' }
  ];

  // Filter products based on search query if present
  const filteredProducts = searchQuery
    ? products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.badge && product.badge.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : products;

  const displayTitle = searchQuery ? `Search Results for "${searchQuery}"` : categoryName;



  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await signIn('credentials', {
        callbackUrl: window.location.href,
        redirect: false,
      });
    } catch (error) {
      console.error('Login error:', error);
      setIsLoggingIn(false);
    }
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
    router.push('/products'); // Redirect to main products page
  };

  if (status === "loading" && isPreOwnedCategory) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Sample pre-owned devices data
  const samplePreOwnedDevices = [
    {
      id: '1',
      title: 'iPhone 14 Pro Max - Excellent Condition',
      price: 899,
      originalPrice: 1199,
      condition: 'Excellent',
      warranty: '30 Days',
      image: '/placeholder.jpg',
      description: 'Unlocked, all accessories included, minor wear on frame.'
    },
    {
      id: '2',
      title: 'Samsung Galaxy S23 Ultra - Very Good',
      price: 749,
      originalPrice: 999,
      condition: 'Very Good',
      warranty: '30 Days',
      image: '/placeholder.jpg',
      description: 'Factory unlocked, S-Pen included, screen protector applied.'
    },
    {
      id: '3',
      title: 'MacBook Pro 14" M2 - Good Condition',
      price: 1699,
      originalPrice: 2299,
      condition: 'Good',
      warranty: '30 Days',
      image: '/placeholder.jpg',
      description: '16GB RAM, 512GB SSD, comes with original charger.'
    },
    {
      id: '4',
      title: 'iPad Pro 12.9" M2 - Like New',
      price: 899,
      originalPrice: 1099,
      condition: 'Like New',
      warranty: '30 Days',
      image: '/placeholder.jpg',
      description: 'Apple Pencil Pro included, barely used, in original box.'
    },
    {
      id: '5',
      title: 'Dell XPS 13 - Excellent Condition',
      price: 799,
      originalPrice: 1299,
      condition: 'Excellent',
      warranty: '30 Days',
      image: '/placeholder.jpg',
      description: 'Intel i7, 16GB RAM, 512GB SSD, Windows 11 Pro.'
    },
    {
      id: '6',
      title: 'Sony WH-1000XM5 Headphones - Very Good',
      price: 299,
      originalPrice: 399,
      condition: 'Very Good',
      warranty: '30 Days',
      image: '/placeholder.jpg',
      description: 'Industry-leading noise cancellation, premium sound quality.'
    }
  ];

  // Sample Apple parts data
  const sampleAppleParts = [
    {
      id: 'a1',
      title: 'iPhone 15 Pro Max Display Assembly',
      price: 299,
      category: 'Displays',
      compatibility: 'iPhone 15 Pro Max',
      image: '/placeholder.jpg',
      description: 'Original quality OLED display with Touch ID, includes digitizer and frame.',
      warranty: '90 Days',
      inStock: true
    },
    {
      id: 'a2',
      title: 'iPhone 14 Pro Battery - 3095mAh',
      price: 89,
      category: 'Batteries',
      compatibility: 'iPhone 14 Pro/Pro Max',
      image: '/placeholder.jpg',
      description: 'Genuine Apple battery with optimal performance and safety features.',
      warranty: '90 Days',
      inStock: true
    },
    {
      id: 'a3',
      title: 'iPhone 13 Logic Board - A15 Bionic',
      price: 249,
      category: 'Logic Boards',
      compatibility: 'iPhone 13 Series',
      image: '/placeholder.jpg',
      description: 'Complete motherboard with A15 Bionic chip, tested and functional.',
      warranty: '30 Days',
      inStock: true
    },
    {
      id: 'a4',
      title: 'MacBook Pro 14" Keyboard Assembly',
      price: 189,
      category: 'Keyboards',
      compatibility: 'MacBook Pro 14" M2/M3',
      image: '/placeholder.jpg',
      description: 'Complete keyboard with backlight, includes Touch Bar and Touch ID.',
      warranty: '90 Days',
      inStock: false
    },
    {
      id: 'a5',
      title: 'iPad Pro 12.9" LCD Screen',
      price: 199,
      category: 'Displays',
      compatibility: 'iPad Pro 12.9" (5th/6th Gen)',
      image: '/placeholder.jpg',
      description: 'High-quality LCD panel with True Tone technology and anti-reflective coating.',
      warranty: '90 Days',
      inStock: true
    },
    {
      id: 'a6',
      title: 'Apple Watch Series 9 Display Module',
      price: 149,
      category: 'Wearables',
      compatibility: 'Apple Watch Series 9/Ultra',
      image: '/placeholder.jpg',
      description: 'Complete display assembly with Force Touch and Always-On capabilities.',
      warranty: '60 Days',
      inStock: true
    },
    {
      id: 'a7',
      title: 'Mac Mini M2 Motherboard',
      price: 399,
      category: 'Desktops',
      compatibility: 'Mac Mini M2',
      image: '/placeholder.jpg',
      description: 'Full system board with M2 chip, memory, and all connectors.',
      warranty: '30 Days',
      inStock: true
    },
    {
      id: 'a8',
      title: 'iPhone Charging Port Assembly',
      price: 29,
      category: 'Connectors',
      compatibility: 'iPhone 12-15 Series',
      image: '/placeholder.jpg',
      description: 'Lightning connector with USB-C compatibility, includes flex cable.',
      warranty: '90 Days',
      inStock: true
    }
  ];

  // Sample Samsung parts data
  const sampleSamsungParts = [
    {
      id: 's1',
      title: 'Galaxy S24 Ultra Display Assembly',
      price: 349,
      category: 'Displays',
      compatibility: 'Galaxy S24 Ultra',
      image: '/placeholder.jpg',
      description: 'Dynamic AMOLED 2X display with S-Pen functionality, includes digitizer and frame.',
      warranty: '90 Days',
      inStock: true
    },
    {
      id: 's2',
      title: 'Galaxy S23 Battery - 5000mAh',
      price: 79,
      category: 'Batteries',
      compatibility: 'Galaxy S23 Series',
      image: '/placeholder.jpg',
      description: 'High-capacity lithium-ion battery with fast charging capability.',
      warranty: '90 Days',
      inStock: true
    },
    {
      id: 's3',
      title: 'Galaxy S22 Logic Board - Snapdragon 8 Gen 1',
      price: 289,
      category: 'Logic Boards',
      compatibility: 'Galaxy S22 Series',
      image: '/placeholder.jpg',
      description: 'Complete motherboard with Snapdragon processor, tested and fully functional.',
      warranty: '30 Days',
      inStock: true
    },
    {
      id: 's4',
      title: 'Galaxy Z Fold 5 Flexible Display',
      price: 599,
      category: 'Displays',
      compatibility: 'Galaxy Z Fold 5',
      image: '/placeholder.jpg',
      description: 'Advanced foldable OLED display with under-display camera technology.',
      warranty: '60 Days',
      inStock: false
    },
    {
      id: 's5',
      title: 'Galaxy Tab S9 LCD Screen',
      price: 229,
      category: 'Displays',
      compatibility: 'Galaxy Tab S9/S9+',
      image: '/placeholder.jpg',
      description: 'High-resolution TFT LCD with S-Pen support and anti-reflective coating.',
      warranty: '90 Days',
      inStock: true
    },
    {
      id: 's6',
      title: 'Galaxy Watch 6 Display Module',
      price: 129,
      category: 'Wearables',
      compatibility: 'Galaxy Watch 6/Classic',
      image: '/placeholder.jpg',
      description: 'AMOLED display with Always-On functionality and touch capabilities.',
      warranty: '60 Days',
      inStock: true
    },
    {
      id: 's7',
      title: 'Galaxy Book 3 Motherboard',
      price: 449,
      category: 'Laptops',
      compatibility: 'Galaxy Book 3 (13.3")',
      image: '/placeholder.jpg',
      description: 'Complete system board with Intel processor, memory, and all connectors.',
      warranty: '30 Days',
      inStock: true
    },
    {
      id: 's8',
      title: 'Galaxy Charging Port Assembly',
      price: 39,
      category: 'Connectors',
      compatibility: 'Galaxy S20-S24 Series',
      image: '/placeholder.jpg',
      description: 'USB-C charging port with fast charging support, includes flex cable.',
      warranty: '90 Days',
      inStock: true
    }
  ];

  // Sample Motorola parts data
  const sampleMotorolaParts = [
    {
      id: 'm1',
      title: 'Moto G Power 5G Display Assembly',
      price: 189,
      category: 'Displays',
      compatibility: 'Moto G Power 5G',
      image: '/placeholder.jpg',
      description: '6.5" HD+ IPS LCD display with waterdrop notch, includes digitizer and frame assembly.',
      warranty: '90 Days',
      inStock: true
    },
    {
      id: 'm2',
      title: 'Moto Edge 40 Battery - 4400mAh',
      price: 69,
      category: 'Batteries',
      compatibility: 'Moto Edge 40/40 Pro',
      image: '/placeholder.jpg',
      description: 'High-capacity lithium-polymer battery with TurboPower 125W fast charging support.',
      warranty: '90 Days',
      inStock: true
    },
    {
      id: 'm3',
      title: 'Moto G Stylus Logic Board - MediaTek',
      price: 199,
      category: 'Logic Boards',
      compatibility: 'Moto G Stylus (2023)',
      image: '/placeholder.jpg',
      description: 'Complete motherboard with MediaTek Helio G85 processor, tested and fully functional.',
      warranty: '30 Days',
      inStock: true
    },
    {
      id: 'm4',
      title: 'Moto Razr 40 Ultra Flexible Display',
      price: 399,
      category: 'Displays',
      compatibility: 'Moto Razr 40 Ultra',
      image: '/placeholder.jpg',
      description: '6.9" pOLED flexible display with 165Hz refresh rate and under-display camera.',
      warranty: '60 Days',
      inStock: false
    },
    {
      id: 'm5',
      title: 'Moto Tab G62 LCD Screen',
      price: 149,
      category: 'Displays',
      compatibility: 'Moto Tab G62/G62 5G',
      image: '/placeholder.jpg',
      description: '10.6" FHD+ IPS LCD with TDDI technology and stereo speakers.',
      warranty: '90 Days',
      inStock: true
    },
    {
      id: 'm6',
      title: 'Moto Watch 100 Display Module',
      price: 89,
      category: 'Wearables',
      compatibility: 'Moto Watch 100/100 4G',
      image: '/placeholder.jpg',
      description: '1.78" AMOLED display with always-on functionality and heart rate sensor.',
      warranty: '60 Days',
      inStock: true
    },
    {
      id: 'm7',
      title: 'Moto G Play Motherboard',
      price: 129,
      category: 'Logic Boards',
      compatibility: 'Moto G Play (2023)',
      image: '/placeholder.jpg',
      description: 'System board with MediaTek Helio G37 processor and all connectivity options.',
      warranty: '30 Days',
      inStock: true
    },
    {
      id: 'm8',
      title: 'Moto Edge Charging Port Assembly',
      price: 35,
      category: 'Connectors',
      compatibility: 'Moto Edge 30/40 Series',
      image: '/placeholder.jpg',
      description: 'USB-C charging port with 68W TurboPower support, includes flex cable.',
      warranty: '90 Days',
      inStock: true
    }
  ];

  // Sample Google Pixel parts data
  const sampleGoogleParts = [
    {
      id: 'g1',
      title: 'Pixel 8 Pro Display Assembly',
      price: 279,
      category: 'Displays',
      compatibility: 'Pixel 8 Pro',
      image: '/placeholder.jpg',
      description: '6.7" LTPO OLED display with 120Hz refresh rate and Gorilla Glass Victus protection.',
      warranty: '90 Days',
      inStock: true
    },
    {
      id: 'g2',
      title: 'Pixel 7 Battery - 4355mAh',
      price: 75,
      category: 'Batteries',
      compatibility: 'Pixel 7/Pixel 7 Pro',
      image: '/placeholder.jpg',
      description: 'High-density lithium-polymer battery with fast charging and safety features.',
      warranty: '90 Days',
      inStock: true
    },
    {
      id: 'g3',
      title: 'Pixel 6 Logic Board - Tensor',
      price: 269,
      category: 'Logic Boards',
      compatibility: 'Pixel 6/Pixel 6 Pro',
      image: '/placeholder.jpg',
      description: 'Complete motherboard with Google Tensor processor, tested and fully functional.',
      warranty: '30 Days',
      inStock: true
    },
    {
      id: 'g4',
      title: 'Pixel Fold Flexible Display',
      price: 449,
      category: 'Displays',
      compatibility: 'Pixel Fold',
      image: '/placeholder.jpg',
      description: '7.6" inner foldable OLED display with cover screen, advanced hinge technology.',
      warranty: '60 Days',
      inStock: false
    },
    {
      id: 'g5',
      title: 'Pixel Tablet LCD Screen',
      price: 189,
      category: 'Displays',
      compatibility: 'Pixel Tablet',
      image: '/placeholder.jpg',
      description: '10.95" LCD with Tandem OLED technology and anti-reflective coating.',
      warranty: '90 Days',
      inStock: true
    },
    {
      id: 'g6',
      title: 'Pixel Watch 2 Display Module',
      price: 119,
      category: 'Wearables',
      compatibility: 'Pixel Watch 2',
      image: '/placeholder.jpg',
      description: '1.2" AMOLED display with always-on functionality and heart rate monitoring.',
      warranty: '60 Days',
      inStock: true
    },
    {
      id: 'g7',
      title: 'Pixel 5 Motherboard',
      price: 199,
      category: 'Logic Boards',
      compatibility: 'Pixel 5',
      image: '/placeholder.jpg',
      description: 'System board with Snapdragon 765G processor and all connectivity options.',
      warranty: '30 Days',
      inStock: true
    },
    {
      id: 'g8',
      title: 'Pixel USB-C Charging Port',
      price: 29,
      category: 'Connectors',
      compatibility: 'Pixel 3-8 Series',
      image: '/placeholder.jpg',
      description: 'USB-C charging port with 18W fast charging support, includes flex cable.',
      warranty: '90 Days',
      inStock: true
    }
  ];

  // Sample Other Parts data
  const sampleOtherParts = [
    {
      id: 'o1',
      title: 'Professional Repair Toolkit',
      price: 149,
      category: 'Tools',
      compatibility: 'Universal',
      image: '/placeholder.jpg',
      description: 'Complete toolkit with precision screwdrivers, spudgers, suction cups, and opening tools for professional repairs.',
      warranty: '1 Year',
      inStock: true
    },
    {
      id: 'o2',
      title: 'Heat Gun with LCD Display',
      price: 89,
      category: 'Tools',
      compatibility: 'Universal',
      image: '/placeholder.jpg',
      description: 'Digital heat gun with adjustable temperature control (100-500°C) and LCD display for precise heating.',
      warranty: '1 Year',
      inStock: true
    },
    {
      id: 'o3',
      title: 'Magnetic Screw Mat - Large',
      price: 24,
      category: 'Accessories',
      compatibility: 'Universal',
      image: '/placeholder.jpg',
      description: '24x18 inch magnetic mat to organize screws and small parts during repairs, prevents loss of components.',
      warranty: 'Lifetime',
      inStock: true
    },
    {
      id: 'o4',
      title: 'Anti-Static Wrist Strap',
      price: 19,
      category: 'Safety',
      compatibility: 'Universal',
      image: '/placeholder.jpg',
      description: 'Professional ESD wrist strap with 6-foot coil cord and adjustable clasp for static protection.',
      warranty: '1 Year',
      inStock: true
    },
    {
      id: 'o5',
      title: 'Cleaning Solution Kit',
      price: 34,
      category: 'Cleaning',
      compatibility: 'Universal',
      image: '/placeholder.jpg',
      description: 'Professional cleaning kit with isopropyl alcohol, microfiber cloths, and precision applicators.',
      warranty: 'N/A',
      inStock: true
    },
    {
      id: 'o6',
      title: 'Screen Protector Applicator Tool',
      price: 16,
      category: 'Tools',
      compatibility: 'Universal',
      image: '/placeholder.jpg',
      description: 'Professional alignment tool for perfect screen protector installation without bubbles or misalignment.',
      warranty: 'Lifetime',
      inStock: false
    },
    {
      id: 'o7',
      title: 'USB-C Diagnostic Cable',
      price: 39,
      category: 'Accessories',
      compatibility: 'USB-C Devices',
      image: '/placeholder.jpg',
      description: 'Multi-function diagnostic cable with data transfer, charging, and device identification capabilities.',
      warranty: '90 Days',
      inStock: true
    },
    {
      id: 'o8',
      title: 'Component Storage Case',
      price: 29,
      category: 'Accessories',
      compatibility: 'Universal',
      image: '/placeholder.jpg',
      description: 'Organized storage case with compartments for screws, connectors, and small electronic components.',
      warranty: 'Lifetime',
      inStock: true
    }
  ];

  // Sample Game Console parts data
  const sampleGameConsoleParts = [
    {
      id: 'gc1',
      title: 'PlayStation 5 Slim Blu-ray Drive Assembly',
      price: 189,
      category: 'Drives',
      compatibility: 'PS5/PS5 Slim',
      image: '/placeholder.jpg',
      description: 'Complete Blu-ray optical drive assembly with laser mechanism and mounting hardware.',
      warranty: '90 Days',
      inStock: true
    },
    {
      id: 'gc2',
      title: 'Xbox Series X HDMI Expansion Card',
      price: 49,
      category: 'Expansion',
      compatibility: 'Xbox Series X/S',
      image: '/placeholder.jpg',
      description: 'Official HDMI expansion card for additional HDMI ports and connectivity options.',
      warranty: '90 Days',
      inStock: true
    },
    {
      id: 'gc3',
      title: 'Nintendo Switch OLED Display Panel',
      price: 129,
      category: 'Displays',
      compatibility: 'Nintendo Switch OLED',
      image: '/placeholder.jpg',
      description: '7-inch OLED display panel with vibrant colors and improved contrast ratio.',
      warranty: '60 Days',
      inStock: true
    },
    {
      id: 'gc4',
      title: 'PlayStation 5 Controller Charging Dock',
      price: 79,
      category: 'Accessories',
      compatibility: 'DualSense Controllers',
      image: '/placeholder.jpg',
      description: 'Dual charging dock for PlayStation 5 controllers with USB-C charging ports.',
      warranty: '1 Year',
      inStock: false
    },
    {
      id: 'gc5',
      title: 'Xbox Wireless Adapter for Windows',
      price: 29,
      category: 'Connectivity',
      compatibility: 'Xbox One/Series Controllers',
      image: '/placeholder.jpg',
      description: 'USB wireless adapter for connecting Xbox controllers to Windows PC gaming.',
      warranty: '90 Days',
      inStock: true
    },
    {
      id: 'gc6',
      title: 'PlayStation 4 Pro Motherboard Repair',
      price: 159,
      category: 'Logic Boards',
      compatibility: 'PS4 Pro',
      image: '/placeholder.jpg',
      description: 'Refurbished PS4 Pro motherboard with tested APU and all connectivity features.',
      warranty: '30 Days',
      inStock: true
    },
    {
      id: 'gc7',
      title: 'Nintendo Switch Joy-Con Repair Kit',
      price: 89,
      category: 'Controllers',
      compatibility: 'Nintendo Switch',
      image: '/placeholder.jpg',
      description: 'Complete Joy-Con repair kit with replacement buttons, sticks, and housing.',
      warranty: '60 Days',
      inStock: true
    },
    {
      id: 'gc8',
      title: 'Gaming Headset Microphone Assembly',
      price: 39,
      category: 'Audio',
      compatibility: 'Universal Gaming Headsets',
      image: '/placeholder.jpg',
      description: 'Replacement microphone boom with noise-canceling capabilities for gaming headsets.',
      warranty: '90 Days',
      inStock: true
    }
  ];

  // Sample Accessories data
  const sampleAccessories = [
    {
      id: 'acc1',
      title: 'Universal Screen Protector Kit',
      price: 19,
      category: 'Protection',
      compatibility: 'Most smartphones (4.7"-6.9" screens)',
      image: '/placeholder.jpg',
      description: 'Premium tempered glass screen protectors with easy installation kit. Includes cleaning cloth and alignment tool.',
      warranty: '30 Days',
      inStock: true
    },
    {
      id: 'acc2',
      title: 'USB-C to Lightning Cable - 6ft',
      price: 24,
      category: 'Cables',
      compatibility: 'USB-C devices to Lightning',
      image: '/placeholder.jpg',
      description: 'High-speed MFi certified USB-C to Lightning cable with fast charging support and durable braided design.',
      warranty: '1 Year',
      inStock: true
    },
    {
      id: 'acc3',
      title: 'Wireless Charging Pad - 15W',
      price: 39,
      category: 'Charging',
      compatibility: 'Qi-compatible devices',
      image: '/placeholder.jpg',
      description: 'Fast wireless charging pad with LED indicator and overheat protection. Compatible with all Qi-enabled devices.',
      warranty: '1 Year',
      inStock: true
    },
    {
      id: 'acc4',
      title: 'Phone Stand & Holder Combo',
      price: 16,
      category: 'Stands',
      compatibility: 'Most smartphones and tablets',
      image: '/placeholder.jpg',
      description: 'Adjustable aluminum phone stand with multiple viewing angles and non-slip base for stable positioning.',
      warranty: 'Lifetime',
      inStock: true
    },
    {
      id: 'acc5',
      title: 'Privacy Screen Protector - Matte',
      price: 29,
      category: 'Protection',
      compatibility: 'Most smartphones',
      image: '/placeholder.jpg',
      description: 'Anti-glare privacy screen protector that prevents visual hacking from side angles while maintaining touch sensitivity.',
      warranty: '60 Days',
      inStock: false
    },
    {
      id: 'acc6',
      title: 'Car Phone Mount with Suction Cup',
      price: 22,
      category: 'Mounts',
      compatibility: 'Most smartphones',
      image: '/placeholder.jpg',
      description: 'Strong suction cup car mount with adjustable arm and 360-degree rotation for perfect viewing angle.',
      warranty: '90 Days',
      inStock: true
    },
    {
      id: 'acc7',
      title: 'Portable Power Bank - 20000mAh',
      price: 49,
      category: 'Power',
      compatibility: 'USB-C and Lightning devices',
      image: '/placeholder.jpg',
      description: 'High-capacity power bank with dual USB outputs, fast charging, and LED battery indicator.',
      warranty: '1 Year',
      inStock: true
    },
    {
      id: 'acc8',
      title: 'Bluetooth Earbuds Case - Silicone',
      price: 12,
      category: 'Cases',
      compatibility: 'Most wireless earbuds',
      image: '/placeholder.jpg',
      description: 'Protective silicone case for wireless earbuds with keychain attachment and secure magnetic closure.',
      warranty: '90 Days',
      inStock: true
    }
  ];

  // Sample Refurbishing Parts data
  const sampleRefurbishingParts = [
    {
      id: 'rf1',
      title: 'Refurbished iPhone 12 Display Assembly',
      price: 89,
      category: 'Displays',
      compatibility: 'iPhone 12',
      image: '/placeholder.jpg',
      description: 'Refurbished OLED display with Touch ID, tested for functionality and appearance. Minor cosmetic wear.',
      warranty: '90 Days',
      inStock: true
    },
    {
      id: 'rf2',
      title: 'Reconditioned Samsung A52 Battery',
      price: 35,
      category: 'Batteries',
      compatibility: 'Samsung Galaxy A52',
      image: '/placeholder.jpg',
      description: 'Refurbished lithium-ion battery with 85%+ capacity. Tested for safety and performance.',
      warranty: '60 Days',
      inStock: true
    },
    {
      id: 'rf3',
      title: 'Remanufactured Google Pixel 6 Motherboard',
      price: 149,
      category: 'Logic Boards',
      compatibility: 'Google Pixel 6',
      image: '/placeholder.jpg',
      description: 'Refurbished system board with Tensor chip, tested for all functions and connectivity.',
      warranty: '30 Days',
      inStock: true
    },
    {
      id: 'rf4',
      title: 'Restored PlayStation 4 Slim Blu-ray Drive',
      price: 65,
      category: 'Drives',
      compatibility: 'PS4/PS4 Slim',
      image: '/placeholder.jpg',
      description: 'Refurbished optical drive mechanism, tested for reading and writing capabilities.',
      warranty: '90 Days',
      inStock: false
    },
    {
      id: 'rf5',
      title: 'Renovated MacBook Air 13" Keyboard',
      price: 79,
      category: 'Keyboards',
      compatibility: 'MacBook Air 13" (M1/M2)',
      image: '/placeholder.jpg',
      description: 'Refurbished keyboard assembly with backlight, includes Touch ID and function row.',
      warranty: '90 Days',
      inStock: true
    },
    {
      id: 'rf6',
      title: 'Reconditioned Nintendo Switch Joy-Con Set',
      price: 45,
      category: 'Controllers',
      compatibility: 'Nintendo Switch',
      image: '/placeholder.jpg',
      description: 'Refurbished Joy-Con controllers, tested for button response and connectivity. Includes rails.',
      warranty: '60 Days',
      inStock: true
    },
    {
      id: 'rf7',
      title: 'Restored Xiaomi Mi 11 Display Panel',
      price: 99,
      category: 'Displays',
      compatibility: 'Xiaomi Mi 11',
      image: '/placeholder.jpg',
      description: 'Refurbished AMOLED display with under-display fingerprint, tested for touch and display functions.',
      warranty: '90 Days',
      inStock: true
    },
    {
      id: 'rf8',
      title: 'Renovated Lenovo ThinkPad Keyboard',
      price: 39,
      category: 'Keyboards',
      compatibility: 'ThinkPad T14s/T15',
      image: '/placeholder.jpg',
      description: 'Refurbished keyboard with TrackPoint, tested for all key functions and backlight.',
      warranty: '90 Days',
      inStock: true
    }
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">{displayTitle}</h1>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
            {/* Pre-Owned Devices Subcategories Filter */}
            {isPreOwnedCategory && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Filter by Device Type</h2>
                <div className="space-y-2">
                  <Link
                    href="/products?category=pre-owned"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      !window.location.search.includes('type=')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    All Pre-Owned
                  </Link>
                  <Link
                    href="/products?category=pre-owned&type=phones"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('type=phones')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Smartphones
                  </Link>
                  <Link
                    href="/products?category=pre-owned&type=tablets"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('type=tablets')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Tablets
                  </Link>
                  <Link
                    href="/products?category=pre-owned&type=laptops"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('type=laptops')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Laptops
                  </Link>
                  <Link
                    href="/products?category=pre-owned&type=wearables"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('type=wearables')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Wearables
                  </Link>
                  <Link
                    href="/products?category=pre-owned&type=accessories"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('type=accessories')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Accessories
                  </Link>
                </div>
              </div>
            )}

            {/* Additional Pre-Owned Condition Filter */}
            {isPreOwnedCategory && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Filter by Condition</h2>
                <div className="space-y-2">
                  <Link
                    href="/products?category=pre-owned"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      !window.location.search.includes('condition=')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    All Conditions
                  </Link>
                  <Link
                    href="/products?category=pre-owned&condition=excellent"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('condition=excellent')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Excellent
                  </Link>
                  <Link
                    href="/products?category=pre-owned&condition=very-good"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('condition=very-good')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Very Good
                  </Link>
                  <Link
                    href="/products?category=pre-owned&condition=good"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('condition=good')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Good
                  </Link>
                </div>
              </div>
            )}

            {/* Additional Pre-Owned Price Filter */}
            {isPreOwnedCategory && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Filter by Price</h2>
                <div className="space-y-2">
                  <Link
                    href="/products?category=pre-owned"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      !window.location.search.includes('price=')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    All Prices
                  </Link>
                  <Link
                    href="/products?category=pre-owned&price=under-100"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('price=under-100')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Under $100
                  </Link>
                  <Link
                    href="/products?category=pre-owned&price=100-300"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('price=100-300')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    $100 - $300
                  </Link>
                  <Link
                    href="/products?category=pre-owned&price=300-600"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('price=300-600')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    $300 - $600
                  </Link>
                  <Link
                    href="/products?category=pre-owned&price=over-600"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('price=over-600')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Over $600
                  </Link>
                </div>
              </div>
            )}
            {/* Apple Subcategories Filter */}
            {isAppleCategory && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Filter by Product Type</h2>
                <div className="space-y-2">
                  {appleSubcategories.map((subcategory) => (
                    <Link
                      key={subcategory.name}
                      href={subcategory.href}
                      className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        window.location.pathname + window.location.search === subcategory.href
                          ? 'bg-[#D4AF37] text-white'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Samsung Subcategories Filter */}
            {isSamsungCategory && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Filter by Product Type</h2>
                <div className="space-y-2">
                  {samsungSubcategories.map((subcategory) => (
                    <Link
                      key={subcategory.name}
                      href={subcategory.href}
                      className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        window.location.pathname + window.location.search === subcategory.href
                          ? 'bg-[#D4AF37] text-white'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Motorola Subcategories Filter */}
            {isMotorolaCategory && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Filter by Product Type</h2>
                <div className="space-y-2">
                  {motorolaSubcategories.map((subcategory) => (
                    <Link
                      key={subcategory.name}
                      href={subcategory.href}
                      className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        window.location.pathname + window.location.search === subcategory.href
                          ? 'bg-[#D4AF37] text-white'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Google Subcategories Filter */}
            {isGoogleCategory && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Filter by Product Type</h2>
                <div className="space-y-2">
                  {googleSubcategories.map((subcategory) => (
                    <Link
                      key={subcategory.name}
                      href={subcategory.href}
                      className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        window.location.pathname + window.location.search === subcategory.href
                          ? 'bg-[#D4AF37] text-white'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Other Parts Subcategories Filter */}
            {isOtherPartsCategory && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Filter by Tool Type</h2>
                <div className="space-y-2">
                  <Link
                    href="/products?category=other-parts"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      !window.location.search.includes('type=')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    All Tools & Parts
                  </Link>
                  <Link
                    href="/products?category=other-parts&type=repair-tools"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('type=repair-tools')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Repair Tools
                  </Link>
                  <Link
                    href="/products?category=other-parts&type=diagnostic-equipment"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('type=diagnostic-equipment')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Diagnostic Equipment
                  </Link>
                  <Link
                    href="/products?category=other-parts&type=safety-gear"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('type=safety-gear')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Safety Gear
                  </Link>
                </div>
              </div>
            )}

            {/* Game Console Subcategories Filter */}
            {isGameConsoleCategory && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Filter by Console</h2>
                <div className="space-y-2">
                  <Link
                    href="/products?category=game-console"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      !window.location.search.includes('console=')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    All Consoles
                  </Link>
                  <Link
                    href="/products?category=game-console&console=playstation"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('console=playstation')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    PlayStation
                  </Link>
                  <Link
                    href="/products?category=game-console&console=xbox"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('console=xbox')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Xbox
                  </Link>
                  <Link
                    href="/products?category=game-console&console=nintendo"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('console=nintendo')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Nintendo
                  </Link>
                  <Link
                    href="/products?category=game-console&console=accessories"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('console=accessories')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Accessories
                  </Link>
                </div>
              </div>
            )}

            {/* Accessories Subcategories Filter */}
            {isAccessoriesCategory && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Filter by Accessory Type</h2>
                <div className="space-y-2">
                  <Link
                    href="/products?category=accessories"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      !window.location.search.includes('type=')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    All Accessories
                  </Link>
                  <Link
                    href="/products?category=accessories&type=cables"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('type=cables')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Cables & Adapters
                  </Link>
                  <Link
                    href="/products?category=accessories&type=chargers"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('type=chargers')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Chargers & Power
                  </Link>
                  <Link
                    href="/products?category=accessories&type=cases"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('type=cases')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Cases & Protection
                  </Link>
                  <Link
                    href="/products?category=accessories&type=audio"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('type=audio')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Audio & Speakers
                  </Link>
                  <Link
                    href="/products?category=accessories&type=mounts"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('type=mounts')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Mounts & Stands
                  </Link>
                </div>
              </div>
            )}

            {/* Tools & Supplies Subcategories Filter */}
            {isToolsSuppliesCategory && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Filter by Tool Category</h2>
                <div className="space-y-2">
                  <Link
                    href="/products?category=tools-supplies"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      !window.location.search.includes('type=')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    All Tools
                  </Link>
                  <Link
                    href="/products?category=tools-supplies&type=repair-kits"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('type=repair-kits')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Repair Kits
                  </Link>
                  <Link
                    href="/products?category=tools-supplies&type=screwdrivers"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('type=screwdrivers')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Screwdrivers & Bits
                  </Link>
                  <Link
                    href="/products?category=tools-supplies&type=heating-tools"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('type=heating-tools')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Heating Tools
                  </Link>
                  <Link
                    href="/products?category=tools-supplies&type=cleaning"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('type=cleaning')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Cleaning Supplies
                  </Link>
                  <Link
                    href="/products?category=tools-supplies&type=testing"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('type=testing')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Testing Equipment
                  </Link>
                </div>
              </div>
            )}

            {/* Refurbishing Subcategories Filter */}
            {isRefurbishingCategory && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Filter by Condition</h2>
                <div className="space-y-2">
                  <Link
                    href="/products?category=refurbishing"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      !window.location.search.includes('condition=')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    All Refurbished
                  </Link>
                  <Link
                    href="/products?category=refurbishing&condition=excellent"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('condition=excellent')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Excellent Condition
                  </Link>
                  <Link
                    href="/products?category=refurbishing&condition=very-good"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('condition=very-good')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Very Good Condition
                  </Link>
                  <Link
                    href="/products?category=refurbishing&condition=good"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('condition=good')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Good Condition
                  </Link>
                </div>
              </div>
            )}

            {/* Board Components Additional Filters */}
            {isBoardComponentsCategory && !window.location.search.includes('subcategory=iphone') && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Filter by Device Type</h2>
                <div className="space-y-2">
                  <Link
                    href="/products?category=board-components"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      !window.location.search.includes('subcategory=')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    All Board Components
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=android"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('subcategory=android')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Android Devices
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=macbook"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('subcategory=macbook')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    MacBooks
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=windows"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('subcategory=windows')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Windows Laptops
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=gaming"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      window.location.search.includes('subcategory=gaming')
                        ? 'bg-[#D4AF37] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    Gaming Consoles
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {isPreOwnedCategory ? (
          <>
            {/* Pre-Owned Devices Introduction */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Quality Pre-Owned Devices</h2>
                <p className="text-gray-700 max-w-3xl mx-auto">
                  Discover our carefully inspected pre-owned devices. Each item undergoes rigorous testing
                  and comes with a 30-day warranty for your peace of mind. Save money while getting
                  premium technology that's nearly new.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Inspected</h3>
                  <p className="text-sm text-gray-600">Rigorous quality testing</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Warranted</h3>
                  <p className="text-sm text-gray-600">30-day warranty</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Savings</h3>
                  <p className="text-sm text-gray-600">Up to 40% off retail</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Fast</h3>
                  <p className="text-sm text-gray-600">Quick delivery</p>
                </div>
              </div>

              {/* Condition Legend */}
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Condition Guide</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Like New - Minimal use</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Excellent - Light wear</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Very Good - Some wear</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>Good - Noticeable wear</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pre-Owned Devices Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {samplePreOwnedDevices.map((device) => (
                <div key={device.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={device.image}
                      alt={device.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Condition Badge */}
                    <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white ${
                      device.condition === 'Like New' ? 'bg-green-500' :
                      device.condition === 'Excellent' ? 'bg-blue-500' :
                      device.condition === 'Very Good' ? 'bg-yellow-500' :
                      'bg-orange-500'
                    }`}>
                      {device.condition}
                    </div>
                    {/* Savings Badge */}
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Save ${(device.originalPrice - device.price).toLocaleString()}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{device.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{device.description}</p>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-gray-900">${device.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-500 line-through">${device.originalPrice.toLocaleString()}</span>
                      <span className="text-sm text-green-600 font-medium">
                        {Math.round(((device.originalPrice - device.price) / device.originalPrice) * 100)}% off
                      </span>
                    </div>

                    {/* Warranty */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {device.warranty} Warranty
                    </div>

                    {/* Add to Cart Button */}
                    <button className="w-full bg-[#D4AF37] hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="bg-gray-900 text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Don't See What You're Looking For?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Our inventory is constantly updating. Contact us to inquire about specific devices
                or to be notified when new pre-owned items become available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Contact Us
                </button>
                <button className="border border-gray-600 hover:border-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Browse All Products
                </button>
              </div>
            </div>
          </>
        ) : isAppleCategory ? (
          <>
            {/* Apple Parts Introduction */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8 mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium Apple Parts</h2>
                <p className="text-gray-700 max-w-3xl mx-auto">
                  High-quality replacement parts for Apple devices. All parts are tested for compatibility
                  and performance, ensuring reliable repairs for iPhones, iPads, Macs, and Apple Watches.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Genuine Quality</h3>
                  <p className="text-sm text-gray-600">Original specifications</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Tested</h3>
                  <p className="text-sm text-gray-600">Rigorous testing</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Warranted</h3>
                  <p className="text-sm text-gray-600">30-90 day warranty</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Fast Shipping</h3>
                  <p className="text-sm text-gray-600">Quick delivery</p>
                </div>
              </div>

              {/* Category Legend */}
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Part Categories</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Displays & Screens</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Batteries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Logic Boards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>Other Components</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Apple Parts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {sampleAppleParts.map((part) => (
                <div key={part.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={part.image}
                      alt={part.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Category Badge */}
                    <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white ${
                      part.category === 'Displays' ? 'bg-blue-500' :
                      part.category === 'Batteries' ? 'bg-green-500' :
                      part.category === 'Logic Boards' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`}>
                      {part.category}
                    </div>
                    {/* Stock Status */}
                    {part.inStock ? (
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        In Stock
                      </div>
                    ) : (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{part.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{part.compatibility}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{part.description}</p>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-gray-900">${part.price}</span>
                    </div>

                    {/* Warranty */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {part.warranty} Warranty
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      className={`w-full font-medium py-2 px-4 rounded-lg transition-colors ${
                        part.inStock
                          ? 'bg-[#D4AF37] hover:bg-yellow-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!part.inStock}
                    >
                      {part.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Need Help Finding the Right Part?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Our technical support team can help you identify the correct replacement part for your Apple device.
                We also offer repair services and installation guides.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Get Technical Support
                </button>
                <button className="border border-gray-600 hover:border-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Browse All Categories
                </button>
              </div>
            </div>
          </>
        ) : isSamsungCategory ? (
          <>
            {/* Samsung Parts Introduction */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium Samsung Parts</h2>
                <p className="text-gray-700 max-w-3xl mx-auto">
                  High-quality replacement parts for Samsung devices. All parts are tested for compatibility
                  and performance, ensuring reliable repairs for Galaxy phones, tablets, and wearables.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Genuine Quality</h3>
                  <p className="text-sm text-gray-600">Original Samsung specs</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Tested</h3>
                  <p className="text-sm text-gray-600">Rigorous testing</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Warranted</h3>
                  <p className="text-sm text-gray-600">30-90 day warranty</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Fast Shipping</h3>
                  <p className="text-sm text-gray-600">Quick delivery</p>
                </div>
              </div>

              {/* Category Legend */}
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Part Categories</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Displays & Screens</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Batteries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Logic Boards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>Other Components</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Samsung Parts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {sampleSamsungParts.map((part) => (
                <div key={part.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={part.image}
                      alt={part.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Category Badge */}
                    <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white ${
                      part.category === 'Displays' ? 'bg-blue-500' :
                      part.category === 'Batteries' ? 'bg-green-500' :
                      part.category === 'Logic Boards' ? 'bg-purple-500' :
                      part.category === 'Laptops' ? 'bg-orange-500' :
                      'bg-purple-500'
                    }`}>
                      {part.category}
                    </div>
                    {/* Stock Status */}
                    {part.inStock ? (
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        In Stock
                      </div>
                    ) : (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{part.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{part.compatibility}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{part.description}</p>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-gray-900">${part.price}</span>
                    </div>

                    {/* Warranty */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {part.warranty} Warranty
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      className={`w-full font-medium py-2 px-4 rounded-lg transition-colors ${
                        part.inStock
                          ? 'bg-[#D4AF37] hover:bg-yellow-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!part.inStock}
                    >
                      {part.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-800 to-green-800 text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Need Help Finding the Right Part?</h3>
              <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                Our technical support team can help you identify the correct replacement part for your Samsung device.
                We also offer repair services and installation guides.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Get Technical Support
                </button>
                <button className="border border-gray-400 hover:border-gray-200 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Browse All Categories
                </button>
              </div>
            </div>
          </>
        ) : isMotorolaCategory ? (
          <>
            {/* Motorola Parts Introduction */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8 mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium Motorola Parts</h2>
                <p className="text-gray-700 max-w-3xl mx-auto">
                  High-quality replacement parts for Motorola devices. All parts are tested for compatibility
                  and performance, ensuring reliable repairs for Moto phones, tablets, and wearables.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Genuine Quality</h3>
                  <p className="text-sm text-gray-600">Original Motorola specs</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Tested</h3>
                  <p className="text-sm text-gray-600">Rigorous testing</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Warranted</h3>
                  <p className="text-sm text-gray-600">30-90 day warranty</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Fast Shipping</h3>
                  <p className="text-sm text-gray-600">Quick delivery</p>
                </div>
              </div>

              {/* Category Legend */}
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Part Categories</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Displays & Screens</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>Batteries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Logic Boards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Other Components</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Motorola Parts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {sampleMotorolaParts.map((part) => (
                <div key={part.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={part.image}
                      alt={part.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Category Badge */}
                    <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white ${
                      part.category === 'Displays' ? 'bg-red-500' :
                      part.category === 'Batteries' ? 'bg-orange-500' :
                      part.category === 'Logic Boards' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}>
                      {part.category}
                    </div>
                    {/* Stock Status */}
                    {part.inStock ? (
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        In Stock
                      </div>
                    ) : (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{part.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{part.compatibility}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{part.description}</p>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-gray-900">${part.price}</span>
                    </div>

                    {/* Warranty */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {part.warranty} Warranty
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      className={`w-full font-medium py-2 px-4 rounded-lg transition-colors ${
                        part.inStock
                          ? 'bg-[#D4AF37] hover:bg-yellow-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!part.inStock}
                    >
                      {part.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-red-800 to-orange-800 text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Need Help Finding the Right Part?</h3>
              <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                Our technical support team can help you identify the correct replacement part for your Motorola device.
                We also offer repair services and installation guides.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Get Technical Support
                </button>
                <button className="border border-gray-400 hover:border-gray-200 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Browse All Categories
                </button>
              </div>
            </div>
          </>
        ) : isGoogleCategory ? (
          <>
            {/* Google Pixel Parts Introduction */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium Google Pixel Parts</h2>
                <p className="text-gray-700 max-w-3xl mx-auto">
                  High-quality replacement parts for Google Pixel devices. All parts are tested for compatibility
                  and performance, ensuring reliable repairs for Pixel phones, tablets, and wearables.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Genuine Quality</h3>
                  <p className="text-sm text-gray-600">Original Google specs</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">AI Optimized</h3>
                  <p className="text-sm text-gray-600">Tensor chip compatibility</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Warranted</h3>
                  <p className="text-sm text-gray-600">30-90 day warranty</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Fast Shipping</h3>
                  <p className="text-sm text-gray-600">Quick delivery</p>
                </div>
              </div>

              {/* Category Legend */}
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Part Categories</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Displays & Screens</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <span>Batteries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Logic Boards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>Other Components</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Pixel Parts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {sampleGoogleParts.map((part) => (
                <div key={part.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={part.image}
                      alt={part.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Category Badge */}
                    <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white ${
                      part.category === 'Displays' ? 'bg-blue-500' :
                      part.category === 'Batteries' ? 'bg-cyan-500' :
                      part.category === 'Logic Boards' ? 'bg-green-500' :
                      'bg-orange-500'
                    }`}>
                      {part.category}
                    </div>
                    {/* Stock Status */}
                    {part.inStock ? (
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        In Stock
                      </div>
                    ) : (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{part.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{part.compatibility}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{part.description}</p>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-gray-900">${part.price}</span>
                    </div>

                    {/* Warranty */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {part.warranty} Warranty
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      className={`w-full font-medium py-2 px-4 rounded-lg transition-colors ${
                        part.inStock
                          ? 'bg-[#D4AF37] hover:bg-yellow-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!part.inStock}
                    >
                      {part.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-800 to-cyan-800 text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Need Help Finding the Right Part?</h3>
              <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                Our technical support team can help you identify the correct replacement part for your Google Pixel device.
                We also offer repair services and installation guides.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Get Technical Support
                </button>
                <button className="border border-gray-400 hover:border-gray-200 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Browse All Categories
                </button>
              </div>
            </div>
          </>
        ) : isOtherPartsCategory ? (
          <>
            {/* Other Parts Introduction */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Repair Tools & Accessories</h2>
                <p className="text-gray-700 max-w-3xl mx-auto">
                  Essential tools and accessories for professional device repair technicians.
                  High-quality equipment designed for precision work and safety.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Professional Grade</h3>
                  <p className="text-sm text-gray-600">Industry-standard tools</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Precision Tools</h3>
                  <p className="text-sm text-gray-600">Exact measurements</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Safety First</h3>
                  <p className="text-sm text-gray-600">ESD protection included</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Reliable</h3>
                  <p className="text-sm text-gray-600">Built to last</p>
                </div>
              </div>

              {/* Category Legend */}
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Tool Categories</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Tools & Equipment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                    <span>Accessories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                    <span>Safety Equipment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                    <span>Cleaning Supplies</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Parts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {sampleOtherParts.map((part) => (
                <div key={part.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={part.image}
                      alt={part.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Category Badge */}
                    <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white ${
                      part.category === 'Tools' ? 'bg-purple-500' :
                      part.category === 'Accessories' ? 'bg-pink-500' :
                      part.category === 'Safety' ? 'bg-indigo-500' :
                      'bg-teal-500'
                    }`}>
                      {part.category}
                    </div>
                    {/* Stock Status */}
                    {part.inStock ? (
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        In Stock
                      </div>
                    ) : (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{part.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{part.compatibility}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{part.description}</p>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-gray-900">${part.price}</span>
                    </div>

                    {/* Warranty */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {part.warranty} Warranty
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      className={`w-full font-medium py-2 px-4 rounded-lg transition-colors ${
                        part.inStock
                          ? 'bg-[#D4AF37] hover:bg-yellow-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!part.inStock}
                    >
                      {part.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-purple-800 to-pink-800 text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Complete Your Repair Setup</h3>
              <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                Equip yourself with professional-grade tools and accessories for reliable device repairs.
                Our comprehensive toolkit selection ensures you have everything needed for success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  View All Tools
                </button>
                <button className="border border-gray-400 hover:border-gray-200 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Get Repair Guide
                </button>
              </div>
            </div>
          </>
        ) : isGameConsoleCategory ? (
          <>
            {/* Game Console Parts Introduction */}
            <div className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-xl p-8 mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Gaming Console Parts & Accessories</h2>
                <p className="text-gray-700 max-w-3xl mx-auto">
                  Premium replacement parts and accessories for gaming consoles. All components are tested
                  for compatibility and performance, ensuring your gaming setup stays at peak performance.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Genuine Parts</h3>
                  <p className="text-sm text-gray-600">Original manufacturer specs</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Performance</h3>
                    <p className="text-sm text-gray-600">Optimized for gaming</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Warranted</h3>
                  <p className="text-sm text-gray-600">30-90 day warranty</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Fast Shipping</h3>
                  <p className="text-sm text-gray-600">Quick delivery</p>
                </div>
              </div>

              {/* Category Legend */}
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Console Categories</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Drives & Storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Displays & Screens</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Accessories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Other Components</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Game Console Parts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {sampleGameConsoleParts.map((part) => (
                <div key={part.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={part.image}
                      alt={part.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Category Badge */}
                    <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white ${
                      part.category === 'Drives' ? 'bg-red-500' :
                      part.category === 'Displays' ? 'bg-yellow-500' :
                      part.category === 'Accessories' ? 'bg-green-500' :
                      part.category === 'Expansion' ? 'bg-blue-500' :
                      part.category === 'Logic Boards' ? 'bg-purple-500' :
                      part.category === 'Controllers' ? 'bg-orange-500' :
                      'bg-teal-500'
                    }`}>
                      {part.category}
                    </div>
                    {/* Stock Status */}
                    {part.inStock ? (
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        In Stock
                      </div>
                    ) : (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{part.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{part.compatibility}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{part.description}</p>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-gray-900">${part.price}</span>
                    </div>

                    {/* Warranty */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {part.warranty} Warranty
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      className={`w-full font-medium py-2 px-4 rounded-lg transition-colors ${
                        part.inStock
                          ? 'bg-[#D4AF37] hover:bg-yellow-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!part.inStock}
                    >
                      {part.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-red-800 to-yellow-800 text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Keep Your Gaming Setup Running</h3>
              <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                Don't let a broken console ruin your gaming experience. Our certified parts
                and accessories ensure your gaming setup stays at peak performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Shop Gaming Parts
                </button>
                <button className="border border-gray-400 hover:border-gray-200 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Repair Services
                </button>
              </div>
            </div>
          </>
        ) : isAccessoriesCategory ? (
          <>
            {/* Accessories Introduction */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-8 mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium Device Accessories</h2>
                <p className="text-gray-700 max-w-3xl mx-auto">
                  Essential accessories to enhance your device experience. High-quality protective gear,
                  connectivity solutions, and convenience items for all your devices.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Protection</h3>
                  <p className="text-sm text-gray-600">Premium screen protection</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Connectivity</h3>
                  <p className="text-sm text-gray-600">Universal compatibility</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Convenience</h3>
                  <p className="text-sm text-gray-600">Everyday essentials</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Quality</h3>
                  <p className="text-sm text-gray-600">Premium materials</p>
                </div>
              </div>

              {/* Category Legend */}
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Accessory Categories</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span>Protection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                    <span>Cables & Connectors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <span>Charging & Power</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-lime-500 rounded-full"></div>
                    <span>Mounts & Stands</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Accessories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {sampleAccessories.map((accessory) => (
                <div key={accessory.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={accessory.image}
                      alt={accessory.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Category Badge */}
                    <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white ${
                      accessory.category === 'Protection' ? 'bg-emerald-500' :
                      accessory.category === 'Cables' ? 'bg-teal-500' :
                      accessory.category === 'Charging' ? 'bg-cyan-500' :
                      accessory.category === 'Stands' ? 'bg-lime-500' :
                      accessory.category === 'Power' ? 'bg-orange-500' :
                      accessory.category === 'Mounts' ? 'bg-purple-500' :
                      'bg-indigo-500'
                    }`}>
                      {accessory.category}
                    </div>
                    {/* Stock Status */}
                    {accessory.inStock ? (
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        In Stock
                      </div>
                    ) : (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{accessory.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{accessory.compatibility}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{accessory.description}</p>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-gray-900">${accessory.price}</span>
                    </div>

                    {/* Warranty */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {accessory.warranty} Warranty
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      className={`w-full font-medium py-2 px-4 rounded-lg transition-colors ${
                        accessory.inStock
                          ? 'bg-[#D4AF37] hover:bg-yellow-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!accessory.inStock}
                    >
                      {accessory.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Enhance Your Device Experience</h3>
              <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                Protect and optimize your devices with our premium accessories. From screen protectors
                to charging solutions, find everything you need to get the most out of your technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Shop All Accessories
                </button>
                <button className="border border-gray-400 hover:border-gray-200 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Compatibility Guide
                </button>
              </div>
            </div>
          </>
        ) : isToolsSuppliesCategory ? (
          <>
            {/* Tools & Supplies Introduction */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-8 mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Tools & Supplies</h2>
                <p className="text-gray-700 max-w-3xl mx-auto">
                  Essential tools and supplies for professional device repair technicians.
                  High-quality equipment designed for precision work and reliable performance.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Professional Grade</h3>
                  <p className="text-sm text-gray-600">Industry-standard tools</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Precision Tools</h3>
                  <p className="text-sm text-gray-600">Exact measurements</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Safety First</h3>
                  <p className="text-sm text-gray-600">ESD protection included</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Reliable</h3>
                  <p className="text-sm text-gray-600">Built to last</p>
                </div>
              </div>

              {/* Category Legend */}
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Tool Categories</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <span>Tools & Equipment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>Accessories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Safety Equipment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Cleaning Supplies</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tools & Supplies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {sampleOtherParts.map((tool) => (
                <div key={tool.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={tool.image}
                      alt={tool.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Category Badge */}
                    <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white ${
                      tool.category === 'Tools' ? 'bg-amber-500' :
                      tool.category === 'Accessories' ? 'bg-orange-500' :
                      tool.category === 'Safety' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}>
                      {tool.category}
                    </div>
                    {/* Stock Status */}
                    {tool.inStock ? (
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        In Stock
                      </div>
                    ) : (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{tool.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{tool.compatibility}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tool.description}</p>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-gray-900">${tool.price}</span>
                    </div>

                    {/* Warranty */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {tool.warranty} Warranty
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      className={`w-full font-medium py-2 px-4 rounded-lg transition-colors ${
                        tool.inStock
                          ? 'bg-[#D4AF37] hover:bg-yellow-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!tool.inStock}
                    >
                      {tool.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-amber-800 to-orange-800 text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Complete Your Repair Setup</h3>
              <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                Equip yourself with professional-grade tools and accessories for reliable device repairs.
                Our comprehensive toolkit selection ensures you have everything needed for success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  View All Tools
                </button>
                <button className="border border-gray-400 hover:border-gray-200 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Get Repair Guide
                </button>
              </div>
            </div>
          </>
        ) : isBoardComponentsCategory ? (
          <>
            {/* Board Components Subcategories Filter */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Filter by Device Type</h2>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/products?category=board-components"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    !window.location.search.includes('subcategory')
                      ? 'bg-[#D4AF37] text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  All Board Components
                </Link>
                <Link
                  href="/products?category=board-components&subcategory=iphone"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    window.location.search.includes('subcategory=iphone')
                      ? 'bg-[#D4AF37] text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  iPhone
                </Link>
                {/* Add more device types here as needed */}
              </div>
            </div>

            {/* iPhone Subcategories (only show when iPhone is selected) */}
            {window.location.search.includes('subcategory=iphone') && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">iPhone Models</h3>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=bulk-10-pack"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=bulk-10-pack')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Bulk Purchase (10 Pack)
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-16-pro-max"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-16-pro-max')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 16 Pro Max
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-16-pro"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-16-pro')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 16 Pro
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-16-plus"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-16-plus')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 16 Plus
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-16"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-16')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 16
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-15-pro-max"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-15-pro-max')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 15 Pro Max
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-15-pro"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-15-pro')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 15 Pro
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-15-plus"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-15-plus')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 15 Plus
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-15"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-15')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 15
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-14-pro-max"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-14-pro-max')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 14 Pro Max
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-14-pro"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-14-pro')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 14 Pro
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-14-plus"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-14-plus')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 14 Plus
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-14"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-14')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 14
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-13-pro-max"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-13-pro-max')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 13 Pro Max
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-13-pro"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-13-pro')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 13 Pro
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-13"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-13')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 13
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-13-mini"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-13-mini')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 13 Mini
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-12-pro-max"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-12-pro-max')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 12 Pro Max
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-12-pro"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-12-pro')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 12 Pro
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-12"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-12')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 12
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-12-mini"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-12-mini')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 12 Mini
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-11-pro-max"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-11-pro-max')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 11 Pro Max
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-11-pro"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-11-pro')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 11 Pro
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-11"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-11')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 11
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-xs-max"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-xs-max')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone XS Max
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-xs"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-xs')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone XS
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-xr"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-xr')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone XR
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-x"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-x')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone X
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-8-plus"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-8-plus')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 8 Plus
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-8"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-8')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 8
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-7-plus"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-7-plus')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 7 Plus
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-7"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-7')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 7
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-6s-plus"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-6s-plus')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 6S Plus
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-6s"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-6s')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 6S
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-6-plus"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-6-plus')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 6 Plus
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-6"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-6')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 6
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-5s"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-5s')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 5S
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-se"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-se')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone SE
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-5c"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-5c')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 5C
                  </Link>
                  <Link
                    href="/products?category=board-components&subcategory=iphone&model=iphone-5"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      window.location.search.includes('model=iphone-5')
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    iPhone 5
                  </Link>
                </div>
              </div>
            )}

            {/* Board Components Introduction */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Electronic Board Components</h2>
                <p className="text-gray-700 max-w-3xl mx-auto">
                  High-quality electronic components and circuit board parts for advanced device repairs.
                  Precision components designed for professional technicians and electronics specialists.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9h14l-1 10H6L5 9z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Precision Parts</h3>
                  <p className="text-sm text-gray-600">Exact specifications</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">High Performance</h3>
                    <p className="text-sm text-gray-600">Reliable operation</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Quality Tested</h3>
                  <p className="text-sm text-gray-600">Rigorous validation</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Advanced Tech</h3>
                  <p className="text-sm text-gray-600">Latest components</p>
                </div>
              </div>

              {/* Category Legend */}
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Component Categories</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                    <span>Processors & ICs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Memory & Storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                    <span>Connectors & Cables</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Sensors & Modules</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Board Components Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-100 relative">
                  <img src="/placeholder.jpg" alt="Sample Component" className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white bg-indigo-500">
                    Processors & ICs
                  </div>
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    In Stock
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">Advanced Microcontroller Unit</h3>
                  <p className="text-sm text-gray-600 mb-2">32-bit ARM Cortex-M4</p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">High-performance microcontroller with integrated peripherals and advanced processing capabilities.</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-gray-900">$25</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    90 Days Warranty
                  </div>
                  <button className="w-full bg-[#D4AF37] hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-100 relative">
                  <img src="/placeholder.jpg" alt="Sample Component" className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white bg-purple-500">
                    Memory & Storage
                  </div>
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    In Stock
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">High-Speed NAND Flash Memory</h3>
                  <p className="text-sm text-gray-600 mb-2">128GB MLC NAND</p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">Enterprise-grade NAND flash memory with high-speed read/write capabilities and extended durability.</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-gray-900">$45</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    90 Days Warranty
                  </div>
                  <button className="w-full bg-[#D4AF37] hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-100 relative">
                  <img src="/placeholder.jpg" alt="Sample Component" className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white bg-pink-500">
                    Connectors & Cables
                  </div>
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Out of Stock
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">High-Speed HDMI Connector</h3>
                  <p className="text-sm text-gray-600 mb-2">HDMI 2.1 Type-A</p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">Premium HDMI connector with 8K support and advanced signal processing for crystal-clear video transmission.</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-gray-900">$8</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    90 Days Warranty
                  </div>
                  <button className="w-full bg-gray-300 text-gray-500 cursor-not-allowed font-medium py-2 px-4 rounded-lg">
                    Out of Stock
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-100 relative">
                  <img src="/placeholder.jpg" alt="Sample Component" className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white bg-blue-500">
                    Sensors & Modules
                  </div>
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    In Stock
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">Advanced IMU Sensor Module</h3>
                  <p className="text-sm text-gray-600 mb-2">9-DOF IMU with Gyroscope</p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">Precision inertial measurement unit with accelerometer, gyroscope, and magnetometer for advanced motion sensing.</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-gray-900">$32</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    90 Days Warranty
                  </div>
                  <button className="w-full bg-[#D4AF37] hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Advanced Electronic Components</h3>
              <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                Access premium electronic components for your advanced repair and prototyping projects.
                Quality components that meet professional standards and specifications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Browse All Components
                </button>
                <button className="border border-gray-400 hover:border-gray-200 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Technical Specifications
                </button>
              </div>
            </div>
          </>
        ) : isRefurbishingCategory ? (
          <>
            {/* Refurbishing Parts Introduction */}
            <div className="bg-gradient-to-r from-slate-50 to-stone-50 rounded-xl p-8 mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Refurbished Device Parts</h2>
                <p className="text-gray-700 max-w-3xl mx-auto">
                  High-quality refurbished and reconditioned parts for cost-effective repairs.
                  Each component is thoroughly tested, cleaned, and restored to ensure reliable performance.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Restored</h3>
                  <p className="text-sm text-gray-600">Professionally refurbished</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Tested</h3>
                  <p className="text-sm text-gray-600">Rigorous quality checks</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Savings</h3>
                  <p className="text-sm text-gray-600">Up to 70% off new</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Reliable</h3>
                  <p className="text-sm text-gray-600">Warranty included</p>
                </div>
              </div>

              {/* Category Legend */}
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Refurbished Categories</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                    <span>Displays & Screens</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-stone-500 rounded-full"></div>
                    <span>Batteries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-neutral-500 rounded-full"></div>
                    <span>Logic Boards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-zinc-500 rounded-full"></div>
                    <span>Other Components</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Refurbishing Parts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {sampleRefurbishingParts.map((part) => (
                <div key={part.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={part.image}
                      alt={part.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Refurbished Badge */}
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Refurbished
                    </div>
                    {/* Category Badge */}
                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium text-white ${
                      part.category === 'Displays' ? 'bg-slate-500' :
                      part.category === 'Batteries' ? 'bg-stone-500' :
                      part.category === 'Logic Boards' ? 'bg-neutral-500' :
                      'bg-zinc-500'
                    }`}>
                      {part.category}
                    </div>
                    {/* Stock Status */}
                    {part.inStock ? (
                      <div className="absolute bottom-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        In Stock
                      </div>
                    ) : (
                      <div className="absolute bottom-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{part.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{part.compatibility}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{part.description}</p>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-gray-900">${part.price}</span>
                      <span className="text-sm text-green-600 font-medium">Refurbished</span>
                    </div>

                    {/* Warranty */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {part.warranty} Warranty
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      className={`w-full font-medium py-2 px-4 rounded-lg transition-colors ${
                        part.inStock
                          ? 'bg-[#D4AF37] hover:bg-yellow-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!part.inStock}
                    >
                      {part.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-slate-800 to-stone-800 text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Quality Refurbished Parts</h3>
              <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                Save money without compromising on quality. Our refurbished parts undergo
                comprehensive testing and restoration to ensure they perform like new.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Shop All Refurbished
                </button>
                <button className="border border-gray-400 hover:border-gray-200 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Warranty Info
                </button>
              </div>
            </div>
          </>
        ) : isRefurbishingCategory ? (
          <>
            {/* Refurbishing Parts Introduction */}
            <div className="bg-gradient-to-r from-slate-50 to-stone-50 rounded-xl p-8 mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Refurbished Device Parts</h2>
                <p className="text-gray-700 max-w-3xl mx-auto">
                  High-quality refurbished and reconditioned parts for cost-effective repairs.
                  Each component is thoroughly tested, cleaned, and restored to ensure reliable performance.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Restored</h3>
                  <p className="text-sm text-gray-600">Professionally refurbished</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Tested</h3>
                  <p className="text-sm text-gray-600">Rigorous quality checks</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Savings</h3>
                  <p className="text-sm text-gray-600">Up to 70% off new</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Reliable</h3>
                  <p className="text-sm text-gray-600">Warranty included</p>
                </div>
              </div>

              {/* Category Legend */}
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Refurbished Categories</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                    <span>Displays & Screens</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-stone-500 rounded-full"></div>
                    <span>Batteries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-neutral-500 rounded-full"></div>
                    <span>Logic Boards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-zinc-500 rounded-full"></div>
                    <span>Other Components</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Refurbishing Parts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {sampleRefurbishingParts.map((part) => (
                <div key={part.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={part.image}
                      alt={part.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Refurbished Badge */}
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Refurbished
                    </div>
                    {/* Category Badge */}
                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium text-white ${
                      part.category === 'Displays' ? 'bg-slate-500' :
                      part.category === 'Batteries' ? 'bg-stone-500' :
                      part.category === 'Logic Boards' ? 'bg-neutral-500' :
                      'bg-zinc-500'
                    }`}>
                      {part.category}
                    </div>
                    {/* Stock Status */}
                    {part.inStock ? (
                      <div className="absolute bottom-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        In Stock
                      </div>
                    ) : (
                      <div className="absolute bottom-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{part.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{part.compatibility}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{part.description}</p>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-gray-900">${part.price}</span>
                      <span className="text-sm text-green-600 font-medium">Refurbished</span>
                    </div>

                    {/* Warranty */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {part.warranty} Warranty
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      className={`w-full font-medium py-2 px-4 rounded-lg transition-colors ${
                        part.inStock
                          ? 'bg-[#D4AF37] hover:bg-yellow-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!part.inStock}
                    >
                      {part.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-slate-800 to-stone-800 text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Quality Refurbished Parts</h3>
              <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                Save money without compromising on quality. Our refurbished parts undergo
                comprehensive testing and restoration to ensure they perform like new.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Shop All Refurbished
                </button>
                <button className="border border-gray-400 hover:border-gray-200 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Warranty Info
                </button>
              </div>
            </div>
          </>
        ) : (
          // Regular products display
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchQuery ? `No products found matching "${searchQuery}".` : "No products found in this category."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredProducts.map((p) => {
                  const images = p.images ? JSON.parse(p.images) : [];
                  return (
                    <div key={p.id} className="border p-4 rounded">
                      <img src={images[0] || p.image || '/placeholder.jpg'} alt={p.title} className="w-full h-48 object-cover" />
                      <h3>{p.title}</h3>
                      <p>${p.price}</p>
                      {p.oldPrice && <p className="text-gray-500 line-through">${p.oldPrice}</p>}
                      {p.badge && <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">{p.badge}</span>}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
        </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Login Required</h2>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <Smartphone className="w-16 h-16 text-[#D4AF37] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Access Pre-Owned Devices
                </h3>
                <p className="text-gray-600 text-sm">
                  Pre-owned devices are available exclusively to registered customers.
                  Please sign in to view and purchase these items.
                </p>
              </div>

              {/* Login Form Placeholder */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="w-full bg-[#D4AF37] hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggingIn ? 'Signing In...' : 'Sign In & Continue'}
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() => router.push('/register')}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 rounded-lg transition-colors text-sm"
                  >
                    Create Account
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 rounded-lg transition-colors text-sm"
                  >
                    Browse Other Items
                  </button>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2 text-sm">Why Login?</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Access to pre-owned device inventory</li>
                  <li>• Exclusive pricing and promotions</li>
                  <li>• Order tracking and history</li>
                  <li>• Priority customer support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
