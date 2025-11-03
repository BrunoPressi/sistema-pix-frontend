import type {TransacaoResponseDTO} from "../types/TransacaoTypes/TransacaoResponseDTO.ts";
import {UsuarioService} from "./UsuarioService.ts";
import {api, buscarTransacoes} from "../backend/api.ts";

export class TransacaoService {
    private usuarioService = new UsuarioService();
    private transacoes: TransacaoResponseDTO[] = [];

    async buscarTransacoes() {
        try {
            api.defaults.headers.Authorization = `Bearer ${this.usuarioService.getToken()}`;
            const transacoesList = await buscarTransacoes(this.usuarioService.getUserData()!.id);
            this.setTransacoes(transacoesList);
            return transacoesList.Transacoes;
        }
        catch (error: any) {
            throw error.response?.data || error;
        }
    }

    getTransacoes() {
        return this.transacoes;
    }

    setTransacoes(transacoes: TransacaoResponseDTO[]) {
        this.transacoes = transacoes;
    }
}