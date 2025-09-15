/**
 * Midas Technical Solutions - Production Monitoring Script
 * Monitors server health, database connectivity, and API endpoints
 */

const https = require('https');
const mysql = require('mysql2/promise');
const fs = require('fs');

class ProductionMonitor {
    constructor() {
        this.logFile = 'production-monitor.log';
        this.alerts = [];
        this.checkInterval = 5 * 60 * 1000; // 5 minutes

        // Database configuration
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

    // Log message to file and console
    log(message, level = 'INFO') {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${level}] ${message}`;

        console.log(logMessage);

        // Append to log file
        fs.appendFileSync(this.logFile, logMessage + '\n');
    }

    // Check database connectivity
    async checkDatabase() {
        try {
            const connection = await mysql.createConnection(this.dbConfig);

            // Test query
            const [rows] = await connection.execute('SELECT 1 as test');
            connection.end();

            this.log('✅ Database connection successful');
            return true;
        } catch (error) {
            this.log(`❌ Database connection failed: ${error.message}`, 'ERROR');
            this.alerts.push(`Database connection failed: ${error.message}`);
            return false;
        }
    }

    // Check server health
    async checkServer() {
        return new Promise((resolve) => {
            const options = {
                hostname: 'localhost',
                port: 443, // HTTPS port
                path: '/api/products',
                method: 'GET',
                rejectUnauthorized: false // For self-signed certificates
            };

            const req = https.request(options, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    try {
                        const response = JSON.parse(data);
                        if (response.success) {
                            this.log('✅ Server API responding correctly');
                            resolve(true);
                        } else {
                            this.log('❌ Server API returned error', 'ERROR');
                            this.alerts.push('Server API returned error');
                            resolve(false);
                        }
                    } catch (error) {
                        this.log(`❌ Server response parsing failed: ${error.message}`, 'ERROR');
                        this.alerts.push(`Server response parsing failed: ${error.message}`);
                        resolve(false);
                    }
                });
            });

            req.on('error', (error) => {
                this.log(`❌ Server connection failed: ${error.message}`, 'ERROR');
                this.alerts.push(`Server connection failed: ${error.message}`);
                resolve(false);
            });

            req.setTimeout(10000, () => {
                req.destroy();
                this.log('❌ Server request timeout', 'ERROR');
                this.alerts.push('Server request timeout');
                resolve(false);
            });

            req.end();
        });
    }

    // Check SSL certificate
    async checkSSL() {
        try {
            const cert = fs.readFileSync('cert.pem', 'utf8');
            const key = fs.readFileSync('key.pem', 'utf8');

            // Basic validation - check if files exist and are not empty
            if (cert && key) {
                this.log('✅ SSL certificates found');
                return true;
            } else {
                this.log('❌ SSL certificates missing or empty', 'ERROR');
                this.alerts.push('SSL certificates missing or empty');
                return false;
            }
        } catch (error) {
            this.log(`❌ SSL certificate check failed: ${error.message}`, 'ERROR');
            this.alerts.push(`SSL certificate check failed: ${error.message}`);
            return false;
        }
    }

    // Check disk space
    async checkDiskSpace() {
        try {
            const { exec } = require('child_process');
            const { promisify } = require('util');
            const execAsync = promisify(exec);

            const { stdout } = await execAsync('df -h / | tail -1');
            const diskUsage = stdout.trim().split(/\s+/);

            // Extract percentage used
            const usedPercent = parseInt(diskUsage[4].replace('%', ''));

            if (usedPercent > 90) {
                this.log(`❌ Disk space critical: ${usedPercent}% used`, 'ERROR');
                this.alerts.push(`Disk space critical: ${usedPercent}% used`);
                return false;
            } else if (usedPercent > 80) {
                this.log(`⚠️  Disk space warning: ${usedPercent}% used`, 'WARN');
                return true;
            } else {
                this.log(`✅ Disk space OK: ${usedPercent}% used`);
                return true;
            }
        } catch (error) {
            this.log(`❌ Disk space check failed: ${error.message}`, 'ERROR');
            return false;
        }
    }

    // Check memory usage
    async checkMemory() {
        try {
            const memUsage = process.memoryUsage();
            const usedMB = Math.round(memUsage.heapUsed / 1024 / 1024);
            const totalMB = Math.round(memUsage.heapTotal / 1024 / 1024);

            if (usedMB > totalMB * 0.9) {
                this.log(`❌ Memory usage critical: ${usedMB}MB / ${totalMB}MB`, 'ERROR');
                this.alerts.push(`Memory usage critical: ${usedMB}MB / ${totalMB}MB`);
                return false;
            } else if (usedMB > totalMB * 0.8) {
                this.log(`⚠️  Memory usage warning: ${usedMB}MB / ${totalMB}MB`, 'WARN');
                return true;
            } else {
                this.log(`✅ Memory usage OK: ${usedMB}MB / ${totalMB}MB`);
                return true;
            }
        } catch (error) {
            this.log(`❌ Memory check failed: ${error.message}`, 'ERROR');
            return false;
        }
    }

    // Send alerts (placeholder - implement email/SMS alerts)
    async sendAlerts() {
        if (this.alerts.length > 0) {
            this.log(`🚨 Sending ${this.alerts.length} alerts`, 'WARN');

            // TODO: Implement actual alert sending
            // - Email alerts
            // - SMS alerts
            // - Slack notifications
            // - PagerDuty integration

            for (const alert of this.alerts) {
                this.log(`ALERT: ${alert}`, 'ERROR');
            }

            // Clear alerts after sending
            this.alerts = [];
        }
    }

    // Run all checks
    async runChecks() {
        this.log('🔍 Starting production monitoring checks...');

        const results = await Promise.all([
            this.checkDatabase(),
            this.checkServer(),
            this.checkSSL(),
            this.checkDiskSpace(),
            this.checkMemory()
        ]);

        const allPassed = results.every(result => result === true);

        if (allPassed) {
            this.log('✅ All monitoring checks passed');
        } else {
            this.log('❌ Some monitoring checks failed', 'ERROR');
        }

        // Send alerts if any checks failed
        await this.sendAlerts();

        return allPassed;
    }

    // Start monitoring loop
    startMonitoring() {
        this.log('🚀 Production monitoring started');

        // Run initial check
        this.runChecks();

        // Set up periodic checks
        setInterval(() => {
            this.runChecks();
        }, this.checkInterval);
    }

    // Stop monitoring
    stopMonitoring() {
        this.log('🛑 Production monitoring stopped');
        if (this.monitorInterval) {
            clearInterval(this.monitorInterval);
        }
    }
}

// Export for use as module
module.exports = ProductionMonitor;

// Run directly if called from command line
if (require.main === module) {
    const monitor = new ProductionMonitor();

    // Handle graceful shutdown
    process.on('SIGINT', () => {
        monitor.log('Received SIGINT, shutting down gracefully...');
        monitor.stopMonitoring();
        process.exit(0);
    });

    process.on('SIGTERM', () => {
        monitor.log('Received SIGTERM, shutting down gracefully...');
        monitor.stopMonitoring();
        process.exit(0);
    });

    // Start monitoring
    monitor.startMonitoring();
}
