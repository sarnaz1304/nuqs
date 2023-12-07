/// <reference types="cypress" />

function waitForHydration() {
  cy.contains('#hydration-marker', 'hydrated').should('be.hidden')
  cy.wait(50)
}

function expectPathname(pathname) {
  cy.location('pathname').should('eq', Cypress.env('basePath') + pathname)
}

describe('routing-tour', () => {
  it('server -> a', () => {
    cy.visit('/app/routing-tour/start/server')
    waitForHydration()

    cy.get('a').contains('a (server, prefetch)').click()
    waitForHydration()
    expectPathname('/app/routing-tour/a')
    cy.location('search').should('eq', '?from=start.server')
    cy.get('#from').should('have.text', 'start.server')
    cy.get('#this').should('have.text', 'a')
    cy.get('#next').should('have.text', 'b')
    cy.get('#counter').should('have.text', '0')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/b')
    cy.location('search').should('eq', '?from=a&counter=1')
    cy.get('#from').should('have.text', 'a')
    cy.get('#this').should('have.text', 'b')
    cy.get('#next').should('have.text', 'c')
    cy.get('#counter').should('have.text', '1')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/c')
    cy.location('search').should('eq', '?from=b&counter=2')
    cy.get('#from').should('have.text', 'b')
    cy.get('#this').should('have.text', 'c')
    cy.get('#next').should('have.text', 'd')
    cy.get('#counter').should('have.text', '2')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/d')
    cy.location('search').should('eq', '?from=c&counter=3')
    cy.get('#from').should('have.text', 'c')
    cy.get('#this').should('have.text', 'd')
    cy.get('#next').should('have.text', 'a')
    cy.get('#counter').should('have.text', '3')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/a')
    cy.location('search').should('eq', '?from=d&counter=4')
    cy.get('#from').should('have.text', 'd')
    cy.get('#this').should('have.text', 'a')
    cy.get('#next').should('have.text', 'b')
    cy.get('#counter').should('have.text', '4')
  })

  it('server -> b', () => {
    cy.visit('/app/routing-tour/start/server')
    waitForHydration()

    cy.get('a').contains('b (server, no prefetch)').click()
    waitForHydration()
    expectPathname('/app/routing-tour/b')
    cy.location('search').should('eq', '?from=start.server')
    cy.get('#from').should('have.text', 'start.server')
    cy.get('#this').should('have.text', 'b')
    cy.get('#next').should('have.text', 'c')
    cy.get('#counter').should('have.text', '0')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/c')
    cy.location('search').should('eq', '?from=b&counter=1')
    cy.get('#from').should('have.text', 'b')
    cy.get('#this').should('have.text', 'c')
    cy.get('#next').should('have.text', 'd')
    cy.get('#counter').should('have.text', '1')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/d')
    cy.location('search').should('eq', '?from=c&counter=2')
    cy.get('#from').should('have.text', 'c')
    cy.get('#this').should('have.text', 'd')
    cy.get('#next').should('have.text', 'a')
    cy.get('#counter').should('have.text', '2')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/a')
    cy.location('search').should('eq', '?from=d&counter=3')
    cy.get('#from').should('have.text', 'd')
    cy.get('#this').should('have.text', 'a')
    cy.get('#next').should('have.text', 'b')
    cy.get('#counter').should('have.text', '3')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/b')
    cy.location('search').should('eq', '?from=a&counter=4')
    cy.get('#from').should('have.text', 'a')
    cy.get('#this').should('have.text', 'b')
    cy.get('#next').should('have.text', 'c')
    cy.get('#counter').should('have.text', '4')
  })

  it('server -> c', () => {
    cy.visit('/app/routing-tour/start/server')
    waitForHydration()

    cy.get('a').contains('c (client, prefetch)').click()
    waitForHydration()
    expectPathname('/app/routing-tour/c')
    cy.location('search').should('eq', '?from=start.server')
    cy.get('#from').should('have.text', 'start.server')
    cy.get('#this').should('have.text', 'c')
    cy.get('#next').should('have.text', 'd')
    cy.get('#counter').should('have.text', '0')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/d')
    cy.location('search').should('eq', '?from=c&counter=1')
    cy.get('#from').should('have.text', 'c')
    cy.get('#this').should('have.text', 'd')
    cy.get('#next').should('have.text', 'a')
    cy.get('#counter').should('have.text', '1')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/a')
    cy.location('search').should('eq', '?from=d&counter=2')
    cy.get('#from').should('have.text', 'd')
    cy.get('#this').should('have.text', 'a')
    cy.get('#next').should('have.text', 'b')
    cy.get('#counter').should('have.text', '2')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/b')
    cy.location('search').should('eq', '?from=a&counter=3')
    cy.get('#from').should('have.text', 'a')
    cy.get('#this').should('have.text', 'b')
    cy.get('#next').should('have.text', 'c')
    cy.get('#counter').should('have.text', '3')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/c')
    cy.location('search').should('eq', '?from=b&counter=4')
    cy.get('#from').should('have.text', 'b')
    cy.get('#this').should('have.text', 'c')
    cy.get('#next').should('have.text', 'd')
    cy.get('#counter').should('have.text', '4')
  })

  it('server -> d', () => {
    cy.visit('/app/routing-tour/start/server')
    waitForHydration()

    cy.get('a').contains('d (client, no prefetch)').click()
    waitForHydration()
    expectPathname('/app/routing-tour/d')
    cy.location('search').should('eq', '?from=start.server')
    cy.get('#from').should('have.text', 'start.server')
    cy.get('#this').should('have.text', 'd')
    cy.get('#next').should('have.text', 'a')
    cy.get('#counter').should('have.text', '0')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/a')
    cy.location('search').should('eq', '?from=d&counter=1')
    cy.get('#from').should('have.text', 'd')
    cy.get('#this').should('have.text', 'a')
    cy.get('#next').should('have.text', 'b')
    cy.get('#counter').should('have.text', '1')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/b')
    cy.location('search').should('eq', '?from=a&counter=2')
    cy.get('#from').should('have.text', 'a')
    cy.get('#this').should('have.text', 'b')
    cy.get('#next').should('have.text', 'c')
    cy.get('#counter').should('have.text', '2')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/c')
    cy.location('search').should('eq', '?from=b&counter=3')
    cy.get('#from').should('have.text', 'b')
    cy.get('#this').should('have.text', 'c')
    cy.get('#next').should('have.text', 'd')
    cy.get('#counter').should('have.text', '3')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/d')
    cy.location('search').should('eq', '?from=c&counter=4')
    cy.get('#from').should('have.text', 'c')
    cy.get('#this').should('have.text', 'd')
    cy.get('#next').should('have.text', 'a')
    cy.get('#counter').should('have.text', '4')
  })

  it('client -> a', () => {
    cy.visit('/app/routing-tour/start/client')
    waitForHydration()

    cy.get('a').contains('a (server, prefetch)').click()
    waitForHydration()
    expectPathname('/app/routing-tour/a')
    cy.location('search').should('eq', '?from=start.client')
    cy.get('#from').should('have.text', 'start.client')
    cy.get('#this').should('have.text', 'a')
    cy.get('#next').should('have.text', 'b')
    cy.get('#counter').should('have.text', '0')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/b')
    cy.location('search').should('eq', '?from=a&counter=1')
    cy.get('#from').should('have.text', 'a')
    cy.get('#this').should('have.text', 'b')
    cy.get('#next').should('have.text', 'c')
    cy.get('#counter').should('have.text', '1')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/c')
    cy.location('search').should('eq', '?from=b&counter=2')
    cy.get('#from').should('have.text', 'b')
    cy.get('#this').should('have.text', 'c')
    cy.get('#next').should('have.text', 'd')
    cy.get('#counter').should('have.text', '2')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/d')
    cy.location('search').should('eq', '?from=c&counter=3')
    cy.get('#from').should('have.text', 'c')
    cy.get('#this').should('have.text', 'd')
    cy.get('#next').should('have.text', 'a')
    cy.get('#counter').should('have.text', '3')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/a')
    cy.location('search').should('eq', '?from=d&counter=4')
    cy.get('#from').should('have.text', 'd')
    cy.get('#this').should('have.text', 'a')
    cy.get('#next').should('have.text', 'b')
    cy.get('#counter').should('have.text', '4')
  })

  it('client -> b', () => {
    cy.visit('/app/routing-tour/start/client')
    waitForHydration()

    cy.get('a').contains('b (server, no prefetch)').click()
    waitForHydration()
    expectPathname('/app/routing-tour/b')
    cy.location('search').should('eq', '?from=start.client')
    cy.get('#from').should('have.text', 'start.client')
    cy.get('#this').should('have.text', 'b')
    cy.get('#next').should('have.text', 'c')
    cy.get('#counter').should('have.text', '0')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/c')
    cy.location('search').should('eq', '?from=b&counter=1')
    cy.get('#from').should('have.text', 'b')
    cy.get('#this').should('have.text', 'c')
    cy.get('#next').should('have.text', 'd')
    cy.get('#counter').should('have.text', '1')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/d')
    cy.location('search').should('eq', '?from=c&counter=2')
    cy.get('#from').should('have.text', 'c')
    cy.get('#this').should('have.text', 'd')
    cy.get('#next').should('have.text', 'a')
    cy.get('#counter').should('have.text', '2')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/a')
    cy.location('search').should('eq', '?from=d&counter=3')
    cy.get('#from').should('have.text', 'd')
    cy.get('#this').should('have.text', 'a')
    cy.get('#next').should('have.text', 'b')
    cy.get('#counter').should('have.text', '3')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/b')
    cy.location('search').should('eq', '?from=a&counter=4')
    cy.get('#from').should('have.text', 'a')
    cy.get('#this').should('have.text', 'b')
    cy.get('#next').should('have.text', 'c')
    cy.get('#counter').should('have.text', '4')
  })

  it('client -> c', () => {
    cy.visit('/app/routing-tour/start/client')
    waitForHydration()

    cy.get('a').contains('c (client, prefetch)').click()
    waitForHydration()
    expectPathname('/app/routing-tour/c')
    cy.location('search').should('eq', '?from=start.client')
    cy.get('#from').should('have.text', 'start.client')
    cy.get('#this').should('have.text', 'c')
    cy.get('#next').should('have.text', 'd')
    cy.get('#counter').should('have.text', '0')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/d')
    cy.location('search').should('eq', '?from=c&counter=1')
    cy.get('#from').should('have.text', 'c')
    cy.get('#this').should('have.text', 'd')
    cy.get('#next').should('have.text', 'a')
    cy.get('#counter').should('have.text', '1')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/a')
    cy.location('search').should('eq', '?from=d&counter=2')
    cy.get('#from').should('have.text', 'd')
    cy.get('#this').should('have.text', 'a')
    cy.get('#next').should('have.text', 'b')
    cy.get('#counter').should('have.text', '2')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/b')
    cy.location('search').should('eq', '?from=a&counter=3')
    cy.get('#from').should('have.text', 'a')
    cy.get('#this').should('have.text', 'b')
    cy.get('#next').should('have.text', 'c')
    cy.get('#counter').should('have.text', '3')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/c')
    cy.location('search').should('eq', '?from=b&counter=4')
    cy.get('#from').should('have.text', 'b')
    cy.get('#this').should('have.text', 'c')
    cy.get('#next').should('have.text', 'd')
    cy.get('#counter').should('have.text', '4')
  })

  it('client -> d', () => {
    cy.visit('/app/routing-tour/start/client')
    waitForHydration()

    cy.get('a').contains('d (client, no prefetch)').click()
    waitForHydration()
    expectPathname('/app/routing-tour/d')
    cy.location('search').should('eq', '?from=start.client')
    cy.get('#from').should('have.text', 'start.client')
    cy.get('#this').should('have.text', 'd')
    cy.get('#next').should('have.text', 'a')
    cy.get('#counter').should('have.text', '0')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/a')
    cy.location('search').should('eq', '?from=d&counter=1')
    cy.get('#from').should('have.text', 'd')
    cy.get('#this').should('have.text', 'a')
    cy.get('#next').should('have.text', 'b')
    cy.get('#counter').should('have.text', '1')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/b')
    cy.location('search').should('eq', '?from=a&counter=2')
    cy.get('#from').should('have.text', 'a')
    cy.get('#this').should('have.text', 'b')
    cy.get('#next').should('have.text', 'c')
    cy.get('#counter').should('have.text', '2')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/c')
    cy.location('search').should('eq', '?from=b&counter=3')
    cy.get('#from').should('have.text', 'b')
    cy.get('#this').should('have.text', 'c')
    cy.get('#next').should('have.text', 'd')
    cy.get('#counter').should('have.text', '3')

    cy.get('a').contains('Next').click()
    waitForHydration()
    expectPathname('/app/routing-tour/d')
    cy.location('search').should('eq', '?from=c&counter=4')
    cy.get('#from').should('have.text', 'c')
    cy.get('#this').should('have.text', 'd')
    cy.get('#next').should('have.text', 'a')
    cy.get('#counter').should('have.text', '4')
  })
})
