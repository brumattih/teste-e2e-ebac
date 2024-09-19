class CarrinhoPage {

    visitarUrl() {
        cy.visit('carrinho')
    }

    avancaCheckout() {
        cy.get('.checkout-button').click()
    }

}

export default new CarrinhoPage()