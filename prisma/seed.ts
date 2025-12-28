import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const products = [
    // iPhone Parts
    {
      title: 'iPhone 15 Pro Max OLED Screen',
      price: 299.99,
      rating: 4.8,
      reviews: 234,
      badge: 'new',
      inStock: true,
      category: 'iphone',
      image: '/api/placeholder/300/300',
      images: JSON.stringify(['/api/placeholder/300/300', '/api/placeholder/300/301', '/api/placeholder/300/302'])
    },
    {
      title: 'iPhone 14 Pro Battery',
      price: 39.99,
      rating: 4.7,
      reviews: 156,
      inStock: true,
      category: 'iphone',
      image: '/api/placeholder/300/303',
      images: JSON.stringify(['/api/placeholder/300/303'])
    },
    {
      title: 'iPhone 13 Charging Port',
      price: 24.99,
      rating: 4.6,
      reviews: 89,
      inStock: true,
      category: 'iphone',
      image: '/api/placeholder/300/304',
      images: JSON.stringify(['/api/placeholder/300/304'])
    },
    {
      title: 'iPhone Camera Module (Triple)',
      price: 79.99,
      rating: 4.5,
      reviews: 67,
      inStock: true,
      category: 'iphone',
      image: '/api/placeholder/300/305',
      images: JSON.stringify(['/api/placeholder/300/305'])
    },

    // Samsung Parts
    {
      title: 'Samsung Galaxy S24 Battery',
      price: 49.99,
      oldPrice: 69.99,
      rating: 5.0,
      reviews: 189,
      badge: 'sale',
      inStock: true,
      category: 'samsung',
      image: '/api/placeholder/300/306',
      images: JSON.stringify(['/api/placeholder/300/306'])
    },
    {
      title: 'Galaxy S23 OLED Display',
      price: 199.99,
      rating: 4.6,
      reviews: 123,
      inStock: true,
      category: 'samsung',
      image: '/api/placeholder/300/307',
      images: JSON.stringify(['/api/placeholder/300/307'])
    },
    {
      title: 'Samsung Charging Port Assembly',
      price: 18.99,
      rating: 4.4,
      reviews: 45,
      inStock: true,
      category: 'samsung',
      image: '/api/placeholder/300/308',
      images: JSON.stringify(['/api/placeholder/300/308'])
    },

    // MacBook Parts
    {
      title: 'MacBook Pro 16" Retina Display',
      price: 899.99,
      rating: 4.7,
      reviews: 92,
      inStock: true,
      category: 'macbook',
      image: '/api/placeholder/300/309',
      images: JSON.stringify(['/api/placeholder/300/309'])
    },
    {
      title: 'MacBook Air M2 Keyboard',
      price: 149.99,
      rating: 4.8,
      reviews: 134,
      inStock: true,
      category: 'macbook',
      image: '/api/placeholder/300/310',
      images: JSON.stringify(['/api/placeholder/300/310'])
    },
    {
      title: 'MacBook Battery (80Wh)',
      price: 89.99,
      rating: 4.5,
      reviews: 78,
      inStock: true,
      category: 'macbook',
      image: '/api/placeholder/300/311',
      images: JSON.stringify(['/api/placeholder/300/311'])
    },

    // iPad Parts
    {
      title: 'iPad Air 5 Charging Port Assembly',
      price: 34.99,
      rating: 4.6,
      reviews: 156,
      inStock: true,
      category: 'ipad',
      image: '/api/placeholder/300/312',
      images: JSON.stringify(['/api/placeholder/300/312'])
    },
    {
      title: 'iPad Pro 12.9" LCD Display',
      price: 299.99,
      rating: 4.7,
      reviews: 98,
      inStock: true,
      category: 'ipad',
      image: '/api/placeholder/300/313',
      images: JSON.stringify(['/api/placeholder/300/313'])
    },

    // Tools & Accessories
    {
      title: 'Professional Repair Toolkit (58 pcs)',
      price: 149.99,
      rating: 4.9,
      reviews: 412,
      inStock: true,
      category: 'tools',
      image: '/api/placeholder/300/314',
      images: JSON.stringify(['/api/placeholder/300/314'])
    },
    {
      title: 'Screen Opening Tool Kit',
      price: 29.99,
      rating: 4.6,
      reviews: 267,
      inStock: true,
      category: 'tools',
      image: '/api/placeholder/300/315',
      images: JSON.stringify(['/api/placeholder/300/315'])
    },
    {
      title: 'Soldering Station (Digital)',
      price: 89.99,
      rating: 4.8,
      reviews: 145,
      inStock: true,
      category: 'tools',
      image: '/api/placeholder/300/316',
      images: JSON.stringify(['/api/placeholder/300/316'])
    },

    // Google Pixel Parts
    {
      title: 'Google Pixel 8 Pro Camera Module',
      price: 89.99,
      rating: 4.4,
      reviews: 78,
      badge: 'new',
      inStock: true,
      category: 'google',
      image: '/api/placeholder/300/317',
      images: JSON.stringify(['/api/placeholder/300/317'])
    },
    {
      title: 'Pixel 7 Battery',
      price: 34.99,
      rating: 4.3,
      reviews: 56,
      inStock: true,
      category: 'google',
      image: '/api/placeholder/300/318',
      images: JSON.stringify(['/api/placeholder/300/318'])
    }
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }

  console.log('Sample products seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
