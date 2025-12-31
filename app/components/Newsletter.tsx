'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call
    setIsSubscribed(true)
    setEmail('')
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900" style={{ color: '#D4AF37' }}>Stay Updated</h2>
        <p className="text-xl mb-8 text-gray-600">
          Get the latest product releases and exclusive deals
        </p>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white text-gray-900 placeholder-gray-500 border-gray-300 focus:border-[#D4AF37]"
            />
            <Button type="submit" className="bg-[#D4AF37] text-black hover:bg-yellow-600 border-0">
              Subscribe
            </Button>
          </form>
        ) : (
          <div className="max-w-md mx-auto">
            <p className="text-xl font-semibold text-gray-900" style={{ color: '#D4AF37' }}>Thank you for subscribing!</p>
            <p className="mt-2 text-gray-600">We'll keep you updated with our latest offers.</p>
          </div>
        )}
      </div>
    </section>
  )
}
