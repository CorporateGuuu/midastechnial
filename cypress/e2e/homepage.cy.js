describe('Homepage Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the homepage successfully', () => {
    cy.url().should('include', 'localhost:3000')
    cy.get('title').should('contain', 'Midas Technical Solutions')
  })

  it('should display main navigation links', () => {
    // Check header navigation links
    cy.get('.nav-links').should('be.visible')
    cy.get('.nav-links a[href="index.html"]').should('contain', 'Home')
    cy.get('.nav-links a[href="products.html"]').should('contain', 'Products')
    cy.get('.nav-links a[href="financing.html"]').should('contain', 'Financing')
    cy.get('.nav-links a[href="account.html"]').should('contain', 'Account')
  })

  it('should display sidebar menu links', () => {
    // Open sidebar menu - use force: true since it might be hidden on large screens
    cy.get('.menu-toggle').click({ force: true })

    // Check sidebar sections
    cy.get('.sidebar-nav').should('be.visible')
    cy.get('.sidebar-section h3').should('have.length.greaterThan', 0)

    // Check some key links
    cy.get('a[href="iphone-parts.html"]').should('contain', 'iPhone Parts')
    cy.get('a[href="samsung-parts.html"]').should('contain', 'Samsung Parts')
    cy.get('a[href="macbook-parts.html"]').should('contain', 'MacBook Parts')
  })

  it('should display hero section', () => {
    cy.get('.hero-section').should('be.visible')
    cy.get('.hero-title').should('contain', 'Professional Repair Parts')
    cy.get('.btn-primary[href="products.html"]').should('be.visible')
  })

  it('should display featured categories', () => {
    cy.get('.categories-section').should('be.visible')
    cy.get('.category-card').should('have.length', 4)
    cy.get('.category-card[href="iphone-parts.html"]').should('contain', 'iPhone Parts')
    cy.get('.category-card[href="samsung-parts.html"]').should('contain', 'Samsung Parts')
  })

  it('should display featured products', () => {
    cy.get('.products-section').should('be.visible')
    cy.get('.product-card').should('have.length.greaterThan', 0)
    cy.get('.product-card').first().should('contain', 'iPhone')
  })

  it('should display footer links', () => {
    cy.get('.modern-footer').should('be.visible')
    cy.get('a[href="products.html"]').should('exist')
    cy.get('a[href="categories.html"]').should('exist')
    cy.get('a[href="repair-tools.html"]').should('exist')
  })

  it('should navigate to products page', () => {
    cy.get('.nav-links a[href="products.html"]').click()
    cy.url().should('include', '/pages/products.html')
  })

  it('should navigate to iphone parts page', () => {
    cy.get('.menu-toggle').click({ force: true })
    cy.get('a[href="iphone-parts.html"]').click()
    cy.url().should('include', '/pages/iphone-parts.html')
  })
})
