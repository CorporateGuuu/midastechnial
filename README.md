# Midas Technical Solutions - Premium Repair Parts & Tools

![Midas Technical Solutions](https://img.shields.io/badge/Midas-Technical%20Solutions-blue?style=for-the-badge&logo=tools&logoColor=white)

A premium e-commerce website for professional repair parts and tools, built with modern web technologies.

## 🌐 Live Demo

[View Live Website](https://midastechnical.netlify.app)

## ✨ Features

### 🎨 Modern Design
- **Responsive Design** - Perfect on all devices (desktop, tablet, mobile)
- **Modern UI/UX** - Clean, professional interface with smooth animations
- **Glassmorphism Effects** - Contemporary design with backdrop blur
- **Gradient Backgrounds** - Beautiful color schemes throughout

### 🛍️ E-commerce Features
- **Product Catalog** - iPhone, iPad, MacBook, Samsung parts
- **Advanced Search** - Live search with filtering capabilities
- **Shopping Cart** - Add to cart with local storage persistence
- **Wishlist** - Save favorite products
- **Product Reviews** - Star ratings and customer feedback

### 🔧 Technical Features
- **Interactive Sidebar** - Smooth slide-out navigation
- **Advanced Filtering** - Filter by model, part type, and price
- **Real-time Updates** - Dynamic cart counter and notifications
- **Form Validation** - Comprehensive input validation
- **Performance Optimized** - Fast loading with lazy images

### 📱 User Experience
- **Loading Animations** - Professional loading screens
- **Smooth Transitions** - 60fps animations throughout
- **Notification System** - Modern toast notifications
- **Keyboard Navigation** - Full accessibility support
- **Error Handling** - Graceful error recovery

## 🚀 Quick Start

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CorporateGuuu/midastechnial.git
   cd midastechnial
   ```

2. **Start local server:**
   ```bash
   # For main website
   php -S localhost:8080

   # For API backend (separate terminal)
   cd repairdesk-api-client && php -S localhost:8000
   ```

3. **Open in browser:**
   - Main Website: `http://localhost:8080`
   - API Backend: `http://localhost:8000`

### Netlify Deployment

The website is configured for automatic deployment on Netlify:

1. **Connect to Netlify:**
   - Import your GitHub repository
   - Netlify will automatically detect the configuration

2. **Build Settings:**
   - **Build Command:** `echo 'Static site - no build required'`
   - **Publish Directory:** `.` (root directory)
   - **Node Version:** 18

3. **Environment Variables:**
   ```
   NODE_VERSION=18
   ```

## 📁 Project Structure

```
midastechnial/
├── index.html                 # Homepage
├── iphone-parts.html         # iPhone parts page
├── samsung-parts.html        # Samsung parts page
├── macbook-parts.html        # MacBook parts page
├── ipad-parts.html          # iPad parts page
├── products.html            # All products page
├── categories.html          # Product categories
├── styles.css               # Main stylesheet
├── modern-scripts.js        # Modern JavaScript functionality
├── iphone-filters.js        # iPhone parts filtering
├── search.js                # Search functionality
├── side-menu.js             # Sidebar navigation
├── package.json             # Node.js dependencies
├── netlify.toml            # Netlify configuration
└── repairdesk-api-client/   # API backend
    ├── RepairDeskAPI.php
    ├── test.php
    └── ...
```

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome** - Icons and visual elements
- **Google Fonts** - Typography (Inter)

### Backend
- **PHP** - Server-side processing
- **Supabase** - Database integration
- **RepairDesk API** - Parts management system

### Deployment
- **Netlify** - Hosting and deployment
- **Git** - Version control
- **npm** - Package management

## 📊 Performance

- **Page Load Time:** < 2 seconds
- **Lighthouse Score:** 95+ (Performance, Accessibility, SEO)
- **Mobile Responsive:** 100% compatible
- **Cross-browser:** Chrome, Firefox, Safari, Edge

## 🔧 Development

### Prerequisites
- PHP 8.0+ (for local development)
- Node.js 18+ (for Netlify deployment)
- Modern web browser

### Local Development Setup
```bash
# Install dependencies
npm install

# Start development server
php -S localhost:8080

# For API testing
cd repairdesk-api-client
php test.php
```

### Build for Production
```bash
# No build required - static site
# Files are served directly from repository
```

## 📈 SEO & Analytics

- **Meta Tags** - Comprehensive SEO optimization
- **Open Graph** - Social media sharing
- **Structured Data** - Rich snippets support
- **Performance Monitoring** - Built-in analytics

## 🔒 Security

- **HTTPS** - SSL certificate via Netlify
- **Content Security Policy** - Security headers
- **Input Validation** - XSS protection
- **Secure Headers** - OWASP recommendations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email:** support@midastech.com
- **Phone:** +1 (555) 123-4567
- **Address:** 123 Tech Street, Silicon Valley

## 🙏 Acknowledgments

- **Design Inspiration:** Modern e-commerce best practices
- **Icons:** Font Awesome
- **Fonts:** Google Fonts (Inter)
- **Images:** Unsplash (demo purposes)
- **API:** RepairDesk API integration

---

**Built with ❤️ by Midas Technical Solutions Team**

*Premium Quality Parts • Expert Support • Fast Delivery*
