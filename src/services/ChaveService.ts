import {api, buscarChaves} from "../backend/api.ts";
import {UsuarioService} from "./UsuarioService.ts";
import type {ChaveResponseDTO} from "../types/ChaveResponseDTO.ts";

export class ChaveService {
    private usuarioService = new UsuarioService();
    private chaves: ChaveResponseDTO[] = [];

    constructor(chaves: ChaveResponseDTO[]) {
        this.chaves = chaves;
    }

    async carregarChaves() {
        try {
            api.defaults.headers.Authorization = `Bearer ${this.usuarioService.getToken()}`;
            const response = await buscarChaves(this.usuarioService.getUserData()!.id);
            return response.Chaves;
        }
        catch (error: any) {
            console.log(error);
        }
    }

    setChaves(chaves: ChaveResponseDTO[]) {
        this.chaves = chaves;
    }

    getChaves() {
        return this.chaves;
    }
}