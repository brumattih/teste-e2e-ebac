class CheckoutPage {

    preencheInformacoesObrigatorias(numero, cidade, cep, telefone, email) {
        cy.get('#billing_address_1').clear().type(numero)
        cy.get('#billing_city').clear().type(cidade)
        cy.get('#billing_postcode').clear().type(cep)
        cy.get('#billing_phone').clear().type(telefone)
        cy.get('#billing_email').clear().type(email)

        cy.get('#payment_method_cheque').click()
        cy.get('#terms').click()
    }

    finalizaCompra() {
        cy.get('#place_order').click()
    }

}

export default new CheckoutPage()