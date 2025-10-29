export class TransacaoCreateDTO {
    valor: number;
    chaveOrigem: string;
    chaveDestino: string;
    mensagem?: string;

    constructor(valor: number, chaveOrigem: string, chaveDestino: string, mensagem: string) {
        this.valor = valor;
        this.chaveOrigem = chaveOrigem;
        this.chaveDestino = chaveDestino;
        this.mensagem = mensagem;
    }

}