import Link from 'next/link'
import { Badge } from './ui/badge'

const categories = [
  { name: 'iPhone Parts', slug: 'iphone', count: 1 },
  { name: 'Samsung Parts', slug: 'samsung', count: 1 },
  { name: 'MacBook Parts', slug: 'macbook', count: 1 },
  { name: 'iPad Parts', slug: 'ipad', count: 1 },
  { name: 'Tools & Accessories', slug: 'tools', count: 1 },
  { name: 'Google Pixel Parts', slug: 'google', count: 1 },
]

export default function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="flex flex-col items-center text-center">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <Badge variant="secondary" className="mt-2">
                  {category.count} items
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
