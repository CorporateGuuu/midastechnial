import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react'

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "iPhone 15 Pro Max Repair Guide: Screen Replacement",
      excerpt: "Complete step-by-step guide for professional screen replacement on the latest iPhone 15 Pro Max. Includes tools needed and common pitfalls to avoid.",
      author: "Midas Technical Team",
      date: "2024-12-15",
      category: "Repair Guides",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Quality Standards in Repair Parts: What Matters Most",
      excerpt: "Understanding OEM vs aftermarket parts quality, testing procedures, and why certification matters for repair professionals.",
      author: "Quality Assurance Team",
      date: "2024-12-10",
      category: "Industry Insights",
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "Top 5 Tools Every Repair Technician Should Own",
      excerpt: "Essential tools that improve efficiency, safety, and repair quality. From precision screwdrivers to diagnostic equipment.",
      author: "Tool Specialists",
      date: "2024-12-05",
      category: "Tools & Equipment",
      readTime: "5 min read"
    },
    {
      id: 4,
      title: "Galaxy S24 Ultra: Common Issues and Solutions",
      excerpt: "Most frequent repair issues reported for the Samsung Galaxy S24 Ultra and proven solutions from our technical team.",
      author: "Samsung Specialists",
      date: "2024-11-28",
      category: "Device Specific",
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "Sustainable Repair Practices: Reducing E-Waste",
      excerpt: "How professional repair services contribute to environmental conservation and the importance of repair over replacement.",
      author: "Sustainability Team",
      date: "2024-11-20",
      category: "Industry Insights",
      readTime: "4 min read"
    },
    {
      id: 6,
      title: "Battery Testing: Ensuring Longevity and Safety",
      excerpt: "Proper battery testing procedures, capacity analysis, and safety protocols for lithium-ion battery repairs.",
      author: "Battery Experts",
      date: "2024-11-15",
      category: "Technical Knowledge",
      readTime: "9 min read"
    }
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <BookOpen className="w-16 h-16 mx-auto text-[#D4AF37] mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Midas Technical Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert insights, repair guides, and industry knowledge from our technical specialists.
              Stay updated with the latest in device repair technology.
            </p>
          </div>

          {/* Featured Post */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <span className="inline-block bg-[#D4AF37] text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
                  Featured Article
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <User className="w-4 h-4 mr-1" />
                  <span className="mr-4">{blogPosts[0].author}</span>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="mr-4">{blogPosts[0].date}</span>
                  <span>{blogPosts[0].readTime}</span>
                </div>
                <Link
                  href={`/blog/${blogPosts[0].id}`}
                  className="inline-flex items-center text-[#D4AF37] font-semibold hover:text-yellow-600 transition-colors"
                >
                  Read Full Article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <div className="bg-gradient-to-br from-[#D4AF37] to-yellow-600 rounded-lg p-8 text-white flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2">📱</div>
                  <div className="text-xl font-semibold">Repair Guide</div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.slice(1).map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <User className="w-3 h-3 mr-1" />
                  <span className="mr-3">{post.author}</span>
                  <span>{post.readTime}</span>
                </div>
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-[#D4AF37] text-sm font-medium hover:text-yellow-600 transition-colors"
                >
                  Read More
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-[#D4AF37] rounded-lg p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-yellow-100 mb-6 max-w-2xl mx-auto">
              Get the latest repair guides, industry insights, and technical updates delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />
                <button className="px-6 py-3 bg-white text-[#D4AF37] font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
