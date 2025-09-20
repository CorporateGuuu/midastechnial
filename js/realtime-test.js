/**
 * Real-time functionality test
 * This file demonstrates how to test the real-time features
 */

import supabase, { realtimeProductsManager } from './supabase-client.js';

/**
 * Test real-time product subscriptions
 */
export function testRealtimeProducts() {
    console.log('🧪 Testing real-time product subscriptions...');

    // Subscribe to product changes
    const subscription = realtimeProductsManager.subscribeToProducts((payload) => {
        console.log('📡 Real-time event received:', payload);

        // Handle different event types
        switch (payload.eventType) {
            case 'INSERT':
                console.log('➕ New product added:', payload.new.name);
                break;
            case 'UPDATE':
                console.log('✏️ Product updated:', payload.new.name);
                break;
            case 'DELETE':
                console.log('🗑️ Product deleted:', payload.old.name);
                break;
        }
    });

    console.log('✅ Real-time subscription active');

    // Return unsubscribe function for cleanup
    return subscription;
}

/**
 * Test database connection
 */
export async function testDatabaseConnection() {
    try {
        console.log('🔌 Testing Supabase connection...');

        const { data, error } = await supabase
            .from('parts')
            .select('count')
            .limit(1);

        if (error) {
            console.error('❌ Database connection failed:', error);
            return false;
        }

        console.log('✅ Database connection successful');
        return true;
    } catch (error) {
        console.error('❌ Database connection error:', error);
        return false;
    }
}

/**
 * Test inventory subscription for specific products
 */
export function testInventorySubscription(productIds) {
    console.log('📦 Testing inventory subscription for products:', productIds);

    const subscription = realtimeProductsManager.subscribeToInventory(productIds, (payload) => {
        console.log('📊 Inventory change detected:', {
            productId: payload.new.id,
            oldStock: payload.old.stock_quantity,
            newStock: payload.new.stock_quantity
        });
    });

    console.log('✅ Inventory subscription active');
    return subscription;
}

/**
 * Run all tests
 */
export async function runAllTests() {
    console.log('🚀 Starting real-time functionality tests...\n');

    // Test database connection
    const connectionOk = await testDatabaseConnection();
    console.log('');

    if (!connectionOk) {
        console.log('⚠️ Database connection failed. Make sure to configure your Supabase credentials in supabase-client.js');
        return;
    }

    // Test real-time subscriptions
    const productSubscription = testRealtimeProducts();
    console.log('');

    // Test inventory subscription (using sample product IDs)
    const inventorySubscription = testInventorySubscription([1, 2, 3]);
    console.log('');

    console.log('🎉 All tests initialized!');
    console.log('💡 To test real-time updates:');
    console.log('   1. Open another browser/tab to your Supabase dashboard');
    console.log('   2. Make changes to the "parts" table');
    console.log('   3. Watch the console for real-time events');
    console.log('');

    // Return cleanup function
    return () => {
        console.log('🧹 Cleaning up subscriptions...');
        productSubscription.unsubscribe();
        inventorySubscription.unsubscribe();
        realtimeProductsManager.unsubscribeAll();
        console.log('✅ Cleanup complete');
    };
}

// Auto-run tests if this script is loaded directly
if (typeof window !== 'undefined' && window.location) {
    // Run tests when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        // Add a test button to the page for manual testing
        const testButton = document.createElement('button');
        testButton.textContent = '🧪 Test Real-time Features';
        testButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 10px 15px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            z-index: 1000;
        `;

        testButton.addEventListener('click', async () => {
            const cleanup = await runAllTests();

            // Add cleanup button
            const cleanupButton = document.createElement('button');
            cleanupButton.textContent = '🧹 Stop Tests';
            cleanupButton.style.cssText = testButton.style.cssText + 'bottom: 60px; background: #dc3545;';
            cleanupButton.addEventListener('click', cleanup);
            document.body.appendChild(cleanupButton);

            testButton.remove();
        });

        document.body.appendChild(testButton);
    });
}
