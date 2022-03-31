const { createYield, isExportDeclaration } = require("typescript")
/// <reference types="cypress" />

describe('First API test', () => {

    beforeEach('Login', () => {
        cy.loginToApplication()
    })

    it('First Test', () => {

        cy.server()
        cy.route('POST', '**/articles').as('postArticles')
        // Listen for POST calls on the **/article endpoint and store it using .as in the postArticles object.

        const articleTitle = 'Article Title'
        const articleBody = 'Article Body'
        const articleHeader = 'Article Header'

        cy.contains('New Article').click()
        cy.get('[test-data="article-title"]').clear().type(articleTitle)
        cy.get('[test-data="article-header"]').clear().type(articleHeader)
        cy.get('[test-data="article-body"]').clear().type(articleBody)
        cy.contains('Publish Article').click()

        cy.wait('@postArticles') // Wait for this response to be received
        cy.get('@postArticles').then(xhr => {
            console.log(xhr)
            expect(xhr.status).to.equal(200)
            expect(xhr.request.body.article.body).to.equal('Article Body')
            expect(xhr.response.body.article.description).to.equal('Article Header')
        })

        cy.contains('Delete Article').click()
        cy.contains('Global Feed').click()
        cy.get('app-article-preview').should('have.length', '3')
    })
})