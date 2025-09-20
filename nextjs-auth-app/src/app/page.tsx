'use client';

import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div>
      {/* Header */}
      <header className="modern-header">
        <div className="header-top">
          <div className="container">
            <div className="header-announcement">
              <i className="fas fa-shield-alt"></i>
              Secure Authentication System
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
                  <i className="fas fa-lock"></i>
                </div>
                <div className="logo-text">
                  <div className="logo-main">Next.js Auth</div>
                  <div className="logo-sub">Secure & Modern</div>
                </div>
              </div>

              <div className="search-container">
                <form className="search-form">
                  <div className="search-input-wrapper">
                    <i className="fas fa-search search-icon"></i>
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search authentication docs, APIs, tutorials..."
                    />
                    <button type="button" className="search-filter-btn">
                      <i className="fas fa-filter"></i>
                    </button>
                    <button type="submit" className="search-submit-btn">
                      <i className="fas fa-search"></i>
                      <span>Search</span>
                    </button>
                  </div>
                  <div className="search-results">
                    <div className="search-result-item">
                      <a href="#">JWT Authentication Guide</a>
                    </div>
                    <div className="search-result-item">
                      <a href="#">OAuth 2.0 Implementation</a>
                    </div>
                    <div className="search-result-item">
                      <a href="#">Role-Based Access Control</a>
                    </div>
                    <div className="search-result-item">
                      <a href="#">API Security Best Practices</a>
                    </div>
                  </div>
                </form>
              </div>

              <nav className="main-navigation">
                <div className="container">
                  <ul className="nav-links">
                    <li><Link href="/" className="active">Home</Link></li>
                    {isAuthenticated && (
                      <li><Link href="/dashboard">Dashboard</Link></li>
                    )}
                    <li><Link href="/docs">Documentation</Link></li>
                    <li><Link href="/api">API</Link></li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-container">
            <div className="hero-content">
              <div className="hero-badge">
                <i className="fas fa-star"></i>
                Next.js Authentication
              </div>
              <h1 className="hero-title">
                Secure Authentication <span className="hero-highlight">System</span>
              </h1>
              <p className="hero-description">
                Experience modern, secure authentication with role-based access control,
                JWT tokens, and a beautiful user interface.
              </p>
              <div className="hero-features">
                <div className="feature-item">
                  <i className="fas fa-shield-alt"></i>
                  <span>Role-based Access Control</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-key"></i>
                  <span>JWT Authentication</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-mobile-alt"></i>
                  <span>Responsive Design</span>
                </div>
              </div>
              <div className="hero-actions">
                {isAuthenticated ? (
                  <div>
                    <p className="hero-description">
                      Welcome back, <strong>{user?.name}</strong>!
                      You are logged in with <strong>{user?.role}</strong> privileges.
                    </p>
                    {user?.role === 'admin' && (
                      <Link href="/admin" className="btn-primary">
                        <i className="fas fa-cog"></i> Admin Dashboard
                      </Link>
                    )}
                  </div>
                ) : (
                  <Link href="/sign-in" className="btn-primary">
                    <i className="fas fa-sign-in-alt"></i> Sign In Now
                  </Link>
                )}
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-device-showcase">
                <div className="device">
                  <div className="device-screen">
                    <i className="fas fa-user-shield fa-2x"></i>
                  </div>
                  <div className="device-label">Admin</div>
                </div>
                <div className="device">
                  <div className="device-screen">
                    <i className="fas fa-user fa-2x"></i>
                  </div>
                  <div className="device-label">User</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">2</div>
                <div className="stat-label">User Types</div>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">JWT</div>
                <div className="stat-label">Authentication</div>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-lock"></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">RBAC</div>
                <div className="stat-label">Access Control</div>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">100%</div>
                <div className="stat-label">Responsive</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="modern-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Next.js Auth App</h4>
              <p>A modern, secure authentication system built with Next.js and TypeScript.</p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link href="/">Home</Link></li>
                {isAuthenticated && <li><Link href="/dashboard">Dashboard</Link></li>}
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Authentication</h4>
              <ul>
                <li><Link href="/sign-in">Sign In</Link></li>
                {isAuthenticated && <li><Link href="/profile">Profile</Link></li>}
                {isAuthenticated && user?.role === 'admin' && <li><Link href="/admin">Admin</Link></li>}
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 Next.js Auth App. All rights reserved.</p>
            <div className="payment-methods">
              <i className="fab fa-react"></i>
              <i className="fab fa-node-js"></i>
              <i className="fas fa-code"></i>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
