describe('Search Functionality Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display search input', () => {
    cy.get('#search-input').should('be.visible')
    cy.get('#search-form').should('be.visible')
    cy.get('.search-submit-btn').should('be.visible')
  })

  it('should search for products', () => {
    cy.get('#search-input').type('iPhone')
    cy.get('#search-form').submit()

    // Check search results
    cy.get('#search-results').should('be.visible')
    cy.get('.search-result-item').should('have.length.greaterThan', 0)
    cy.get('.search-result-item').each(($result) => {
      cy.wrap($result).should('contain', 'iPhone')
    })
  })

  it('should show no results for invalid search', () => {
    cy.get('#search-input').type('nonexistentproduct12345')
    cy.get('#search-form').submit()

    cy.get('#search-results').should('contain', 'No results found')
  })

  it('should add product to cart from search results', () => {
    cy.get('#search-input').type('iPhone')
    cy.get('#search-form').submit()

    cy.get('#search-results .add-to-cart-btn').first().click()
    cy.get('.cart-count').should('not.contain', '0')
  })

  it('should display search result details', () => {
    cy.get('#search-input').type('battery')
    cy.get('#search-form').submit()

    cy.get('.search-result-item').first().within(() => {
      cy.get('h3').should('not.be.empty')
      cy.get('p').should('not.be.empty')
      cy.get('.price').should('contain', '$')
      cy.get('.rating').should('contain', '★')
      cy.get('.stock').should('be.visible')
    })
  })

  it('should search by category', () => {
    cy.get('#search-input').type('macbook')
    cy.get('#search-form').submit()

    cy.get('.search-result-item').each(($result) => {
      cy.wrap($result).should('contain', 'MacBook')
    })
  })
})
