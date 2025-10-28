import axios from 'axios';
import type {UsuarioPatchDTO} from "../types/UsuarioPatchDTO.ts";

export const api = axios.create({
    baseURL: 'http://localhost:5001/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});


export const loginAPI = async (cpf_cnpj: string, senha: string) => {
    try {
        const response = await api.post('/auth', { cpf_cnpj, senha });
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

export const criarConta = async (usuario: any) => {
    try {
        const response = await api.post('/usuarios',
            {
                cpf_cnpj: usuario.cpf_cnpj,
                senha: usuario.senha,
                nome_completo: usuario.nomeCompleto,
                telefone: usuario.telefone,
                rua: usuario.rua,
                bairro: usuario.bairro,
                cidade: usuario.cidade,
            }
        )
        return response.data;
    }
    catch (error: any) {
        throw error.response?.data || error;
    }
}

export const criarChave = async (tipo: string, chave: string, userID: number) => {
    try {
        const response = await api.post(`/chaves/${userID}`,
            {
                tipo: tipo,
                chave: chave
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