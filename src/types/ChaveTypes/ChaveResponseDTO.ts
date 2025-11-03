import type {UsuarioResponseDTO} from "../UsuarioTypes/UsuarioResponseDTO.ts";

export class ChaveResponseDTO {
    id: number;
    tipo: string;
    chave: string;
    usuario: UsuarioResponseDTO;

    constructor(id: number, tipo: string, chave: string, usuario: UsuarioResponseDTO) {
        this.id = id;
        this.tipo = tipo;
        this.chave = chave;
        this.usuario = usuario;
    }

}