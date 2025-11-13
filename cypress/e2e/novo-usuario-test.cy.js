import faker from 'faker-br';

const randomCpf = faker.br.cpf();
const randomCnpj = faker.br.cnpj();

describe("Cadastrar usuário page", () => {

    it ("Cadastrar novo usuário (CPF) com sucesso", () => {

       cy.visit("http://localhost:5173/");

       cy.contains('button', 'Criar Conta').click();

       cy.get('input[name="nomeCompleto"]').type("Alex Green");
       cy.get('input[name="cpfCnpj"]').type(randomCpf);
       cy.get('input[name="telefone"]').type("6727438629");
       cy.get('input[name="senha"]').type("alex123");
       cy.get('input[name="rua"]').type("Rua A");
       cy.get('input[name="bairro"]').type("Bairro A");
       cy.get('input[name="cidade"]').type("Cidade A");

       cy.get('button[type="submit"]').click();

       cy.contains('Usuário cadastrado com sucesso!');
    });

    it ("Cadastrar novo usuário (CNPJ) com sucesso", () => {

        cy.visit("http://localhost:5173/");

        cy.contains('button', 'Criar Conta').click();

        cy.get('input[name="nomeCompleto"]').type("Alex Green");
        cy.get('input[name="cpfCnpj"]').type(randomCnpj);
        cy.get('input[name="telefone"]').type("6727438629");
        cy.get('input[name="senha"]').type("alex123");
        cy.get('input[name="rua"]').type("Rua A");
        cy.get('input[name="bairro"]').type("Bairro A");
        cy.get('input[name="cidade"]').type("Cidade A");

        cy.get('button[type="submit"]').click();

        cy.contains('Usuário cadastrado com sucesso!');
    });

    it ("Cadastrar usuário com CPF já cadastrado", () => {

        cy.visit("http://localhost:5173/");

        cy.contains('button', 'Criar Conta').click();

        cy.get('input[name="nomeCompleto"]').type("Alex Green");
        cy.get('input[name="cpfCnpj"]').type("047.930.260-01");
        cy.get('input[name="telefone"]').type("6727438629");
        cy.get('input[name="senha"]').type("alex123");
        cy.get('input[name="rua"]').type("Rua A");
        cy.get('input[name="bairro"]').type("Bairro A");
        cy.get('input[name="cidade"]').type("Cidade A");

        cy.get('button[type="submit"]').click();

        cy.contains('Usuário com cpf_cnpj |047.930.260-01| já cadastrado.');
    });

    it ("Cadastrar usuário com CNPJ já cadastrado", () => {

        cy.visit("http://localhost:5173/");

        cy.contains('button', 'Criar Conta').click();

        cy.get('input[name="nomeCompleto"]').type("Alex Green");
        cy.get('input[name="cpfCnpj"]').type("37.995.211/0001-11");
        cy.get('input[name="telefone"]').type("6727438629");
        cy.get('input[name="senha"]').type("alex123");
        cy.get('input[name="rua"]').type("Rua A");
        cy.get('input[name="bairro"]').type("Bairro A");
        cy.get('input[name="cidade"]').type("Cidade A");

        cy.get('button[type="submit"]').click();

        cy.contains('Usuário com cpf_cnpj |37.995.211/0001-11| já cadastrado.');
    });
});