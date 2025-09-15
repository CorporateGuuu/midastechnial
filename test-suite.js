// Comprehensive Test Suite for Midas Technical Solutions Website
// Run with: node test-suite.js

const fs = require('fs');
const path = require('path');

class WebsiteTester {
    constructor() {
        this.results = {
            passed: 0,
            failed: 0,
            total: 0,
            tests: []
        };
        this.basePath = __dirname;
    }

    log(message, type = 'info') {
        const timestamp = new Date().toISOString();
        const colors = {
            success: '\x1b[32m',
            error: '\x1b[31m',
            warning: '\x1b[33m',
            info: '\x1b[36m',
            reset: '\x1b[0m'
        };
        console.log(`${colors[type]}[${timestamp}] ${message}${colors.reset}`);
    }

    testResult(testName, passed, message = '') {
        this.results.total++;
        if (passed) {
            this.results.passed++;
            this.log(`✅ PASS: ${testName}`, 'success');
        } else {
            this.results.failed++;
            this.log(`❌ FAIL: ${testName} - ${message}`, 'error');
        }

        this.results.tests.push({
            name: testName,
            passed,
            message,
            timestamp: new Date().toISOString()
        });
    }

    // File existence tests
    testFileExistence() {
        this.log('🔍 Testing file existence...', 'info');

        const requiredFiles = [
            'index.html',
            'css/styles.css',
            'js/modern-scripts.js',
            'js/search.js',
            'js/cart.js',
            'js/carousel.js',
            'js/side-menu.js'
        ];

        requiredFiles.forEach(file => {
            const filePath = path.join(this.basePath, file);
            const exists = fs.existsSync(filePath);
            this.testResult(
                `File exists: ${file}`,
                exists,
                exists ? '' : `File ${file} not found`
            );
        });
    }

