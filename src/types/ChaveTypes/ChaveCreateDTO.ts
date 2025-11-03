export class ChaveCreateDTO {
    tipo: string;
    chave: string;

    constructor(tipo: string, chave: string) {
        this.tipo = tipo;
        this.chave = chave;
    }

}