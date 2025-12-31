/**
 * RepairDesk API Integration for Midas Technical Solutions
 * Handles inventory synchronization and order management
 */

const https = require('https');
const { Client } = require('pg');

class RepairDeskIntegration {
    constructor() {
        this.apiKey = process.env.REPAIRDESK_API_KEY;
        this.baseUrl = process.env.REPAIRDESK_BASE_URL || 'https://api.repairdesk.co/api/web/v1';

        // PostgreSQL database configuration - ensure correct connection
        this.dbConfig = {
            connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/mdtstech_store',
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
        };

        console.log('🔧 Repair Desk Database Config:', {
            connectionString: this.dbConfig.connectionString.replace(/:[^:]*@/, ':***@'), // Hide password
            apiKey: this.apiKey ? '***configured***' : 'not set',
            baseUrl: this.baseUrl
        });
    }

    // Make API request to RepairDesk
    async makeAPIRequest(endpoint, method = 'GET', data = null) {
        return new Promise((resolve, reject) => {
            const url = `${this.baseUrl}${endpoint}`;
            const options = {
                method,
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            const req = https.request(url, options, (res) => {
                let body = '';
                res.on('data', (chunk) => {
                    body += chunk;
                });
                res.on('end', () => {
                    try {
                        const response = JSON.parse(body);
                        if (res.statusCode >= 200 && res.statusCode < 300) {
                            resolve(response);
                        } else {
                            reject(new Error(`API Error: ${res.statusCode} - ${response.message || 'Unknown error'}`));
                        }
                    } catch (error) {
                        reject(new Error('Invalid JSON response'));
                    }
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            if (data && (method === 'POST' || method === 'PUT')) {
                req.write(JSON.stringify(data));
            }

            req.end();
        });
    }

    // Get database connection
    async getDatabaseConnection() {
        const client = new Client(this.dbConfig);
        await client.connect();
        return client;
    }

    // Sync products from RepairDesk to local database
    async syncProducts() {
        let client;
        try {
            console.log('🔄 Starting product sync from RepairDesk...');

            client = await this.getDatabaseConnection();

            // Get products from RepairDesk
            const repairdeskProducts = await this.makeAPIRequest('/inventory');

            for (const rdProduct of repairdeskProducts.items || []) {
                // Check if product exists in local database
                const existingProducts = await client.query(
                    'SELECT id FROM products WHERE "repairdeskId" = $1',
                    [rdProduct.id]
                );

                if (existingProducts.rows.length > 0) {
                    // Update existing product
                    await client.query(
                        `UPDATE products SET
                            title = $1,
                            description = $2,
                            price = $3,
                            "inStock" = $4,
                            "updatedAt" = NOW()
                        WHERE "repairdeskId" = $5`,
                        [
                            rdProduct.name,
                            rdProduct.description || '',
                            rdProduct.price,
                            rdProduct.in_stock || 0,
                            rdProduct.id
                        ]
                    );
                } else {
                    // Insert new product
                    await client.query(
                        `INSERT INTO products
                            (title, description, price, category, "inStock", "createdAt", "updatedAt")
                        VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
                        [
                            rdProduct.name,
                            rdProduct.description || '',
                            rdProduct.price,
                            rdProduct.item_type || 'repair-parts',
                            rdProduct.in_stock || 0
                        ]
                    );
                }
            }

            console.log(`✅ Synced ${(repairdeskProducts.items || []).length} products from RepairDesk`);
        } catch (error) {
            console.error('❌ Product sync error:', error);
        } finally {
            if (client) {
                await client.end();
            }
        }
    }

    // Sync inventory levels
    async syncInventory() {
        let client;
        try {
            console.log('🔄 Starting inventory sync...');

            client = await this.getDatabaseConnection();

            // Get all products with RepairDesk IDs
            const products = await client.query(
                'SELECT id FROM products WHERE "repairdeskId" IS NOT NULL'
            );

            for (const product of products.rows) {
                try {
                    // Get current inventory from RepairDesk
                    const rdProduct = await this.makeAPIRequest(`/inventory/${product.repairdeskId}`);

                    // Update local inventory
                    await client.query(
                        'UPDATE products SET "inStock" = $1, "updatedAt" = NOW() WHERE id = $2',
                        [rdProduct.in_stock || 0, product.id]
                    );
                } catch (error) {
                    console.error(`Error syncing inventory for product ${product.id}:`, error);
                }
            }

            console.log(`✅ Synced inventory for ${products.rows.length} products`);
        } catch (error) {
            console.error('❌ Inventory sync error:', error);
        } finally {
            if (client) {
                await client.end();
            }
        }
    }

    // Create order in RepairDesk
    async createRepairDeskOrder(orderData) {
        try {
            console.log('🔄 Creating order in RepairDesk...');

            // Transform order data to RepairDesk format
            const rdOrderData = {
                customer_id: orderData.customer_id,
                items: orderData.items.map(item => ({
                    inventory_id: item.repairdeskId,
                    quantity: item.quantity,
                    price: item.price
                })),
                notes: orderData.notes || '',
                status: 'pending'
            };

            const rdOrder = await this.makeAPIRequest('/orders', 'POST', rdOrderData);

            console.log(`✅ Created RepairDesk order ${rdOrder.id}`);
            return rdOrder;
        } catch (error) {
            console.error('❌ RepairDesk order creation error:', error);
            throw error;
        }
    }

    // Update inventory in RepairDesk after sale
    async updateRepairDeskInventory(productId, quantitySold) {
        try {
            // Get current inventory from RepairDesk
            const rdProduct = await this.makeAPIRequest(`/inventory/${productId}`);

            // Calculate new stock level
            const newStock = Math.max(0, (rdProduct.in_stock || 0) - quantitySold);

            // Update inventory in RepairDesk
            await this.makeAPIRequest(`/inventory/${productId}`, 'PUT', {
                in_stock: newStock
            });

            console.log(`✅ Updated RepairDesk inventory for product ${productId}: ${rdProduct.in_stock} → ${newStock}`);
        } catch (error) {
            console.error(`❌ RepairDesk inventory update error for product ${productId}:`, error);
        }
    }

    // Get customer from RepairDesk or create if doesn't exist
    async getOrCreateCustomer(customerData) {
        try {
            // Search for existing customer
            const customers = await this.makeAPIRequest('/customers', 'GET', {
                email: customerData.email
            });

            if (customers.length > 0) {
                return customers[0];
            }

            // Create new customer
            const newCustomer = await this.makeAPIRequest('/customers', 'POST', {
                first_name: customerData.firstName,
                last_name: customerData.lastName,
                email: customerData.email,
                phone: customerData.phone,
                address: customerData.address,
                city: customerData.city,
                state: customerData.state,
                zipcode: customerData.zipcode
            });

            console.log(`✅ Created new RepairDesk customer ${newCustomer.id}`);
            return newCustomer;
        } catch (error) {
            console.error('❌ RepairDesk customer error:', error);
            throw error;
        }
    }

    // Sync order status from RepairDesk
    async syncOrderStatus(orderId, repairdeskOrderId) {
        let client;
        try {
            const rdOrder = await this.makeAPIRequest(`/orders/${repairdeskOrderId}`);

            client = await this.getDatabaseConnection();

            // Update local order status
            await client.query(
                'UPDATE orders SET status = $1 WHERE id = $2',
                [rdOrder.status, orderId]
            );

            console.log(`✅ Synced order ${orderId} status: ${rdOrder.status}`);
        } catch (error) {
            console.error(`❌ Order status sync error for order ${orderId}:`, error);
        } finally {
            if (client) {
                await client.end();
            }
        }
    }

    // Bulk sync all data
    async fullSync() {
        try {
            console.log('🚀 Starting full RepairDesk sync...');

            await this.syncProducts();
            await this.syncInventory();

            console.log('✅ Full RepairDesk sync completed');
        } catch (error) {
            console.error('❌ Full sync error:', error);
        }
    }

    // Get inventory levels for specific products
    async getInventoryLevels(productIds) {
        try {
            const inventory = {};

            for (const productId of productIds) {
                const product = await this.makeAPIRequest(`/inventory/${productId}`);
                inventory[productId] = product.in_stock || 0;
            }

            return inventory;
        } catch (error) {
            console.error('❌ Inventory levels fetch error:', error);
            return {};
        }
    }

    // Create repair ticket in RepairDesk
    async createRepairTicket(ticketData) {
        try {
            const rdTicket = await this.makeAPIRequest('/repairs', 'POST', {
                customer_id: ticketData.customer_id,
                device_id: ticketData.device_id,
                issue: ticketData.issue,
                status: ticketData.status || 'pending',
                notes: ticketData.notes || ''
            });

            console.log(`✅ Created RepairDesk repair ticket ${rdTicket.id}`);
            return rdTicket;
        } catch (error) {
            console.error('❌ RepairDesk repair ticket creation error:', error);
            throw error;
        }
    }
}

module.exports = RepairDeskIntegration;

// Run sync if this script is executed directly
if (require.main === module) {
    const rd = new RepairDeskIntegration();
    rd.fullSync().then(() => {
        console.log('RepairDesk sync completed');
        process.exit(0);
    }).catch((error) => {
        console.error('RepairDesk sync failed:', error);
        process.exit(1);
    });
}
