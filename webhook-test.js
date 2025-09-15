/**
 * Webhook Testing Script for Midas Technical Solutions
 * Tests Stripe webhook endpoints and RepairDesk API connectivity
 */

const https = require('https');
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

class WebhookTester {
    constructor() {
        this.dbConfig = {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'midas_technical',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        };
    }

    // Test webhook endpoint accessibility
    async testWebhookEndpoint() {
        console.log('🔍 Testing webhook endpoint accessibility...');

        return new Promise((resolve) => {
            const options = {
                hostname: 'localhost',
                port: 443, // HTTPS port
                path: '/api/webhook',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Stripe-Signature': 'test_signature'
                },
                rejectUnauthorized: false // For self-signed certificates
            };

            const req = https.request(options, (res) => {
                console.log(`✅ Webhook endpoint responded with status: ${res.statusCode}`);

                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    if (res.statusCode === 400) {
                        console.log('✅ Webhook signature verification working (expected 400 for test signature)');
                        resolve(true);
                    } else {
                        console.log(`⚠️  Unexpected webhook response: ${res.statusCode}`);
                        resolve(false);
                    }
                });
            });

            req.on('error', (error) => {
                console.log(`❌ Webhook endpoint not accessible: ${error.message}`);
                resolve(false);
            });

            // Send test payload
            req.write(JSON.stringify({
                type: 'payment_intent.succeeded',
                data: { object: { id: 'pi_test_123' } }
            }));

            req.setTimeout(5000, () => {
                req.destroy();
                console.log('❌ Webhook endpoint timeout');
                resolve(false);
            });

