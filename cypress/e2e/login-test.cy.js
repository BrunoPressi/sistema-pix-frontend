describe("Login Page", () => {
   it ("Testar login com sucesso", () => {
      cy.visit("http://localhost:5173/");

      cy.get('input[name="cpf_cnpj"]').type("047.930.260-01");
      cy.get('input[name="senha"]').type("john123");

      cy.get('button[type="submit"]').click();
   });

   it("Testar login com cpf inválido", () => {
       cy.visit("http://localhost:5173/");

       cy.get('input[name="cpf_cnpj"]').type("461.654.780-77");
       cy.get('input[name="senha"]').type("senha123");

       cy.get('button[type="submit"]').click();

       cy.contains("Usuário |461.654.780-77| não encontrado.")
   });

    it("Testar login com senha inválida", () => {
        cy.visit("http://localhost:5173/");

        cy.get('input[name="cpf_cnpj"]').type("047.930.260-01");
        cy.get('input[name="senha"]').type("senhaInvalida123");

        cy.get('button[type="submit"]').click();

        cy.contains("Senhas não coincidem, tente novamente.");
    });

});