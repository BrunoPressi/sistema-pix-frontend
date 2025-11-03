import  {type ChaveResponseDTO} from "./ChaveResponseDTO.ts";

export class TransacaoResponseDTO {
    id: number;
    data: string;
    valor: number;
    mensagem: string;
    chaveOrigem: ChaveResponseDTO;
    chaveDestino: ChaveResponseDTO;

    constructor(id: number, data: string, valor: number, mensagem: string, chaveOrigem: ChaveResponseDTO, chaveDestino: ChaveResponseDTO) {
        this.id = id;
        this.data = data;
        this.valor = valor;
        this.mensagem = mensagem;
        this.chaveOrigem = chaveOrigem;
        this.chaveDestino = chaveDestino;
    }
}