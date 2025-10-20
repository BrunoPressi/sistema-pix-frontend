import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (cpf_cnpj: string, senha: string) => {
    try {
        const response = await api.post('/auth', { cpf_cnpj, senha });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error;
    }
};

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
                numero_conta: 9090
            }
        )
        return response.data;
    }
    catch (error: any) {
        throw error.response?.data || error;
    }
}