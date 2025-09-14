describe('Smoke Test - Core E-Commerce Functionality', () => {
  it('should load homepage and display products', () => {
    cy.visit('/')
    cy.get('title').should('contain', 'Midas Technical Solutions')
    cy.get('.product-card').should('have.length.greaterThan', 0)
  })

  it('should add product to cart', () => {
    cy.visit('/')
    cy.get('.add-to-cart-btn').first().click()
    cy.get('.cart-count').should('not.contain', '0')
  })

  it('should search for products', () => {
    cy.visit('/')
    cy.get('#search-input').type('iPhone')
    cy.get('#search-form').submit()
    cy.get('#search-results').should('be.visible')
  })

  it('should navigate to products page', () => {
    cy.visit('/')
    cy.get('a[href="pages/products.html"]').first().click()
    cy.url().should('include', '/pages/products.html')
  })

  it('should display social media links', () => {
    cy.visit('/')
    cy.get('a[href*="instagram"]').should('be.visible')
    cy.get('a[href*="linkedin"]').should('be.visible')
  })
})
