export class UsuarioDTO {
    id: number;
    cpf_cnpj: string;
    nome_completo: string;
    numero_conta: number;
    telefone: string;
    senha: string;
    rua: string;
    bairro: string;
    cidade: string;

    constructor(id: number, cpf_cnpj: string, nome_completo: string, numero_conta: number, telefone: string, senha: string, rua:string, bairro: string, cidade: string) {
        this.id = id;
        this.cpf_cnpj = cpf_cnpj;
        this.nome_completo = nome_completo;
        this.numero_conta = numero_conta;
        this.telefone = telefone;
        this.senha = senha;
        this.rua = rua;
        this.bairro = bairro;
        this.cidade = cidade;
    }
}