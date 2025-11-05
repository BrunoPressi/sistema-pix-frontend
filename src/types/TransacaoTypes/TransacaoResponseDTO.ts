import  {type ChaveResponseDTO} from "../ChaveTypes/ChaveResponseDTO.ts";

export interface TransacaoResponseDTO {
    id: number;
    data: string;
    valor: number;
    mensagem: string;
    chaveOrigem: ChaveResponseDTO;
    chaveDestino: ChaveResponseDTO;

    total: number;
    totalPages: number;
}