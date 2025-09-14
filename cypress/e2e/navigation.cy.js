describe('Navigation and Footer Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate to all footer quick links', () => {
    // Test All Products link
    cy.get('a[href="products.html"]').first().click()
    cy.url().should('include', '/pages/products.html')
    cy.go('back')

    // Test Categories link
    cy.get('a[href="categories.html"]').first().click()
    cy.url().should('include', '/pages/categories.html')
    cy.go('back')

    // Test Tools link
    cy.get('a[href="repair-tools.html"]').first().click()
    cy.url().should('include', '/pages/repair-tools.html')
    cy.go('back')

    // Test Financing link
    cy.get('a[href="financing.html"]').first().click()
    cy.url().should('include', '/pages/financing.html')
    cy.go('back')
  })

  it('should navigate to all footer customer service links', () => {
    // Test My Orders link
    cy.get('a[href="my-orders.html"]').first().click()
    cy.url().should('include', '/pages/my-orders.html')
    cy.go('back')

    // Test My Profile link
    cy.get('a[href="my-profile.html"]').first().click()
    cy.url().should('include', '/pages/my-profile.html')
    cy.go('back')

    // Test Wishlist link
    cy.get('a[href="wishlist.html"]').first().click()
    cy.url().should('include', '/pages/wishlist.html')
    cy.go('back')

    // Test Shopping Cart link
    cy.get('a[href="cart.html"]').first().click()
    cy.url().should('include', '/pages/cart.html')
    cy.go('back')
  })

  it('should load all footer pages without errors', () => {
    const footerPages = [
      'products.html',
      'categories.html',
      'repair-tools.html',
      'financing.html',
      'my-orders.html',
      'my-profile.html',
      'wishlist.html',
      'cart.html'
    ]

    footerPages.forEach(page => {
      cy.visit(`/pages/${page}`)
      cy.get('body').should('be.visible')
      cy.get('title').should('not.be.empty')
    })
  })

  it('should display social media links correctly', () => {
    // Check Instagram link
    cy.get('a[href="https://www.instagram.com/midastechnical/#"]').should('be.visible')

    // Check LinkedIn link
    cy.get('a[href="https://www.linkedin.com/company/midas-technical-solutions/?viewAsMember=true"]').should('be.visible')

    // Check that Facebook link is not present
    cy.get('a[href*="facebook"]').should('not.exist')
  })

  it('should navigate through sidebar menu', () => {
    // Open sidebar
    cy.get('.menu-toggle').click()

    // Navigate to iPhone parts
    cy.get('a[href="iphone-parts.html"]').click()
    cy.url().should('include', '/iphone-parts.html')

    // Go back and navigate to products
    cy.go('back')
    cy.get('.menu-toggle').click()
    cy.get('a[href="products.html"]').click()
    cy.url().should('include', '/products.html')
  })

  it('should navigate through main navigation dropdown', () => {
    // Hover over Products dropdown
    cy.get('.dropdown').trigger('mouseover')

    // Click on iPhone Parts
    cy.get('.dropdown-menu a[href="iphone-parts.html"]').click()
    cy.url().should('include', '/iphone-parts.html')
  })

  it('should have working breadcrumb navigation', () => {
    // Navigate to products page
    cy.visit('/pages/products.html')

    // Check breadcrumb
    cy.get('.page-breadcrumb').should('be.visible')
    cy.get('.page-breadcrumb a[href="../index.html"]').should('contain', 'Home')

    // Click breadcrumb to go back
    cy.get('.page-breadcrumb a[href="../index.html"]').click()
    cy.url().should('include', '/')
  })
})
