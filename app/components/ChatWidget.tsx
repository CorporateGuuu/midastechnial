'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, X, Minimize2, Maximize2, MessageCircle } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  // Knowledge Base
  const knowledgeBase = {
    greeting: [
      "Hello! 👋 Welcome to Midas Technical Solutions. How can I help you today?",
      "Hi there! Welcome to Midas Technical Solutions. I'm here to help with your repair parts questions!",
      "Greetings! Thanks for visiting Midas Technical Solutions. What can I assist you with today?"
    ],

    products: {
      keywords: ['product', 'parts', 'repair', 'component', 'screen', 'battery', 'charger', 'cable', 'tool', 'accessory'],
      response: "We offer premium quality repair parts for iPhone, Samsung, MacBook, and other devices. Our products include:\n\n• LCD Screens & Displays\n• Batteries & Power Components\n• Charging Ports & Cables\n• Cameras & Sensors\n• Motherboards & Logic Boards\n• Tools & Repair Kits\n\nAll parts come with a 30-day warranty and are tested for quality assurance."
    },

    warranty: {
      keywords: ['warranty', 'guarantee', 'return', 'refund', 'defective', 'broken', 'not working'],
      response: "🎯 Warranty Information:\n\n• 30-day warranty on all repair parts\n• Covers manufacturing defects\n• Free replacement or refund for defective items\n• Must be unused and in original packaging\n• Free return shipping for defective products\n• Extended warranties available for premium parts\n\nFor warranty claims, contact our support team."
    },

    shipping: {
      keywords: ['shipping', 'delivery', 'ship', 'deliver', 'tracking', 'when', 'arrive'],
      response: "🚚 Shipping Information:\n\n• Standard shipping: 3-5 business days\n• Express shipping: 1-2 business days (additional cost)\n• Free shipping on orders over $99\n• International shipping available\n• Tracking information provided via email\n• All orders processed within 24 hours\n\nNeed expedited shipping? Contact us for options!"
    },

    payment: {
      keywords: ['payment', 'pay', 'credit card', 'paypal', 'apple pay', 'visa', 'mastercard', 'checkout'],
      response: "💳 Payment Options:\n\nWe accept:\n• Credit/Debit Cards (Visa, Mastercard, American Express, Discover)\n• PayPal\n• Apple Pay\n• Google Pay\n• Bank transfers for wholesale orders\n\nAll payments are processed securely through Stripe. Your information is encrypted and protected."
    },

    contact: {
      keywords: ['contact', 'phone', 'email', 'address', 'location', 'call', 'reach'],
      response: "📞 Contact Information:\n\n• Phone: +1 (800) MIDAS-01\n• Email: support@midastechnical.com\n• Address: 1521 Boyd Pointe Way, Vienna, VA 22182, USA\n• Business Hours: Mon-Fri 9AM-6PM EST\n\nWe offer 24/7 support through this chat and respond to emails within 2 hours during business hours."
    },

    business_hours: {
      keywords: ['hours', 'open', 'time', 'schedule', 'when', 'available'],
      response: "🕒 Business Hours:\n\n• Monday - Friday: 9:00 AM - 6:00 PM EST\n• Saturday: 10:00 AM - 4:00 PM EST\n• Sunday: Closed\n\nOur live chat support is available 24/7! For urgent matters outside business hours, leave us a message and we'll respond promptly."
    },

    technical_support: {
      keywords: ['technical', 'support', 'help', 'assistance', 'expert', 'repair', 'fix', 'troubleshoot'],
      response: "🔧 Technical Support:\n\nOur certified technicians provide:\n• Repair guidance and tutorials\n• Part compatibility information\n• Troubleshooting assistance\n• Installation instructions\n• Quality control advice\n\nFor complex technical issues, our experts are available via phone or email for personalized assistance."
    },

    wholesale: {
      keywords: ['wholesale', 'bulk', 'business', 'reseller', 'distributor', 'dealer', 'partner'],
      response: "🏢 Wholesale & Business Accounts:\n\nWe offer special pricing for:\n• Authorized repair shops\n• Electronic retailers\n• Mobile device technicians\n• Educational institutions\n\nBenefits include:\n• Volume discounts\n• Priority shipping\n• Extended warranties\n• Dedicated account manager\n\nContact us at admin@midastechnical.com to set up a wholesale account!"
    },

    quality: {
      keywords: ['quality', 'premium', 'tested', 'reliable', 'authentic', 'genuine', 'original'],
      response: "⭐ Quality Assurance:\n\n• All parts are premium quality and tested\n• 100% compatible with OEM specifications\n• Rigorous quality control process\n• Industry-leading warranty coverage\n• Certified by leading manufacturers\n• Trusted by professional technicians worldwide\n\nWe guarantee the highest quality repair parts in the industry!"
    },

    returns: {
      keywords: ['return', 'exchange', 'refund', 'cancel', 'change mind'],
      response: "↩️ Returns & Exchanges:\n\n• 30-day return policy\n• Items must be unused and in original packaging\n• Free return shipping for defective items\n• Customer pays return shipping for other returns\n• Exchanges processed within 3-5 business days\n• Refunds issued to original payment method\n\nContact support for return authorization."
    },

    about: {
      keywords: ['about', 'company', 'who', 'midas', 'history', 'story'],
      response: "🏢 About Midas Technical Solutions:\n\nWe are a leading provider of premium repair parts and tools for professional technicians. Founded with the mission to empower repair professionals with quality components.\n\n• 5000+ parts in stock\n• 50K+ happy customers\n• 99% satisfaction rate\n• 24/7 expert support\n\nOur commitment: Every device deserves a second chance, every technician deserves the best tools!"
    },

    order_tracking: {
      keywords: ['track', 'tracking', 'order', 'status', 'where', 'package'],
      response: "📦 Order Tracking:\n\nTrack your order:\n1. Log into your account at /account\n2. Go to 'Order History'\n3. Click on your order number\n4. View tracking information\n\nYou'll also receive tracking emails once your order ships. For help with tracking, contact us with your order number."
    },

    international: {
      keywords: ['international', 'shipping', 'overseas', 'foreign', 'country', 'outside us'],
      response: "🌍 International Shipping:\n\nWe ship worldwide! 🇺🇸🇬🇧🇩🇪🇫🇷🇯🇵🇦🇺🇨🇦🇦🇪\n\n• International shipping rates calculated at checkout\n• Customs fees may apply (customer responsible)\n• Delivery times vary by destination\n• Express international options available\n• Full tracking provided\n\nContact us for specific country shipping information."
    },

    installation: {
      keywords: ['install', 'installation', 'guide', 'instructions', 'how to', 'tutorial', 'video'],
      response: "📋 Installation Support:\n\nWe provide comprehensive installation support:\n\n• Step-by-step guides for all parts\n• Video tutorials available\n• Technical support hotline\n• Online repair database\n• Parts compatibility information\n• Troubleshooting assistance\n\nOur certified technicians are available to guide you through any repair process!"
    }
  };

  // Function to find best matching response
  const findBestResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Check each knowledge base category
    for (const [category, data] of Object.entries(knowledgeBase)) {
      if (category === 'greeting') continue;

      const categoryData = data as { keywords: string[], response: string };
      const hasKeyword = categoryData.keywords.some(keyword =>
        message.includes(keyword)
      );

      if (hasKeyword) {
        return categoryData.response;
      }
    }

    // Default responses for unmatched queries
    const defaultResponses = [
      "I'd be happy to help! Could you please provide more details about what you're looking for?",
      "I'm here to assist you with information about our repair parts and services. What specific question can I answer for you?",
      "Let me connect you with our technical support team for more detailed assistance. In the meantime, you can also reach us at support@midastechnical.com or call +1 (800) MIDAS-01.",
      "For the most accurate and detailed information, I recommend speaking with our support team. Would you like me to provide their contact information?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: knowledgeBase.greeting[Math.floor(Math.random() * knowledgeBase.greeting.length)],
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Get intelligent response from knowledge base
    setTimeout(() => {
      const botResponse = findBestResponse(inputMessage.trim())

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000) // Random delay between 1-3 seconds
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const minimizeChat = () => {
    setIsMinimized(true)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className="bg-[#D4AF37] hover:bg-[#B89429] text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110 flex items-center justify-center"
          aria-label="Open live chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    )
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-[#D4AF37] text-white rounded-lg shadow-lg p-3 flex items-center gap-3 min-w-64">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Midas Support</p>
            <p className="text-xs opacity-90">Click to expand chat</p>
          </div>
          <button
            onClick={() => setIsMinimized(false)}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Expand chat"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            onClick={toggleChat}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-80 h-96 flex flex-col">
        {/* Chat Header */}
        <div className="bg-[#D4AF37] text-white p-4 flex items-center justify-between rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Midas Support</h3>
              <p className="text-xs opacity-90">Online • Typically replies instantly</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={minimizeChat}
              className="text-white hover:text-gray-200 transition-colors p-1"
              aria-label="Minimize chat"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors p-1"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-3 h-3 text-white" />
                </div>
              )}
              <div
                className={`max-w-48 px-3 py-2 rounded-lg text-sm ${
                  message.sender === 'user'
                    ? 'bg-[#D4AF37] text-white'
                    : 'bg-white text-gray-800 shadow-sm border'
                }`}
              >
                <p>{message.text}</p>
              </div>
              {message.sender === 'user' && (
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-2 justify-start">
              <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-3 h-3 text-white" />
              </div>
              <div className="bg-white px-3 py-2 rounded-lg shadow-sm border">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t bg-white p-3 rounded-b-lg">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-4 py-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B89429] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
