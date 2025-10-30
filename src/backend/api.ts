import axios from 'axios';
import type {UsuarioPatchDTO} from "../types/UsuarioPatchDTO.ts";
import {TransacaoCreateDTO} from "../types/TransacaoCreateDTO.ts";
import type {ChaveCreateDTO} from "../types/ChaveCreateDTO.ts";
import type {UsuarioCreateDTO} from "../types/UsuarioCreateDTO.ts";
import type {LoginDTO} from "../types/LoginDTO.ts";

export const api = axios.create({
    baseURL: 'http://localhost:5001/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            window.location.href = "*";
        }
        return Promise.reject(error);
    }
);

export const loginAPI = async (loginDTO: LoginDTO) => {
    try {
        const response = await api.post('/auth', {
            cpf_cnpj: loginDTO.cpf_cnpj,
            senha: loginDTO.senha
        });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error;
    }
};

export const logoutAPI = async () => {
    try {
        await api.post("/logout");
    }
    catch (error:any) {
        throw error.response?.data || error;
    }
}

export const criarConta = async (usuarioCreateDTO: UsuarioCreateDTO) => {
    try {
        const response = await api.post('/usuarios',
            {
                cpf_cnpj: usuarioCreateDTO.cpf_cnpj,
                senha: usuarioCreateDTO.senha,
                nome_completo: usuarioCreateDTO.nome_completo,
                telefone: usuarioCreateDTO.telefone,
                rua: usuarioCreateDTO.rua,
                bairro: usuarioCreateDTO.bairro,
                cidade: usuarioCreateDTO.cidade,
            }
        )
        return response.data;
    }
    catch (error: any) {
        throw error.response?.data || error;
    }
}

export const criarChave = async (chaveCreateDto: ChaveCreateDTO, userID: number) => {
    try {
        const response = await api.post(`/chaves/${userID}`,
            {
                tipo: chaveCreateDto.tipo,
                chave: chaveCreateDto.chave
            }
        );

        return response.data;
    }
    catch(error: any) {
        throw error.response?.data || error;
    }
}

export const buscarChaves = async (userId: number) => {
    try {
        const response = await api.get(`/usuarios/${userId}/chaves`);
        return response.data;
    }
    catch (error: any) {
        throw error.response?.data || error;
    }
}

export const excluirChave = async (chaveId: number) => {
    try {
        await api.delete(`/chaves/${chaveId}`)
    }
    catch (error: any) {
        throw error.response?.data || error;
    }
}

export const buscarUsuarioPorId = async (usuarioId: number) => {
    try {
        const response = await api.get(`/usuarios/${usuarioId}`);
        return response.data;
    }
    catch (error:any) {
        throw error.response?.data || error;
    }
}

export const atualizarUsuario = async (usuarioId: number, novoUsuario: UsuarioPatchDTO) => {
    try {
        const response = await api.patch(`/usuarios/${usuarioId}`, {
            telefone: novoUsuario.telefone,
            rua: novoUsuario.rua,
            bairro: novoUsuario.bairro,
            cidade: novoUsuario.cidade
        });
        return response;
    }
    catch (error: any) {
        throw error.response?.data || error;
    }
}

export const novaTransacao = async (transacao: TransacaoCreateDTO) => {
    try {
        const response = await api.post("/transacoes", {
            valor: transacao.valor,
            chaveOrigem: transacao.chaveOrigem,
            chaveDestino: transacao.chaveDestino,
            mensagem: transacao.mensagem
        })
        return response.data;
    }
    catch (error: any) {
        throw error.response?.data || error;
    }
}