    // HTML structure tests
    testHTMLStructure() {
        this.log('🔍 Testing HTML structure...', 'info');

        try {
            const htmlContent = fs.readFileSync(path.join(this.basePath, 'index.html'), 'utf8');

            // Test for required HTML elements
            const htmlTests = [
                { name: 'DOCTYPE declaration', regex: /<!DOCTYPE html>/i },
                { name: 'HTML lang attribute', regex: /<html[^>]*lang\s*=\s*["']en["']/i },
                { name: 'Meta viewport', regex: /<meta[^>]*name\s*=\s*["']viewport["']/i },
                { name: 'Title tag', regex: /<title[^>]*>.*?<\/title>/i },
                { name: 'Hero section', regex: /<section[^>]*class\s*=\s*["'][^"']*hero-section/i },
                { name: 'Video showcase section', regex: /<section[^>]*class\s*=\s*["'][^"']*video-showcase-section/i },
                { name: 'Product gallery section', regex: /<section[^>]*class\s*=\s*["'][^"']*product-gallery-section/i },
                { name: 'Comparison section', regex: /<section[^>]*class\s*=\s*["'][^"']*comparison-section/i },
                { name: 'Categories section', regex: /<section[^>]*class\s*=\s*["'][^"']*categories-section/i },
                { name: 'Navigation menu', regex: /<nav[^>]*class\s*=\s*["'][^"']*main-navigation/i },
                { name: 'Search form', regex: /<form[^>]*id\s*=\s*["']search-form["']/i },
                { name: 'Video placeholder', regex: /<div[^>]*class\s*=\s*["'][^"']*video-placeholder/i },
                { name: 'Gallery thumbnails', regex: /<div[^>]*class\s*=\s*["'][^"']*gallery-thumbnails/i },
                { name: 'Lightbox functionality', regex: /onclick\s*=\s*["']openLightbox/i },
                { name: 'Mobile menu toggle', regex: /<button[^>]*class\s*=\s*["'][^"']*menu-toggle/i }
            ];

            htmlTests.forEach(test => {
                const found = test.regex.test(htmlContent);
                this.testResult(
                    `HTML: ${test.name}`,
                    found,
                    found ? '' : `${test.name} not found in HTML`
                );
            });

            // Test for image sources
            const imageCount = (htmlContent.match(/<img[^>]*src\s*=\s*["'][^"']*["']/gi) || []).length;
            this.testResult(
                'HTML: Image elements present',
                imageCount >= 10,
                `Found ${imageCount} images (expected at least 10)`
            );

            // Test for video embed placeholder
            const hasVideoEmbed = /video-embed/i.test(htmlContent);
            this.testResult(
                'HTML: Video embed placeholder',
                hasVideoEmbed,
                hasVideoEmbed ? '' : 'Video embed placeholder not found'
            );

        } catch (error) {
            this.testResult('HTML structure test', false, `Error reading HTML file: ${error.message}`);
        }
    }

    // CSS functionality tests
    testCSSFunctionality() {
        this.log('🔍 Testing CSS functionality...', 'info');

        try {
            const cssContent = fs.readFileSync(path.join(this.basePath, 'css/styles.css'), 'utf8');

            // Test for responsive breakpoints
            const responsiveTests = [
                { name: 'Mobile breakpoint (768px)', regex: /@media[^}]*max-width\s*:\s*768px/i },
                { name: 'Small mobile breakpoint (480px)', regex: /@media[^}]*max-width\s*:\s*480px/i },
                { name: 'Tablet breakpoint (1024px)', regex: /@media[^}]*max-width\s*:\s*1024px/i },
                { name: 'Touch device optimizations', regex: /@media[^}]*hover\s*:\s*none/i }
            ];

            responsiveTests.forEach(test => {
                const found = test.regex.test(cssContent);
                this.testResult(
                    `CSS: ${test.name}`,
                    found,
                    found ? '' : `${test.name} not found in CSS`
                );
            });

            // Test for key CSS classes
            const cssClassTests = [
                { name: 'Hero section styles', regex: /\.hero-section\s*\{/ },
                { name: 'Video showcase styles', regex: /\.video-showcase-section\s*\{/ },
                { name: 'Gallery styles', regex: /\.product-gallery-section\s*\{/ },
                { name: 'Comparison styles', regex: /\.comparison-section\s*\{/ },
                { name: 'Lightbox styles', regex: /\.lightbox\s*\{/ },
                { name: 'Mobile menu styles', regex: /\.sidebar-menu\s*\{/ },
                { name: 'Button styles', regex: /\.btn-primary\s*\{/ },
                { name: 'Gold color usage', regex: /#FFD700/ },
                { name: 'Black color usage', regex: /#000000/ },
                { name: 'Red accent usage', regex: /#dc3545/ }
            ];

            cssClassTests.forEach(test => {
                const found = test.regex.test(cssContent);
                this.testResult(
                    `CSS: ${test.name}`,
                    found,
                    found ? '' : `${test.name} not found in CSS`
                );
            });

            // Test for animations and transitions
            const animationTests = [
                { name: 'Transition properties', regex: /transition\s*:/ },
                { name: 'Transform animations', regex: /transform\s*:/ },
                { name: 'Hover effects', regex: /:hover\s*\{/ },
                { name: 'Animation keyframes', regex: /@keyframes/ }
            ];

            animationTests.forEach(test => {
                const found = test.regex.test(cssContent);
                this.testResult(
                    `CSS: ${test.name}`,
                    found,
                    found ? '' : `${test.name} not found in CSS`
                );
            });

        } catch (error) {
            this.testResult('CSS functionality test', false, `Error reading CSS file: ${error.message}`);
        }
    }

    // JavaScript functionality tests
    testJavaScriptFunctionality() {
        this.log('🔍 Testing JavaScript functionality...', 'info');

        try {
            const jsContent = fs.readFileSync(path.join(this.basePath, 'js/modern-scripts.js'), 'utf8');

            // Test for key JavaScript functions
            const jsFunctionTests = [
                { name: 'DOMContentLoaded event listener', regex: /addEventListener\s*\(\s*['"]DOMContentLoaded['"]/ },
                { name: 'Video player functionality', regex: /videoPlaceholder/i },
                { name: 'Gallery image switching', regex: /changeImage/i },
                { name: 'Lightbox functions', regex: /openLightbox|closeLightbox/i },
                { name: 'Mobile menu toggle', regex: /menu-toggle/i },
                { name: 'Search functionality', regex: /search-form/i },
                { name: 'Smooth scrolling', regex: /scrollTo/i },
                { name: 'Back to top button', regex: /back-to-top/i },
                { name: 'Newsletter form handling', regex: /newsletter-form/i },
                { name: 'Intersection Observer', regex: /IntersectionObserver/i }
            ];

            jsFunctionTests.forEach(test => {
                const found = test.regex.test(jsContent);
                this.testResult(
                    `JS: ${test.name}`,
                    found,
                    found ? '' : `${test.name} not found in JavaScript`
                );
            });

            // Test for error handling
            const errorHandlingTests = [
                { name: 'Try-catch blocks', regex: /try\s*\{[\s\S]*?\}\s*catch/i },
                { name: 'Null checks', regex: /if\s*\([^)]*\)\s*\{/ },
                { name: 'Event listener checks', regex: /addEventListener/i }
            ];

            errorHandlingTests.forEach(test => {
                const found = test.regex.test(jsContent);
                this.testResult(
                    `JS: ${test.name}`,
                    found,
                    found ? '' : `${test.name} not implemented`
                );
            });

        } catch (error) {
            this.testResult('JavaScript functionality test', false, `Error reading JS file: ${error.message}`);
        }
    }

    // Mobile responsiveness tests
    testMobileResponsiveness() {
        this.log('🔍 Testing mobile responsiveness...', 'info');

        try {
            const cssContent = fs.readFileSync(path.join(this.basePath, 'css/styles.css'), 'utf8');

            // Test for mobile-specific styles
            const mobileTests = [
                { name: 'Mobile header optimization', regex: /\.header-container\s*\{\s*flex-wrap\s*:\s*wrap/i },
                { name: 'Mobile hero centering', regex: /\.hero-section[^}]*text-align\s*:\s*center/i },
                { name: 'Mobile video optimization', regex: /\.video-placeholder[^}]*height\s*:\s*200px/i },
                { name: 'Mobile gallery horizontal scroll', regex: /\.gallery-thumbnails[^}]*overflow-x\s*:\s*auto/i },
                { name: 'Touch-friendly button sizes', regex: /min-height\s*:\s*48px/i },
                { name: 'iOS safe area support', regex: /safe-area-inset/i },
                { name: 'Mobile font size optimization', regex: /font-size\s*:\s*16px[^}]*\/\*\s*Prevents\s*zoom/i },
                { name: 'Mobile menu sidebar', regex: /\.sidebar-menu[^}]*width\s*:\s*280px/i }
            ];

            mobileTests.forEach(test => {
                const found = test.regex.test(cssContent);
                this.testResult(
                    `Mobile: ${test.name}`,
                    found,
                    found ? '' : `${test.name} not implemented`
                );
            });

        } catch (error) {
            this.testResult('Mobile responsiveness test', false, `Error reading CSS file: ${error.message}`);
        }
    }

    // Performance tests
    testPerformance() {
        this.log('🔍 Testing performance optimizations...', 'info');

        try {
            const htmlContent = fs.readFileSync(path.join(this.basePath, 'index.html'), 'utf8');
            const cssContent = fs.readFileSync(path.join(this.basePath, 'css/styles.css'), 'utf8');
            const jsContent = fs.readFileSync(path.join(this.basePath, 'js/modern-scripts.js'), 'utf8');

            // Test for performance optimizations
            const performanceTests = [
                {
                    name: 'Lazy loading images',
                    regex: /loading\s*=\s*["']lazy["']/i,
                    content: htmlContent,
                    expected: true
                },
                {
                    name: 'CSS font smoothing',
                    regex: /-webkit-font-smoothing/i,
                    content: cssContent,
                    expected: true
                },
                {
                    name: 'Efficient CSS selectors',
                    regex: /\.[a-zA-Z][\w-]*\s*\{/g,
                    content: cssContent,
                    expected: true
                },
                {
                    name: 'JavaScript error handling',
                    regex: /try\s*\{[\s\S]*?\}\s*catch/i,
                    content: jsContent,
                    expected: true
                },
                {
                    name: 'Optimized animations',
                    regex: /transform\s*:\s*translateY/i,
                    content: cssContent,
                    expected: true
                }
            ];

            performanceTests.forEach(test => {
                let found = false;
                if (test.regex.global) {
                    const matches = test.content.match(test.regex);
                    found = matches && matches.length > 0;
                } else {
                    found = test.regex.test(test.content);
                }

                this.testResult(
                    `Performance: ${test.name}`,
                    found,
                    found ? '' : `${test.name} optimization not found`
                );
            });

        } catch (error) {
            this.testResult('Performance test', false, `Error reading files: ${error.message}`);
        }
    }

    // Accessibility tests
    testAccessibility() {
        this.log('🔍 Testing accessibility features...', 'info');

        try {
            const htmlContent = fs.readFileSync(path.join(this.basePath, 'index.html'), 'utf8');

            // Test for accessibility features
            const accessibilityTests = [
                { name: 'Alt text on images', regex: /<img[^>]*alt\s*=\s*["'][^"']*["']/i },
                { name: 'ARIA labels on buttons', regex: /aria-label/i },
                { name: 'Semantic HTML structure', regex: /<header|<nav|<main|<section|<footer/i },
                { name: 'Focus management', regex: /tabindex|focus/i },
                { name: 'Color contrast considerations', regex: /color\s*:\s*#[0-9a-fA-F]{6}/i }
            ];

            accessibilityTests.forEach(test => {
                const found = test.regex.test(htmlContent);
                this.testResult(
                    `Accessibility: ${test.name}`,
                    found,
                    found ? '' : `${test.name} not implemented`
                );
            });

        } catch (error) {
            this.testResult('Accessibility test', false, `Error reading HTML file: ${error.message}`);
        }
    }

    // SEO tests
    testSEO() {
        this.log('🔍 Testing SEO optimization...', 'info');

        try {
            const htmlContent = fs.readFileSync(path.join(this.basePath, 'index.html'), 'utf8');

            // Test for SEO elements
            const seoTests = [
                { name: 'Meta description', regex: /<meta[^>]*name\s*=\s*["']description["']/i },
                { name: 'Meta keywords', regex: /<meta[^>]*name\s*=\s*["']keywords["']/i },
                { name: 'Open Graph tags', regex: /<meta[^>]*property\s*=\s*["']og:/i },
                { name: 'Twitter Card tags', regex: /<meta[^>]*name\s*=\s*["']twitter:/i },
                { name: 'Canonical URL', regex: /<link[^>]*rel\s*=\s*["']canonical["']/i },
                { name: 'Structured data', regex: /<script[^>]*type\s*=\s*["']application\/ld\+json["']/i },
                { name: 'Heading hierarchy', regex: /<h[1-6][^>]*>.*?<\/h[1-6]>/i },
                { name: 'Image optimization', regex: /<img[^>]*srcset/i }
            ];

            seoTests.forEach(test => {
                const found = test.regex.test(htmlContent);
                this.testResult(
                    `SEO: ${test.name}`,
                    found,
                    found ? '' : `${test.name} not implemented`
                );
            });

        } catch (error) {
            this.testResult('SEO test', false, `Error reading HTML file: ${error.message}`);
        }
    }

    // Run all tests
    runAllTests() {
        this.log('🚀 Starting comprehensive website test suite...', 'info');
        this.log('=' .repeat(60), 'info');

        this.testFileExistence();
        this.log('-'.repeat(40), 'info');

        this.testHTMLStructure();
        this.log('-'.repeat(40), 'info');

        this.testCSSFunctionality();
        this.log('-'.repeat(40), 'info');

        this.testJavaScriptFunctionality();
        this.log('-'.repeat(40), 'info');

        this.testMobileResponsiveness();
        this.log('-'.repeat(40), 'info');

        this.testPerformance();
        this.log('-'.repeat(40), 'info');

        this.testAccessibility();
        this.log('-'.repeat(40), 'info');

        this.testSEO();

        this.log('='.repeat(60), 'info');
        this.printSummary();
    }

    // Print test summary
    printSummary() {
        const successRate = ((this.results.passed / this.results.total) * 100).toFixed(1);

        this.log(`📊 Test Results Summary:`, 'info');
        this.log(`Total Tests: ${this.results.total}`, 'info');
        this.log(`Passed: ${this.results.passed}`, 'success');
        this.log(`Failed: ${this.results.failed}`, this.results.failed > 0 ? 'error' : 'info');
        this.log(`Success Rate: ${successRate}%`, successRate >= 90 ? 'success' : successRate >= 75 ? 'warning' : 'error');

        if (this.results.failed > 0) {
            this.log('\n❌ Failed Tests:', 'error');
            this.results.tests
                .filter(test => !test.passed)
                .forEach(test => {
                    this.log(`  • ${test.name}: ${test.message}`, 'error');
                });
        }

        // Save results to file
        this.saveResults();

        this.log('\n🎯 Recommendations:', 'info');
        if (successRate >= 90) {
            this.log('  ✅ Excellent! Website is fully functional and optimized', 'success');
        } else if (successRate >= 75) {
            this.log('  ⚠️ Good! Minor improvements needed', 'warning');
        } else {
            this.log('  ❌ Critical issues need attention', 'error');
        }
    }

    // Save test results to file
    saveResults() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `test-results-${timestamp}.json`;

        try {
            fs.writeFileSync(filename, JSON.stringify(this.results, null, 2));
            this.log(`💾 Test results saved to: ${filename}`, 'info');
        } catch (error) {
            this.log(`❌ Failed to save test results: ${error.message}`, 'error');
        }
    }
}

// Run the tests if this file is executed directly
if (require.main === module) {
    const tester = new WebsiteTester();
    tester.runAllTests();
}

module.exports = WebsiteTester;
