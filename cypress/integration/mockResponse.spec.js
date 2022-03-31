const { createYield, isExportDeclaration, addSyntheticLeadingComment } = require("typescript")
/// <reference types="cypress" />



describe('First API test', () => {

    beforeEach('Login', () => {
        cy.server()
        cy.route('GET', '**/tags', 'fixture:tags.json')
        cy.loginToApplication()
    })

    it('Fake tags', () => {

        cy.fixture('tags').then((tagsJson) => {
            this.tagsJson = tagsJson
        })

        const tagsNames = tagsJson

        cy.get('.tag-pill').each((popularTags, tagIndex) => {
            cy.wrap(popularTags).should('contain', tagsNames[tagIndex])

        })
    })
})