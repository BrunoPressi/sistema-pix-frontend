export class ChaveResponseDTO {
    id: number;
    tipo: string;
    chave: string;

    constructor(id: number, tipo: string, chave: string) {
        this.id = id;
        this.tipo = tipo;
        this.chave = chave;
    }

}