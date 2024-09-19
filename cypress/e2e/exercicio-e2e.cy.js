/// <reference types="cypress" />
import produtosPage from '../support/page_objects/produtos.page'
import carrinhoPage from '../support/page_objects/carrinho.page'
import checkoutPage from '../support/page_objects/checkout.page'

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações
        cy.fixture('perfil').then(login => {
            cy.login(login.usuario, login.senha)
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, teste-0999')
        })

        cy.fixture('produtos').then(produto => {
            produtosPage.visitarUrl()

            produtosPage.visitarProduto(produto[0].nomeProduto)
            produtosPage.addProdutoCarrinho(
                produto[0].tamanho,
                produto[0].cor,
                produto[0].quantidade,
            )
    
            produtosPage.visitarProduto(produto[1].nomeProduto)
            produtosPage.addProdutoCarrinho(
                produto[1].tamanho,
                produto[1].cor,
                produto[1].quantidade,
            )

            produtosPage.visitarProduto(produto[2].nomeProduto)
            produtosPage.addProdutoCarrinho(
                produto[2].tamanho,
                produto[2].cor,
                produto[2].quantidade,
            )

            produtosPage.visitarProduto(produto[3].nomeProduto)
            produtosPage.addProdutoCarrinho(
                produto[3].tamanho,
                produto[3].cor,
                produto[3].quantidade,
            )          
        })

        carrinhoPage.visitarUrl()
        carrinhoPage.avancaCheckout()

        cy.fixture('enderecos').then(endereco => {
            checkoutPage.preencheInformacoesObrigatorias(endereco.numero, endereco.cidade, endereco.cep, endereco.telefone, endereco.email)
            checkoutPage.finalizaCompra()
        })

        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido')
    });


})