/**
 * Supabase Client Configuration
 * Handles real-time database connections and subscriptions
 */

import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://phgbosbtwayzejfxyxao.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZ2Jvc2J0d2F5emVqZnh5eGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MjEzOTMsImV4cCI6MjA3MzA5NzM5M30.QIa24PO_VhBNZ-Bf47Mi3PoRi_6MtGvhBSnzUouutPo'

// For production, load from environment variables:
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

// Export the client for use in other modules
export default supabase

/**
 * Real-time subscription manager for products
 */
export class RealtimeProductsManager {
    constructor() {
        this.subscriptions = new Map()
        this.listeners = new Map()
    }

    /**
     * Subscribe to real-time product changes
     * @param {Function} callback - Function to call when products change
     * @returns {Object} Subscription object with unsubscribe method
     */
    subscribeToProducts(callback) {
        const channel = supabase
            .channel('products_changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'parts',
                    filter: 'is_active=eq.true'
                },
                (payload) => {
                    console.log('Real-time product change:', payload)
                    callback(payload)
                }
            )
            .subscribe((status) => {
                console.log('Products subscription status:', status)
            })

        const subscriptionId = Date.now().toString()
        this.subscriptions.set(subscriptionId, channel)

        return {
            unsubscribe: () => {
                this.unsubscribe(subscriptionId)
            }
        }
    }

    /**
     * Subscribe to inventory changes for specific products
     * @param {Array} productIds - Array of product IDs to monitor
     * @param {Function} callback - Function to call when inventory changes
     * @returns {Object} Subscription object with unsubscribe method
     */
    subscribeToInventory(productIds, callback) {
        const channel = supabase
            .channel('inventory_changes')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'parts',
                    filter: `id=in.(${productIds.join(',')})`
                },
                (payload) => {
                    console.log('Real-time inventory change:', payload)
                    callback(payload)
                }
            )
            .subscribe((status) => {
                console.log('Inventory subscription status:', status)
            })

        const subscriptionId = Date.now().toString()
        this.subscriptions.set(subscriptionId, channel)

        return {
            unsubscribe: () => {
                this.unsubscribe(subscriptionId)
            }
        }
    }

    /**
     * Unsubscribe from a specific subscription
     * @param {string} subscriptionId - ID of the subscription to remove
     */
    unsubscribe(subscriptionId) {
        const channel = this.subscriptions.get(subscriptionId)
        if (channel) {
            supabase.removeChannel(channel)
            this.subscriptions.delete(subscriptionId)
        }
    }

    /**
     * Unsubscribe from all subscriptions
     */
    unsubscribeAll() {
        for (const [id, channel] of this.subscriptions) {
            supabase.removeChannel(channel)
        }
        this.subscriptions.clear()
    }
}

// Create a singleton instance
export const realtimeProductsManager = new RealtimeProductsManager()
