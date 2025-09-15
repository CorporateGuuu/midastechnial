/**
 * Maintenance Scheduler for Midas Technical Solutions
 * Handles automated maintenance tasks: backups, updates, monitoring
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mysql = require('mysql2/promise');
const https = require('https');

// Load environment variables
require('dotenv').config();

class MaintenanceScheduler {
    constructor() {
        this.logFile = 'maintenance.log';
        this.backupDir = 'backups';
        this.lastBackup = null;
        this.lastSecurityUpdate = null;

        // Maintenance schedule (in milliseconds)
        this.schedules = {
            repairdeskSync: 24 * 60 * 60 * 1000, // Daily
            databaseBackup: 7 * 24 * 60 * 60 * 1000, // Weekly
            securityUpdate: 30 * 24 * 60 * 60 * 1000, // Monthly
            performanceCheck: 60 * 60 * 1000 // Hourly
        };

        this.dbConfig = {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'midas_technical'
        };

        // Ensure backup directory exists
        if (!fs.existsSync(this.backupDir)) {
            fs.mkdirSync(this.backupDir);
        }
    }

    // Logging function
    log(message, level = 'INFO') {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${level}] ${message}`;

        console.log(logMessage);

        // Append to log file
        fs.appendFileSync(this.logFile, logMessage + '\n');
    }

    // Daily RepairDesk synchronization
    async performRepairDeskSync() {
        this.log('🔄 Starting daily RepairDesk synchronization...');

        try {
            // Run the RepairDesk sync script
            const { spawn } = require('child_process');

            const syncProcess = spawn('node', ['-e', `
                const RepairDeskIntegration = require('./api/repairdesk-integration.js');
                const rd = new RepairDeskIntegration();
                rd.fullSync().then(() => {
                    console.log('RepairDesk sync completed successfully');
                    process.exit(0);
                }).catch(error => {
                    console.error('RepairDesk sync failed:', error);
                    process.exit(1);
                });
            `], { stdio: 'inherit' });

            return new Promise((resolve, reject) => {
                syncProcess.on('close', (code) => {
                    if (code === 0) {
                        this.log('✅ RepairDesk synchronization completed successfully');
                        resolve(true);
                    } else {
                        this.log('❌ RepairDesk synchronization failed', 'ERROR');
                        resolve(false);
                    }
                });

                syncProcess.on('error', (error) => {
                    this.log(`❌ RepairDesk sync process error: ${error.message}`, 'ERROR');
                    resolve(false);
                });
            });

        } catch (error) {
            this.log(`❌ RepairDesk sync error: ${error.message}`, 'ERROR');
            return false;
        }
    }

    // Weekly database backup
    async performDatabaseBackup() {
        this.log('💾 Starting weekly database backup...');

        try {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const backupFile = path.join(this.backupDir, `backup-${timestamp}.sql`);

            // Create mysqldump command
            const dumpCommand = `mysqldump -h ${this.dbConfig.host} -u ${this.dbConfig.user} ${this.dbConfig.password ? `-p${this.dbConfig.password}` : ''} ${this.dbConfig.database} > "${backupFile}"`;

            return new Promise((resolve, reject) => {
                exec(dumpCommand, (error, stdout, stderr) => {
                    if (error) {
                        this.log(`❌ Database backup failed: ${error.message}`, 'ERROR');
                        resolve(false);
                        return;
                    }

                    if (stderr) {
                        this.log(`⚠️  Database backup warning: ${stderr}`, 'WARN');
                    }

                    // Verify backup file was created and has content
                    if (fs.existsSync(backupFile)) {
                        const stats = fs.statSync(backupFile);
                        if (stats.size > 0) {
                            this.log(`✅ Database backup completed successfully: ${backupFile} (${stats.size} bytes)`);
                            this.lastBackup = new Date();
                            this.cleanupOldBackups();
                            resolve(true);
                        } else {
                            this.log('❌ Database backup file is empty', 'ERROR');
                            resolve(false);
                        }
                    } else {
                        this.log('❌ Database backup file was not created', 'ERROR');
                        resolve(false);
                    }
                });
            });

        } catch (error) {
            this.log(`❌ Database backup error: ${error.message}`, 'ERROR');
            return false;
        }
    }

    // Clean up old backups (keep last 4 weekly backups)
    cleanupOldBackups() {
        try {
            const files = fs.readdirSync(this.backupDir)
                .filter(file => file.startsWith('backup-') && file.endsWith('.sql'))
                .map(file => ({
                    name: file,
                    path: path.join(this.backupDir, file),
                    stats: fs.statSync(path.join(this.backupDir, file))
                }))
                .sort((a, b) => b.stats.mtime - a.stats.mtime);

            // Keep only the last 4 backups
            if (files.length > 4) {
                const filesToDelete = files.slice(4);
                filesToDelete.forEach(file => {
                    fs.unlinkSync(file.path);
                    this.log(`🗑️  Deleted old backup: ${file.name}`);
                });
            }
        } catch (error) {
            this.log(`❌ Backup cleanup error: ${error.message}`, 'ERROR');
        }
    }

    // Monthly security updates
    async performSecurityUpdates() {
        this.log('🔒 Starting monthly security updates...');

        try {
            // Update npm packages
            this.log('📦 Updating npm packages...');
            const npmUpdate = await this.runCommand('npm audit fix');

            if (npmUpdate.success) {
                this.log('✅ NPM packages updated successfully');
            } else {
                this.log('⚠️  NPM update completed with warnings', 'WARN');
            }

            // Check for system updates (macOS)
            this.log('🍎 Checking for system updates...');
            const systemUpdate = await this.runCommand('softwareupdate -l');

            if (systemUpdate.success) {
                this.log('✅ System update check completed');
            }

            // Update SSL certificates if needed
            await this.checkSSLCertificateExpiry();

            this.lastSecurityUpdate = new Date();
            this.log('✅ Monthly security updates completed');
            return true;

        } catch (error) {
            this.log(`❌ Security update error: ${error.message}`, 'ERROR');
            return false;
        }
    }

    // Check SSL certificate expiry
    async checkSSLCertificateExpiry() {
        try {
            if (fs.existsSync('cert.pem')) {
                const certInfo = await this.runCommand('openssl x509 -in cert.pem -text -noout | grep "Not After"');

                if (certInfo.success) {
                    this.log('✅ SSL certificate expiry checked');
                    // In a real implementation, you would parse the date and alert if expiry is soon
                }
            } else {
                this.log('⚠️  SSL certificate not found for expiry check', 'WARN');
            }
        } catch (error) {
            this.log(`❌ SSL certificate check error: ${error.message}`, 'ERROR');
        }
    }

    // Hourly performance monitoring
    async performPerformanceCheck() {
        this.log('📊 Starting hourly performance check...');

        try {
            const metrics = {
                timestamp: new Date().toISOString(),
                memory: process.memoryUsage(),
                uptime: process.uptime(),
                cpu: process.cpuUsage(),
                loadAverage: null
            };

            // Get system load average (macOS)
            try {
                const loadAvg = await this.runCommand('uptime');
                if (loadAvg.success) {
                    // Parse load average from uptime output
                    const loadMatch = loadAvg.stdout.match(/load averages?: ([0-9.]+)/);
                    if (loadMatch) {
                        metrics.loadAverage = parseFloat(loadMatch[1]);
                    }
                }
            } catch (error) {
                // Load average not critical, continue
            }

            // Check database connection
            const dbHealthy = await this.checkDatabaseHealth();
            metrics.databaseHealthy = dbHealthy;

            // Check server responsiveness
            const serverHealthy = await this.checkServerHealth();
            metrics.serverHealthy = serverHealthy;

            // Log performance metrics
            this.log(`📈 Performance Metrics:
  Memory: ${(metrics.memory.heapUsed / 1024 / 1024).toFixed(2)}MB used
  Uptime: ${(metrics.uptime / 3600).toFixed(2)} hours
  Database: ${metrics.databaseHealthy ? '✅ Healthy' : '❌ Unhealthy'}
  Server: ${metrics.serverHealthy ? '✅ Healthy' : '❌ Unhealthy'}
  Load Average: ${metrics.loadAverage || 'N/A'}`);

            // Alert if performance issues detected
            if (!dbHealthy || !serverHealthy) {
                this.log('🚨 Performance issues detected!', 'ERROR');
            }

            return dbHealthy && serverHealthy;

        } catch (error) {
            this.log(`❌ Performance check error: ${error.message}`, 'ERROR');
            return false;
        }
    }

    // Check database health
    async checkDatabaseHealth() {
        try {
            const connection = await mysql.createConnection(this.dbConfig);
            await connection.execute('SELECT 1 as health_check');
            await connection.end();
            return true;
        } catch (error) {
            this.log(`❌ Database health check failed: ${error.message}`, 'ERROR');
            return false;
        }
    }

    // Check server health
    async checkServerHealth() {
        return new Promise((resolve) => {
            const options = {
                hostname: 'localhost',
                port: 443,
                path: '/api/products',
                method: 'GET',
                timeout: 5000,
                rejectUnauthorized: false
            };

            const req = https.request(options, (res) => {
                if (res.statusCode === 200) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });

            req.on('error', () => resolve(false));
            req.on('timeout', () => {
                req.destroy();
                resolve(false);
            });

            req.end();
        });
    }

    // Run system command
    runCommand(command) {
        return new Promise((resolve) => {
            exec(command, (error, stdout, stderr) => {
                resolve({
                    success: !error,
                    stdout: stdout,
                    stderr: stderr,
                    error: error
                });
            });
        });
    }

    // Main maintenance loop
    async startMaintenance() {
        this.log('🚀 Starting automated maintenance scheduler...');

        // Run initial checks
        await this.performPerformanceCheck();

        // Set up maintenance intervals
        setInterval(() => this.performRepairDeskSync(), this.schedules.repairdeskSync);
        setInterval(() => this.performDatabaseBackup(), this.schedules.databaseBackup);
        setInterval(() => this.performSecurityUpdates(), this.schedules.securityUpdate);
        setInterval(() => this.performPerformanceCheck(), this.schedules.performanceCheck);

        this.log('✅ Maintenance scheduler started successfully');
        this.log(`📅 Schedules:
  • RepairDesk Sync: Every 24 hours
  • Database Backup: Every 7 days
  • Security Updates: Every 30 days
  • Performance Check: Every hour`);
    }

    // Manual maintenance functions
    async runManualMaintenance(type) {
        switch (type) {
            case 'repairdesk':
                return await this.performRepairDeskSync();
            case 'backup':
                return await this.performDatabaseBackup();
            case 'security':
                return await this.performSecurityUpdates();
            case 'performance':
                return await this.performPerformanceCheck();
            case 'all':
                const results = await Promise.all([
                    this.performRepairDeskSync(),
                    this.performDatabaseBackup(),
                    this.performSecurityUpdates(),
                    this.performPerformanceCheck()
                ]);
                return results.every(result => result === true);
            default:
                this.log(`❌ Unknown maintenance type: ${type}`, 'ERROR');
                return false;
        }
    }

    // Get maintenance status
    getStatus() {
        return {
            lastBackup: this.lastBackup,
            lastSecurityUpdate: this.lastSecurityUpdate,
            schedules: this.schedules,
            logFile: this.logFile,
            backupDir: this.backupDir
        };
    }
}

// Export for use as module
module.exports = MaintenanceScheduler;

// Run directly if called from command line
if (require.main === module) {
    const scheduler = new MaintenanceScheduler();

    // Check for command line arguments
    const args = process.argv.slice(2);

    if (args.length > 0) {
        // Manual maintenance
        const maintenanceType = args[0];
        scheduler.runManualMaintenance(maintenanceType).then(success => {
            process.exit(success ? 0 : 1);
        });
    } else {
        // Start automated scheduler
        scheduler.startMaintenance();

        // Handle graceful shutdown
        process.on('SIGINT', () => {
            scheduler.log('Received SIGINT, shutting down maintenance scheduler...');
            process.exit(0);
        });

        process.on('SIGTERM', () => {
            scheduler.log('Received SIGTERM, shutting down maintenance scheduler...');
            process.exit(0);
        });
    }
}
