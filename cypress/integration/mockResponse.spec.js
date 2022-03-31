const { createYield, isExportDeclaration, addSyntheticLeadingComment } = require("typescript")
/// <reference types="cypress" />


describe('First API test', () => {

    beforeEach('Login', () => {
        cy.server()
        cy.route('GET', '**/tags', 'fixture:tags.json')
        cy.loginToApplication()
    })

    it('Fake tags', () => {

        cy.get('.tag-pill').each((popularTags, tagIndex) => {
            cy.wrap(popularTags).should('contain', jsonData[tagIndex])

        })
    })
})