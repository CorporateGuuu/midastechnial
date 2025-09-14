describe('Shopping Cart Tests', () => {
  beforeEach(() => {
    cy.visit('/')
    // Clear cart before each test
    cy.window().then((win) => {
      win.localStorage.setItem('cart', JSON.stringify([]))
    })
  })

  it('should add product to cart from homepage', () => {
    cy.get('.add-to-cart-btn').first().click()
    cy.get('.cart-count').should('not.contain', '0')
  })

  it('should navigate to cart page', () => {
    cy.get('.cart-btn').click()
    cy.url().should('include', '/pages/cart.html')
  })

  it('should display cart items correctly', () => {
    // Add item to cart first
    cy.get('.add-to-cart-btn').first().click()

    // Navigate to cart
    cy.get('.cart-btn').click()

    // Check cart contents
    cy.get('#cart-items').should('be.visible')
    cy.get('.cart-item').should('have.length', 1)
    cy.get('.cart-item h4').should('not.be.empty')
    cy.get('.cart-item .cart-item-price').should('contain', '$')
  })

  it('should update item quantity in cart', () => {
    // Add item to cart
    cy.get('.add-to-cart-btn').first().click()
    cy.get('.cart-btn').click()

    // Increase quantity
    cy.get('.quantity-btn').contains('+').click()
    cy.get('.quantity').should('contain', '2')

    // Decrease quantity
    cy.get('.quantity-btn').contains('-').click()
    cy.get('.quantity').should('contain', '1')
  })

  it('should remove item from cart', () => {
    // Add item to cart
    cy.get('.add-to-cart-btn').first().click()
    cy.get('.cart-btn').click()

    // Remove item
    cy.get('.remove-btn').click()
    cy.get('.empty-cart').should('be.visible')
  })

  it('should calculate cart total correctly', () => {
    // Add multiple items
    cy.get('.add-to-cart-btn').first().click()
    cy.get('.add-to-cart-btn').eq(1).click()

    cy.get('.cart-btn').click()

    // Check that summary is calculated
    cy.get('#cart-summary').should('be.visible')
    cy.get('.summary-row').should('have.length', 4) // Subtotal, Tax, Shipping, Total
    cy.get('.total-row .summary-row span').last().should('contain', '$')
  })

  it('should show free shipping for orders over $99', () => {
    // Add expensive item
    cy.get('.add-to-cart-btn').first().click()
    cy.get('.cart-btn').click()

    // Check shipping calculation
    cy.get('.summary-row').contains('Shipping').next().should('contain', 'FREE')
  })

  it('should persist cart across page reloads', () => {
    // Add item to cart
    cy.get('.add-to-cart-btn').first().click()
    cy.get('.cart-count').should('not.contain', '0')

    // Reload page
    cy.reload()

    // Cart should still have the item
    cy.get('.cart-count').should('not.contain', '0')
  })
})
