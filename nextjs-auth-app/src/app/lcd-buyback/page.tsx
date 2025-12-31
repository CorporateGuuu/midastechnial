'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

export default function LCDBuyback() {
  const { user, isAuthenticated, logout } = useAuth();
  const [formData, setFormData] = useState({
    deviceType: '',
    brand: '',
    model: '',
    condition: '',
    screenSize: '',
    hasCracks: '',
    hasDeadPixels: '',
    originalBox: '',
    accessories: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    preferredContact: '',
    additionalNotes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('LCD Buyback Form Data:', formData);
    alert('Thank you for your submission! We will contact you within 24 hours with a quote.');
  };

  return (
    <div>
      {/* Header */}
      <header className="modern-header">
        <div className="header-top">
          <div className="container">
            <div className="header-announcement">
              <i className="fas fa-mobile-alt"></i>
              LCD Screen Buyback Program
            </div>
            <div className="header-actions">
              {isAuthenticated ? (
                <>
                  <span>Welcome, {user?.name}</span>
                  <span>({user?.role})</span>
                  {user?.role === 'admin' && (
                    <Link href="/admin" className="auth-link">
                      <i className="fas fa-cog"></i> Admin Dashboard
                    </Link>
                  )}
                  <button onClick={logout} className="auth-link">
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </>
              ) : (
                <Link href="/sign-in" className="auth-link">
                  <i className="fas fa-sign-in-alt"></i> Sign In
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="header-main">
          <div className="container">
            <div className="header-container">
              <div className="logo">
                <div className="logo-icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <div className="logo-text">
                  <div className="logo-main">LCD Buyback</div>
                  <div className="logo-sub">Get Cash for Your Device</div>
                </div>
              </div>

              <nav className="main-navigation">
                <div className="container">
                  <ul className="nav-links">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/products" className="active">Products</Link></li>
                    <li><Link href="/services">Services</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="lcd-hero-section">
        <div className="container">
          <h1 className="lcd-hero-title">
            LCD Screen Buyback Program
          </h1>
          <p className="lcd-hero-description">
            Get the best value for your old LCD screens, tablets, and mobile devices.
            We offer competitive prices and fast, secure processing.
          </p>
          <div className="lcd-hero-features">
            <div className="lcd-feature-item">
              <i className="fas fa-dollar-sign lcd-feature-icon"></i>
              <h3>Best Prices</h3>
              <p>Competitive rates for all devices</p>
            </div>
            <div className="lcd-feature-item">
              <i className="fas fa-shipping-fast lcd-feature-icon"></i>
              <h3>Fast Processing</h3>
              <p>Quick evaluation and payment</p>
            </div>
            <div className="lcd-feature-item">
              <i className="fas fa-shield-alt lcd-feature-icon"></i>
              <h3>Secure & Safe</h3>
              <p>Data securely wiped before recycling</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="lcd-form-section">
        <div className="lcd-form-container">
          <h2 className="lcd-form-title">
            Device Information Form
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Device Information */}
            <div className="form-section-spacing">
              <h3 className="lcd-section-header">
                <i className="fas fa-mobile-alt lcd-section-icon"></i>
                Device Information
              </h3>

              <div className="form-field-spacing">
                <label className="lcd-form-label">
                  Device Type *
                </label>
                <select
                  name="deviceType"
                  value={formData.deviceType}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                  title="Select the type of device"
                >
                  <option value="">Select device type</option>
                  <option value="smartphone">Smartphone</option>
                  <option value="tablet">Tablet</option>
                  <option value="laptop">Laptop</option>
                  <option value="monitor">Monitor</option>
                  <option value="tv">TV</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-field-spacing">
                <label className="lcd-form-label">
                  Brand *
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="e.g., Apple, Samsung, LG"
                  required
                  className="form-input"
                  title="Enter the device brand"
                />
              </div>

              <div className="form-field-spacing">
                <label className="lcd-form-label">
                  Model *
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="e.g., iPhone 12, Galaxy S21"
                  required
                  className="form-input"
                  title="Enter the device model"
                />
              </div>

              <div className="form-field-spacing">
                <label className="lcd-form-label">
                  Screen Size
                </label>
                <select
                  name="screenSize"
                  value={formData.screenSize}
                  onChange={handleInputChange}
                  className="form-select"
                  title="Select the screen size of your device"
                >
                  <option value="">Select screen size</option>
                  <option value="small">Small (under 5")</option>
                  <option value="medium">Medium (5"-7")</option>
                  <option value="large">Large (7"-10")</option>
                  <option value="xl">Extra Large (over 10")</option>
                </select>
              </div>
            </div>

            {/* Condition Information */}
            <div className="form-section-spacing">
              <h3 className="lcd-section-header">
                <i className="fas fa-clipboard-check lcd-section-icon"></i>
                Condition Information
              </h3>

              <div className="form-field-spacing">
                <label className="lcd-form-label">
                  Overall Condition *
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                  title="Select the overall condition of your device"
                >
                  <option value="">Select condition</option>
                  <option value="excellent">Excellent - Like new</option>
                  <option value="good">Good - Minor wear</option>
                  <option value="fair">Fair - Noticeable wear</option>
                  <option value="poor">Poor - Heavy wear</option>
                  <option value="broken">Broken - Needs repair</option>
                </select>
              </div>

              <div className="form-field-spacing">
                <label className="lcd-form-label">
                  Screen Condition
                </label>
                <div className="lcd-radio-group">
                  <label className="lcd-radio-label">
                    <input
                      type="radio"
                      name="hasCracks"
                      value="no"
                      checked={formData.hasCracks === 'no'}
                      onChange={handleInputChange}
                    />
                    No cracks
                  </label>
                  <label className="lcd-radio-label">
                    <input
                      type="radio"
                      name="hasCracks"
                      value="minor"
                      checked={formData.hasCracks === 'minor'}
                      onChange={handleInputChange}
                    />
                    Minor cracks
                  </label>
                  <label className="lcd-radio-label">
                    <input
                      type="radio"
                      name="hasCracks"
                      value="major"
                      checked={formData.hasCracks === 'major'}
                      onChange={handleInputChange}
                    />
                    Major cracks
                  </label>
                </div>
              </div>

              <div className="form-field-spacing">
                <label className="lcd-form-label">
                  Dead/Stuck Pixels
                </label>
                <div className="lcd-radio-group">
                  <label className="lcd-radio-label">
                    <input
                      type="radio"
                      name="hasDeadPixels"
                      value="no"
                      checked={formData.hasDeadPixels === 'no'}
                      onChange={handleInputChange}
                    />
                    None
                  </label>
                  <label className="lcd-radio-label">
                    <input
                      type="radio"
                      name="hasDeadPixels"
                      value="few"
                      checked={formData.hasDeadPixels === 'few'}
                      onChange={handleInputChange}
                    />
                    Few (1-5)
                  </label>
                  <label className="lcd-radio-label">
                    <input
                      type="radio"
                      name="hasDeadPixels"
                      value="many"
                      checked={formData.hasDeadPixels === 'many'}
                      onChange={handleInputChange}
                    />
                    Many (6+)
                  </label>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="form-section-spacing">
              <h3 className="lcd-section-header">
                <i className="fas fa-user lcd-section-icon"></i>
                Contact Information
              </h3>

              <div className="form-field-spacing">
                <label className="lcd-form-label">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  title="Enter your full name"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-field-spacing">
                <label className="lcd-form-label">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  title="Enter your email address"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-field-spacing">
                <label className="lcd-form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  className="form-input"
                  title="Enter your phone number"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-field-spacing">
                <label className="lcd-form-label">
                  Preferred Contact Method
                </label>
                <select
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleInputChange}
                  className="form-select"
                  title="Select your preferred contact method"
                >
                  <option value="">Select preferred method</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="text">Text Message</option>
                </select>
              </div>
            </div>

            {/* Additional Information */}
            <div className="form-section-spacing">
              <h3 className="lcd-section-header">
                <i className="fas fa-info-circle lcd-section-icon"></i>
                Additional Information
              </h3>

              <div className="form-field-spacing">
                <label className="lcd-form-label">
                  Original Box & Accessories
                </label>
                <div className="lcd-radio-group">
                  <label className="lcd-radio-label">
                    <input
                      type="radio"
                      name="originalBox"
                      value="yes"
                      checked={formData.originalBox === 'yes'}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                  <label className="lcd-radio-label">
                    <input
                      type="radio"
                      name="originalBox"
                      value="no"
                      checked={formData.originalBox === 'no'}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>

              <div className="form-field-spacing">
                <label className="lcd-form-label">
                  Included Accessories
                </label>
                <input
                  type="text"
                  name="accessories"
                  value={formData.accessories}
                  onChange={handleInputChange}
                  placeholder="e.g., charger, case, stylus"
                  className="form-input"
                  title="List any included accessories"
                />
              </div>

              <div className="form-field-spacing">
                <label className="lcd-form-label">
                  Additional Notes
                </label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  placeholder="Any additional information about your device..."
                  rows={4}
                  className="form-textarea"
                  title="Enter any additional notes about your device"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="center-align">
              <button
                type="submit"
                className="lcd-submit-btn"
              >
                <i className="fas fa-paper-plane icon-spacing"></i>
                Submit for Quote
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="modern-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>LCD Buyback Program</h4>
              <p>Get the best value for your old LCD screens and devices. Fast, secure, and reliable service.</p>
              <div className="social-links">
                <a href="#" className="social-link" title="Facebook">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="social-link" title="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link" title="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li><Link href="/products">Products</Link></li>
                <li><Link href="/services">Device Evaluation</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Device Types</h4>
              <ul>
                <li>Smartphones</li>
                <li>Tablets</li>
                <li>Laptops</li>
                <li>Monitors</li>
                <li>TV Screens</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 LCD Buyback Program. All rights reserved.</p>
            <div className="payment-methods">
              <i className="fas fa-recycle"></i>
              <i className="fas fa-shield-alt"></i>
              <i className="fas fa-truck"></i>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