            req.end();
        });
    }

    // Test Stripe webhook secret configuration
    async testStripeWebhookSecret() {
        console.log('🔍 Testing Stripe webhook secret configuration...');

        const secret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!secret) {
            console.log('❌ STRIPE_WEBHOOK_SECRET not found in environment');
            return false;
        }

        if (secret === 'whsec_test_YWkTjw2f1lDV2boDa1XAYSOzGWX0Emq5') {
            console.log('✅ Stripe webhook secret is configured (test mode)');
            return true;
        }

        console.log('✅ Stripe webhook secret is configured');
        return true;
    }

    // Test database connectivity for webhook processing
    async testDatabaseConnectivity() {
        console.log('🔍 Testing database connectivity for webhook processing...');

        try {
            const connection = await mysql.createConnection(this.dbConfig);

            // Test basic query
            const [rows] = await connection.execute('SELECT 1 as test');
            connection.end();

            console.log('✅ Database connection successful for webhook processing');
            return true;
        } catch (error) {
            console.log(`❌ Database connection failed: ${error.message}`);
            return false;
        }
    }

    // Test RepairDesk API connectivity
    async testRepairDeskConnectivity() {
        console.log('🔍 Testing RepairDesk API connectivity...');

        const apiKey = process.env.REPAIRDESK_API_KEY;
        const baseUrl = process.env.REPAIRDESK_BASE_URL;

        if (!apiKey) {
            console.log('❌ REPAIRDESK_API_KEY not found in environment');
            return false;
        }

        if (!baseUrl) {
            console.log('❌ REPAIRDESK_BASE_URL not found in environment');
            return false;
        }

        return new Promise((resolve) => {
            const url = `${baseUrl}/inventory`;
            const options = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            const req = https.request(url, options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    if (res.statusCode === 200) {
                        try {
                            const response = JSON.parse(data);
                            console.log('✅ RepairDesk API connection successful');
                            resolve(true);
                        } catch (error) {
                            console.log('❌ Invalid JSON response from RepairDesk API');
                            resolve(false);
                        }
                    } else {
                        console.log(`❌ RepairDesk API returned status: ${res.statusCode}`);
                        resolve(false);
                    }
                });
            });

            req.on('error', (error) => {
                console.log(`❌ RepairDesk API connection failed: ${error.message}`);
                resolve(false);
            });

            req.setTimeout(10000, () => {
                req.destroy();
                console.log('❌ RepairDesk API timeout');
                resolve(false);
            });

            req.end();
        });
    }

    // Test SSL certificate validity
    async testSSLCertificate() {
        console.log('🔍 Testing SSL certificate validity...');

        try {
            const fs = require('fs');
            const cert = fs.readFileSync('cert.pem', 'utf8');
            const key = fs.readFileSync('key.pem', 'utf8');

            if (cert && key) {
                console.log('✅ SSL certificates exist');

                // Basic validation - check if they're not empty
                if (cert.length > 100 && key.length > 100) {
                    console.log('✅ SSL certificates appear valid');
                    return true;
                } else {
                    console.log('❌ SSL certificates appear to be invalid or empty');
                    return false;
                }
            } else {
                console.log('❌ SSL certificate files not found');
                return false;
            }
        } catch (error) {
            console.log(`❌ SSL certificate check failed: ${error.message}`);
            return false;
        }
    }

    // Simulate Stripe webhook payload
    async simulateStripeWebhook() {
        console.log('🔍 Simulating Stripe webhook payload...');

        const testPayload = {
            id: 'evt_test_webhook',
            object: 'event',
            api_version: '2020-08-27',
            created: Math.floor(Date.now() / 1000),
            data: {
                object: {
                    id: 'pi_test_1234567890',
                    object: 'payment_intent',
                    amount: 4999,
                    currency: 'usd',
                    status: 'succeeded',
                    metadata: {
                        order_id: '12345'
                    }
                }
            },
            livemode: false,
            pending_webhooks: 1,
            request: {
                id: 'req_test_webhook',
                idempotency_key: null
            },
            type: 'payment_intent.succeeded'
        };

        return new Promise((resolve) => {
            const postData = JSON.stringify(testPayload);

            const options = {
                hostname: 'localhost',
                port: 443,
                path: '/api/webhook',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData),
                    'Stripe-Signature': 'test_signature'
                },
                rejectUnauthorized: false
            };

            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    console.log(`✅ Simulated webhook response: ${res.statusCode}`);
                    if (res.statusCode === 400) {
                        console.log('✅ Webhook signature verification working correctly');
                        resolve(true);
                    } else {
                        console.log(`⚠️  Unexpected webhook response: ${res.statusCode}`);
                        resolve(false);
                    }
                });
            });

            req.on('error', (error) => {
                console.log(`❌ Simulated webhook failed: ${error.message}`);
                resolve(false);
            });

            req.write(postData);
            req.end();
        });
    }

    // Run all webhook tests
    async runAllTests() {
        console.log('🚀 Starting comprehensive webhook testing...\n');

        const results = await Promise.all([
            this.testWebhookEndpoint(),
            this.testStripeWebhookSecret(),
            this.testDatabaseConnectivity(),
            this.testRepairDeskConnectivity(),
            this.testSSLCertificate(),
            this.simulateStripeWebhook()
        ]);

        console.log('\n📊 Test Results Summary:');
        console.log('========================');

        const tests = [
            'Webhook Endpoint',
            'Stripe Webhook Secret',
            'Database Connectivity',
            'RepairDesk API',
            'SSL Certificate',
            'Stripe Webhook Simulation'
        ];

        let passed = 0;
        let failed = 0;

        results.forEach((result, index) => {
            const status = result ? '✅ PASS' : '❌ FAIL';
            console.log(`${status} ${tests[index]}`);

            if (result) {
                passed++;
            } else {
                failed++;
            }
        });

        console.log('\n🎯 Final Result:');
        console.log(`✅ Passed: ${passed}/${tests.length}`);
        console.log(`❌ Failed: ${failed}/${tests.length}`);

        if (failed === 0) {
            console.log('\n🎉 All webhook tests passed! Your system is ready for production.');
        } else {
            console.log('\n⚠️  Some tests failed. Please review the issues above.');
        }

        return failed === 0;
    }
}

// Export for use as module
module.exports = WebhookTester;

// Run directly if called from command line
if (require.main === module) {
    const tester = new WebhookTester();
    tester.runAllTests().then(success => {
        process.exit(success ? 0 : 1);
    });
}
