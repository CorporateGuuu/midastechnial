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
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-xl mb-8 opacity-90">
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
              className="flex-1 bg-white text-gray-900 placeholder-gray-500"
            />
            <Button type="submit" className="bg-white text-blue-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </form>
        ) : (
          <div className="max-w-md mx-auto">
            <p className="text-xl font-semibold">Thank you for subscribing!</p>
            <p className="mt-2 opacity-90">We'll keep you updated with our latest offers.</p>
          </div>
        )}
      </div>
    </section>
  )
}
