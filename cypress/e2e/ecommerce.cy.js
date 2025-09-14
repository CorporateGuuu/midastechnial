describe('Complete E-Commerce Flow Tests', () => {
  beforeEach(() => {
    cy.visit('/')
    // Clear all localStorage data
    cy.window().then((win) => {
      win.localStorage.clear()
    })
  })

  it('should complete full shopping experience', () => {
    // Step 1: Browse products on homepage
    cy.get('.product-card').should('have.length', 6)
    cy.get('.product-card').first().should('contain', 'iPhone 15 Pro Max Screen')

    // Step 2: Add product to cart
    cy.get('.add-to-cart-btn').first().click()
    cy.get('.cart-count').should('contain', '1')

    // Step 3: Search for another product
    cy.get('#search-input').type('battery')
    cy.get('#search-form').submit()
    cy.get('#search-results').should('be.visible')
    cy.get('.search-result-item').should('have.length.greaterThan', 0)

    // Step 4: Add product from search results
    cy.get('#search-results .add-to-cart-btn').first().click()
    cy.get('.cart-count').should('contain', '2')

    // Step 5: Navigate to cart
    cy.get('.cart-btn').click()
    cy.url().should('include', '/cart.html')

    // Step 6: Verify cart contents
    cy.get('.cart-item').should('have.length', 2)
    cy.get('#cart-summary').should('be.visible')
    cy.get('.total-row span').last().should('contain', '$')

    // Step 7: Update quantity
    cy.get('.quantity-btn').contains('+').first().click()
    cy.get('.quantity').first().should('contain', '2')

    // Step 8: Remove item
    cy.get('.remove-btn').first().click()
    cy.get('.cart-item').should('have.length', 1)

    // Step 9: Test checkout (would require login)
    cy.get('.checkout-btn').click()
    // Should redirect to sign-in since no user is logged in
    cy.url().should('include', '/sign-in.html')
  })

  it('should handle out of stock products', () => {
    // Find a product and check stock status
    cy.get('.product-card').each(($card) => {
      cy.wrap($card).find('.stock-status').should('be.visible')
    })

    // Out of stock products should have disabled buttons
    cy.get('.add-to-cart-btn[disabled]').should('have.attr', 'disabled')
  })

  it('should persist cart data across sessions', () => {
    // Add items to cart
    cy.get('.add-to-cart-btn').first().click()
    cy.get('.add-to-cart-btn').eq(1).click()
    cy.get('.cart-count').should('contain', '2')

    // Reload page
    cy.reload()

    // Cart should still have items
    cy.get('.cart-count').should('contain', '2')

    // Navigate to cart and verify items
    cy.get('.cart-btn').click()
    cy.get('.cart-item').should('have.length', 2)
  })

  it('should handle product filtering', () => {
    cy.visit('/pages/products.html')

    // Test category filter
    cy.get('#category-filter').select('iphone')
    cy.get('.product-card').each(($card) => {
      cy.wrap($card).should('contain', 'iPhone')
    })

    // Reset filter
    cy.get('.filter-reset-btn').click()
    cy.get('.product-card').should('have.length.greaterThan', 2)
  })

  it('should display product details correctly', () => {
    cy.get('.product-card').first().within(() => {
      // Check all required elements
      cy.get('h3').should('not.be.empty')
      cy.get('p').should('not.be.empty')
      cy.get('img').should('have.attr', 'src').and('include', 'http')
      cy.get('.current-price').should('contain', '$')
      cy.get('.stars').should('be.visible')
      cy.get('.rating-count').should('contain', 'reviews')
      cy.get('.stock-status').should('be.visible')
    })
  })

  it('should handle empty cart state', () => {
    cy.get('.cart-btn').click()
    cy.get('.empty-cart').should('be.visible')
    cy.get('.empty-cart h3').should('contain', 'Your cart is empty')
    cy.get('.empty-cart a').should('contain', 'Browse Products')
  })

  it('should calculate shipping correctly', () => {
    // Add expensive item (over $99)
    cy.get('.add-to-cart-btn').first().click() // iPhone screen ~$299
    cy.get('.cart-btn').click()

    // Should show FREE shipping
    cy.get('.summary-row').contains('Shipping').next().should('contain', 'FREE')

    // Clear cart and add cheap item
    cy.window().then((win) => {
      win.localStorage.setItem('cart', JSON.stringify([]))
    })
    cy.reload()

    // Add cheap item
    cy.get('.add-to-cart-btn').eq(3).click() // Repair kit ~$89
    cy.get('.cart-btn').click()

    // Should show shipping cost
    cy.get('.summary-row').contains('Shipping').next().should('contain', '$9.99')
  })
})
