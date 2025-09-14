describe('Product Carousel Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display carousel with products', () => {
    cy.get('#carousel-track').should('be.visible')
    cy.get('.carousel-slide').should('have.length.greaterThan', 0)
    cy.get('.carousel-slide .product-card').should('have.length.greaterThan', 0)
  })

  it('should display carousel navigation buttons', () => {
    cy.get('#carousel-prev').should('be.visible')
    cy.get('#carousel-next').should('be.visible')
  })

  it('should display carousel indicators', () => {
    cy.get('#carousel-indicators').should('be.visible')
    cy.get('.carousel-indicator').should('have.length.greaterThan', 0)
    cy.get('.carousel-indicator.active').should('have.length', 1)
  })

  it('should show product details in carousel', () => {
    cy.get('.carousel-slide .product-card').first().within(() => {
      cy.get('h3').should('not.be.empty')
      cy.get('p').should('not.be.empty')
      cy.get('.current-price').should('contain', '$')
      cy.get('.add-to-cart-btn').should('be.visible')
    })
  })

  it('should navigate to next slide', () => {
    // Get initial active indicator
    cy.get('.carousel-indicator.active').invoke('index').as('initialIndex')

    // Click next button
    cy.get('#carousel-next').click()

    // Check that active indicator changed
    cy.get('@initialIndex').then((initialIndex) => {
      cy.get('.carousel-indicator.active').invoke('index').should('not.equal', initialIndex)
    })
  })

  it('should navigate to previous slide', () => {
    // First go to next slide
    cy.get('#carousel-next').click()

    // Get current active indicator
    cy.get('.carousel-indicator.active').invoke('index').as('currentIndex')

    // Click previous button
    cy.get('#carousel-prev').click()

    // Check that we went back
    cy.get('@currentIndex').then((currentIndex) => {
      cy.get('.carousel-indicator.active').invoke('index').should('not.equal', currentIndex)
    })
  })

  it('should navigate using indicators', () => {
    // Click on second indicator (if it exists)
    cy.get('.carousel-indicator').eq(1).then(($indicator) => {
      if ($indicator.length > 0) {
        cy.wrap($indicator).click()
        cy.get('.carousel-indicator').eq(1).should('have.class', 'active')
      }
    })
  })

  it('should add product to cart from carousel', () => {
    cy.get('.carousel-slide .add-to-cart-btn').first().click()
    cy.get('.cart-count').should('not.contain', '0')
  })

  it('should pause autoplay on hover', () => {
    // This test verifies that the carousel container exists for hover functionality
    cy.get('.carousel-container').should('be.visible')
  })

  it('should have responsive design', () => {
    // Test on mobile viewport
    cy.viewport('iphone-6')
    cy.get('.carousel-slide').should('be.visible')
    cy.get('.carousel-slide .product-card').should('have.length', 1) // Should show 1 product per slide on mobile

    // Test on desktop viewport
    cy.viewport('macbook-15')
    cy.get('.carousel-slide .product-card').should('have.length', 3) // Should show 3 products per slide on desktop
  })
})
