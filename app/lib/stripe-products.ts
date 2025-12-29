// Stripe Products and Prices Configuration
// Test Mode Price IDs - Replace with Live IDs when switching to production

export const STRIPE_PRODUCTS = {
  // Apple Products
  apple: {
    iphone15: {
      name: 'iPhone 15 Screen',
      priceId: 'price_test_apple_iphone15_screen', // Replace with actual Price ID
      price: 149.99,
    },
    iphone14: {
      name: 'iPhone 14 Battery',
      priceId: 'price_test_apple_iphone14_battery', // Replace with actual Price ID
      price: 49.99,
    },
    iphone13: {
      name: 'iPhone 13 Charging Port',
      priceId: 'price_test_apple_iphone13_port', // Replace with actual Price ID
      price: 29.99,
    },
  },

  // Samsung Products
  samsung: {
    s24: {
      name: 'Galaxy S24 Screen',
      priceId: 'price_test_samsung_s24_screen', // Replace with actual Price ID
      price: 199.99,
    },
    s23: {
      name: 'Galaxy S23 Battery',
      priceId: 'price_test_samsung_s23_battery', // Replace with actual Price ID
      price: 59.99,
    },
    note: {
      name: 'Galaxy Note S Pen',
      priceId: 'price_test_samsung_note_spen', // Replace with actual Price ID
      price: 39.99,
    },
  },

  // Motorola Products
  motorola: {
    motog: {
      name: 'Moto G Screen Protector',
      priceId: 'price_test_motorola_motog_screen', // Replace with actual Price ID
      price: 19.99,
    },
    edge: {
      name: 'Moto Edge Battery',
      priceId: 'price_test_motorola_edge_battery', // Replace with actual Price ID
      price: 45.99,
    },
  },

  // Google Products
  google: {
    pixel8: {
      name: 'Pixel 8 Camera Module',
      priceId: 'price_test_google_pixel8_camera', // Replace with actual Price ID
      price: 89.99,
    },
    pixel7: {
      name: 'Pixel 7 Screen',
      priceId: 'price_test_google_pixel7_screen', // Replace with actual Price ID
      price: 129.99,
    },
  },

  // Other Parts
  other: {
    cables: {
      name: 'Universal Charging Cable',
      priceId: 'price_test_other_cable', // Replace with actual Price ID
      price: 12.99,
    },
    tools: {
      name: 'Repair Tool Kit',
      priceId: 'price_test_other_tools', // Replace with actual Price ID
      price: 79.99,
    },
  },

  // Game Console Accessories
  'game-console': {
    controllers: {
      name: 'Gaming Controller',
      priceId: 'price_test_console_controller', // Replace with actual Price ID
      price: 59.99,
    },
    hdmi: {
      name: 'HDMI Cable 6ft',
      priceId: 'price_test_console_hdmi', // Replace with actual Price ID
      price: 14.99,
    },
  },

  // Tools & Supplies
  tools: {
    screwdriver: {
      name: 'Precision Screwdriver Set',
      priceId: 'price_test_tools_screwdriver', // Replace with actual Price ID
      price: 34.99,
    },
    heatgun: {
      name: 'Professional Heat Gun',
      priceId: 'price_test_tools_heatgun', // Replace with actual Price ID
      price: 89.99,
    },
  },

  // Refurbishing
  refurbishing: {
    polishing: {
      name: 'Screen Polishing Kit',
      priceId: 'price_test_refurb_polish', // Replace with actual Price ID
      price: 24.99,
    },
    adhesive: {
      name: 'Screen Adhesive Kit',
      priceId: 'price_test_refurb_adhesive', // Replace with actual Price ID
      price: 16.99,
    },
  },

  // Board Components
  'board-components': {
    chip: {
      name: 'IC Chip Replacement',
      priceId: 'price_test_board_icchip', // Replace with actual Price ID
      price: 12.99,
    },
    connector: {
      name: 'FPC Connector',
      priceId: 'price_test_board_connector', // Replace with actual Price ID
      price: 8.99,
    },
  },

  // Pre-Owned Devices
  'pre-owned': {
    iphoneA: {
      name: 'Pre-Owned iPhone Grade A',
      priceId: 'price_test_preowned_iphone_a', // Replace with actual Price ID
      price: 299.99,
    },
    androidB: {
      name: 'Pre-Owned Android Phone Grade B',
      priceId: 'price_test_preowned_android_b', // Replace with actual Price ID
      price: 149.99,
    },
  },
} as const;

// Helper function to get Price ID by category and product key
export function getPriceId(category: string, productKey: string): string | null {
  const categoryProducts = STRIPE_PRODUCTS[category as keyof typeof STRIPE_PRODUCTS] as any;
  if (!categoryProducts) return null;

  const product = categoryProducts[productKey];
  return product?.priceId || null;
}

// Helper function to get all products for a category
export function getCategoryProducts(category: string) {
  return STRIPE_PRODUCTS[category as keyof typeof STRIPE_PRODUCTS] || {};
}

// Helper function to get product info by Price ID
export function getProductByPriceId(priceId: string) {
  for (const [category, products] of Object.entries(STRIPE_PRODUCTS)) {
    for (const [key, product] of Object.entries(products)) {
      if (product.priceId === priceId) {
        return { category, key, ...product };
      }
    }
  }
  return null;
}
