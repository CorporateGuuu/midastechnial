import { NextRequest, NextResponse } from 'next/server'
import { MeiliSearch } from 'meilisearch'
import { getAllProducts } from '../../../lib/db'
import { Product } from '../../../types'

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || 'http://localhost:7700',
  apiKey: process.env.MEILISEARCH_API_KEY,
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const limit = parseInt(searchParams.get('limit') || '20')

    if (!query.trim()) {
      return NextResponse.json({ hits: [], total: 0 })
    }

    // Search in Meilisearch index
    const searchResults = await client.index('products').search(query, {
      limit,
      attributesToHighlight: ['title']
    })

    if (searchResults.hits.length === 0) {
      // Fallback to simple string matching if no results
      const allProducts = await getAllProducts()
      const filteredProducts = allProducts.filter((product: Product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, limit)

      return NextResponse.json({
        hits: filteredProducts.map((product: Product) => ({
          ...product,
          _formatted: { title: product.title }
        })),
        total: filteredProducts.length
      })
    }

    return NextResponse.json(searchResults)
  } catch (error) {
    console.error('Search error:', error)
    // Fallback to simple search if Meilisearch is not available
    try {
      const searchParams = request.nextUrl.searchParams
      const query = searchParams.get('q') || ''
      const limit = parseInt(searchParams.get('limit') || '20')

      const allProducts = await getAllProducts()
      const filteredProducts = allProducts.filter((product: Product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, limit)

      return NextResponse.json({
        hits: filteredProducts,
        total: filteredProducts.length
      })
    } catch (fallbackError) {
      console.error('Fallback search error:', fallbackError)
      return NextResponse.json(
        { error: 'Search unavailable' },
        { status: 500 }
      )
    }
  }
}

// POST route to index products in Meilisearch
export async function POST() {
  try {
    const products = await getAllProducts()

    // Prepare products for Meilisearch indexing
    const documents = products.map((product: Product) => ({
      id: product.id,
      title: product.title,
      category: product.category,
      price: product.price,
      rating: product.rating,
      reviews: product.reviews,
      inStock: product.inStock,
    }))

    // Add documents to Meilisearch index
    const task = await client.index('products').addDocuments(documents)

    // Configure searchable attributes
    await client.index('products').updateSearchableAttributes([
      'title',
      'category'
    ])

    return NextResponse.json({ success: true, task })
  } catch (error) {
    console.error('Indexing error:', error)
    return NextResponse.json(
      { error: 'Failed to index products' },
      { status: 500 }
    )
  }
}
