export class UsuarioCreateDTO {
    cpf_cnpj: string;
    nome_completo: string;
    telefone: string;
    senha: string;
    rua: string;
    bairro: string;
    cidade: string;

    constructor(cpf_cnpj: string, nome_completo: string, telefone: string, senha: string, rua:string, bairro: string, cidade: string) {
        this.cpf_cnpj = cpf_cnpj;
        this.nome_completo = nome_completo;
        this.telefone = telefone;
        this.senha = senha;
        this.rua = rua;
        this.bairro = bairro;
        this.cidade = cidade;
    }
}