//require('cypress-metamask');
import "cypress-metamask";

describe('template spec', () => {
  /*
  it('Deve realizar a emissão de certificados com campos validos', () =>{
    cy.visit('http://localhost:5173')
    cy.get('article > .flex').click()
    cy.get('.gap-5 > :nth-child(2)').click()

    cy.get('.gap-5 > :nth-child(1) > div > .w-full').type("Agostinho Carrara")
    cy.get('.gap-5 > :nth-child(2) > div > .w-full').type("Habilitação para motorista de taxi")
    cy.get(':nth-child(3) > div > .w-full').type("Carrara Taxi")

    cy.get('.gap-5 > .bg-primary').click()

    cy.get('.fixed > .bg-secondary-gray', { timeout: 100000 })
    .should('be.visible')
    .then(() => {
      cy.wait(1000)
      cy.get('.text-base').contains("Certificado emitido com sucesso!")
      cy.get('.p-1 > .flex > .text-white').click()
      cy.get('.w-6 > path').click()
    })

    //cy.setupMetamask('Steins;Gate');
    //cy.changeMetamaskNetwork('sepolia');
    //cy.confirmMetamaskTransaction();
    //cy.wait(10000)

    //cy.get('.text-base').contains("Certificado emitido com sucesso!")
    //cy.get('.p-1 > .flex > .text-white').click()
    //cy.get('.w-6 > path').click()
  })
  */
  it('Deve negar a emissão de certificados com campos vazios', () => {
    cy.visit('http://localhost:5173')
    cy.get('article > .flex').click()
    cy.get('.gap-5 > :nth-child(2)').click()
    cy.get('.gap-5 > .bg-primary').click()

    cy.get(':nth-child(1) > .text-red-500').contains("O nome do destinatário é obrigatório.")
    cy.get(':nth-child(2) > .text-red-500').contains("O título do certificado é obrigatório.")
    cy.get(':nth-child(3) > .text-red-500').contains("O nome do emissor é obrigatório.")
  })
  it('Deve notificar na validação que não pode verificar validação com campos vazios', () => {
    cy.visit('http://localhost:5173')
    cy.get('article > .flex').click()
    cy.get('.gap-5 > [href="/validate"]').click()

    cy.get('.gap-5 > .bg-primary').click()
    cy.get('.gap-5 > :nth-child(1) > .text-red-500').contains('Você deve fornecer o ID do certificado ou carregar um arquivo PDF.')
  })
  it('Deve notificar que não pode registrar instituição com campos vazios', () => {
    cy.visit('http://localhost:5173/registerInstitution')
    cy.get('.gap-5 > .bg-primary').click()
    cy.get('.text-red-500').contains('O endereço da instituição é obrigatório')
  })
  it('Deve notificar que não pode registrar instituições com endereços invalidos', () => {
    cy.visit('http://localhost:5173/registerInstitution')
    cy.get('div > .w-full').type('sdfsdfsdfes')
    cy.get('.flex > .bg-primary').click()
    cy.get('.text-red-500').contains('Endereço inválido. Deve ser um endereço Ethereum válido.')
  })
  it('Deve notificar na validação que o certificado é invalido caso sejam passados dados invalidos', () => {
    cy.visit('http://localhost:5173/validate')
    cy.get('.gap-5 > :nth-child(1) > div > .w-full').type('asd')
    cy.get('.gap-5 > .bg-primary').click()

    cy.get('.text-base').contains('Certificado inválido!')
    cy.get('.w-6 > path').click()
  })/*
  it('Deve notificar na validação que o certificado é valido caso sejam passados dados validos', () => {
    cy.visit('http://localhost:5173/validate')
    cy.get('.gap-5 > :nth-child(1) > div > .w-full').type('7d7b2c6b6e3b9d27457eff76f7cd9d4f84c99c29072e5de1dd2c13eb0fb225a0')
    cy.get('.gap-5 > .bg-primary').click()

    cy.get('.text-base').contains('Certificado válido!')
    cy.get('.w-6 > path').click()
  })*/
})