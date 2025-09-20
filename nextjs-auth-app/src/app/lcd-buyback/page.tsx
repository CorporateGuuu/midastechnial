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
      <section style={{
        background: 'linear-gradient(to right, #003087, #000)',
        color: 'white',
        textAlign: 'center',
        padding: '40px 20px'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', fontWeight: 'bold' }}>
            LCD Screen Buyback Program
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
            Get the best value for your old LCD screens, tablets, and mobile devices.
            We offer competitive prices and fast, secure processing.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <i className="fas fa-dollar-sign" style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
              <h3>Best Prices</h3>
              <p>Competitive rates for all devices</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <i className="fas fa-shipping-fast" style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
              <h3>Fast Processing</h3>
              <p>Quick evaluation and payment</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <i className="fas fa-shield-alt" style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
              <h3>Secure & Safe</h3>
              <p>Data securely wiped before recycling</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section style={{
        backgroundColor: '#f8f9fa',
        padding: '40px 20px',
        minHeight: 'calc(100vh - 300px)'
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '20px',
          maxWidth: '600px',
          margin: '20px auto',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
            Device Information Form
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Device Information */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ marginBottom: '15px', color: '#003087', borderBottom: '2px solid #003087', paddingBottom: '5px' }}>
                <i className="fas fa-mobile-alt" style={{ marginRight: '10px' }}></i>
                Device Information
              </h3>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Device Type *
                </label>
                <select
                  name="deviceType"
                  value={formData.deviceType}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
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

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Brand *
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="e.g., Apple, Samsung, LG"
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Model *
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="e.g., iPhone 12, Galaxy S21"
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Screen Size
                </label>
                <select
                  name="screenSize"
                  value={formData.screenSize}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
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
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ marginBottom: '15px', color: '#003087', borderBottom: '2px solid #003087', paddingBottom: '5px' }}>
                <i className="fas fa-clipboard-check" style={{ marginRight: '10px' }}></i>
                Condition Information
              </h3>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Overall Condition *
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                >
                  <option value="">Select condition</option>
                  <option value="excellent">Excellent - Like new</option>
                  <option value="good">Good - Minor wear</option>
                  <option value="fair">Fair - Noticeable wear</option>
                  <option value="poor">Poor - Heavy wear</option>
                  <option value="broken">Broken - Needs repair</option>
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Screen Condition
                </label>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <input
                      type="radio"
                      name="hasCracks"
                      value="no"
                      checked={formData.hasCracks === 'no'}
                      onChange={handleInputChange}
                    />
                    No cracks
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <input
                      type="radio"
                      name="hasCracks"
                      value="minor"
                      checked={formData.hasCracks === 'minor'}
                      onChange={handleInputChange}
                    />
                    Minor cracks
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
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

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Dead/Stuck Pixels
                </label>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <input
                      type="radio"
                      name="hasDeadPixels"
                      value="no"
                      checked={formData.hasDeadPixels === 'no'}
                      onChange={handleInputChange}
                    />
                    None
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <input
                      type="radio"
                      name="hasDeadPixels"
                      value="few"
                      checked={formData.hasDeadPixels === 'few'}
                      onChange={handleInputChange}
                    />
                    Few (1-5)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
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
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ marginBottom: '15px', color: '#003087', borderBottom: '2px solid #003087', paddingBottom: '5px' }}>
                <i className="fas fa-user" style={{ marginRight: '10px' }}></i>
                Contact Information
              </h3>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Preferred Contact Method
                </label>
                <select
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                >
                  <option value="">Select preferred method</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="text">Text Message</option>
                </select>
              </div>
            </div>

            {/* Additional Information */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ marginBottom: '15px', color: '#003087', borderBottom: '2px solid #003087', paddingBottom: '5px' }}>
                <i className="fas fa-info-circle" style={{ marginRight: '10px' }}></i>
                Additional Information
              </h3>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Original Box & Accessories
                </label>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <input
                      type="radio"
                      name="originalBox"
                      value="yes"
                      checked={formData.originalBox === 'yes'}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
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

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Included Accessories
                </label>
                <input
                  type="text"
                  name="accessories"
                  value={formData.accessories}
                  onChange={handleInputChange}
                  placeholder="e.g., charger, case, stylus"
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Additional Notes
                </label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  placeholder="Any additional information about your device..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '16px',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                style={{
                  backgroundColor: '#ff0000',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                <i className="fas fa-paper-plane" style={{ marginRight: '8px' }}></i>
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
                <a href="#" className="social-link">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link">
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
