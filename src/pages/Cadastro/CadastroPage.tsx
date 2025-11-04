import React from "react"
import {criarConta} from "../../backend/api.ts";
import {Link, useNavigate} from "react-router-dom";
import {tratarErros} from "../../utils/Utils.ts";
import type {UsuarioCreateDTO} from "../../types/UsuarioTypes/UsuarioCreateDTO.ts";

export default function CadastroPage() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = React.useState<UsuarioCreateDTO>({
        cpf_cnpj: '',
        senha: '',
        nome_completo: '',
        telefone: '',
        rua: '',
        bairro: '',
        cidade: ''
    })

    const [message, setMessage] = React.useState({
        nomeCompleto: '',
        cpf_cnpj: '',
        senha: '',
        rua: '',
        telefone: '',
        bairro: '',
        cidade: '',
        errorMessage: ''
    });

    async function criarContaAction() {
        try {
            await criarConta(usuario)
            navigate("/")
        } catch (error: any) {
            tratarErros(error, setMessage)
        }
    }

    return (

        <>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 max-w-4xl mx-auto border border-gray-200">
                <form action={criarContaAction} className="space-y-10">
                    <div className="border-b border-gray-200 pb-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Preencha seus Dados</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

                        <div className="col-span-2 lg:col-span-1">
                            <label htmlFor="nomeCompleto" className="block text-sm font-medium text-gray-700 mb-2">
                                Nome Completo
                            </label>
                            <input
                                id="nomeCompleto"
                                type="text"
                                name="nomeCompleto"
                                required
                                onChange={(e) => setUsuario((prev) => ({ ...prev, nome_completo: e.target.value }))}
                                onClick={() => setMessage((prev) => ({ ...prev, nomeCompleto: "" }))}
                                value={usuario.nome_completo}
                                placeholder="Seu nome completo..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                            />
                            {message.nomeCompleto && (
                                <p className="text-red-600 text-sm mt-2">{message.nomeCompleto}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="cpfCnpj" className="block text-sm font-medium text-gray-700 mb-2">
                                CPF / CNPJ
                            </label>
                            <input
                                id="cpfCnpj"
                                type="text"
                                name="cpfCnpj"
                                required
                                pattern={
                                    "^(?:(?:\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2})|(?:\\d{2}\\.?\\d{3}\\.?\\d{3}/?\\d{4}-?\\d{2}))$"
                                }
                                onChange={(e) => setUsuario((prev) => ({ ...prev, cpf_cnpj: e.target.value }))}
                                onClick={() => setMessage((prev) => ({ ...prev, cpf_cnpj: "" }))}
                                value={usuario.cpf_cnpj}
                                placeholder="Seu CPF ou CNPJ..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                            />
                            {message.cpf_cnpj && (
                                <p className="text-red-600 text-sm mt-2">{message.cpf_cnpj}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                                Telefone
                            </label>
                            <input
                                id="telefone"
                                type="text"
                                name="telefone"
                                required
                                onChange={(e) => setUsuario((prev) => ({ ...prev, telefone: e.target.value }))}
                                onClick={() => setMessage((prev) => ({ ...prev, telefone: "" }))}
                                value={usuario.telefone}
                                placeholder="(XX) XXXXX-XXXX"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                            />
                            {message.telefone && (
                                <p className="text-red-600 text-sm mt-2">{message.telefone}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-2">
                                Senha
                            </label>
                            <input
                                id="senha"
                                type="password"
                                name="senha"
                                required
                                onChange={(e) => setUsuario((prev) => ({ ...prev, senha: e.target.value }))}
                                onClick={() => setMessage((prev) => ({ ...prev, senha: "" }))}
                                value={usuario.senha}
                                placeholder="Crie uma senha segura..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                            />
                            {message.senha && (
                                <p className="text-red-600 text-sm mt-2">{message.senha}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="rua" className="block text-sm font-medium text-gray-700 mb-2">
                                Rua
                            </label>
                            <input
                                id="rua"
                                type="text"
                                name="rua"
                                required
                                onChange={(e) => setUsuario((prev) => ({ ...prev, rua: e.target.value }))}
                                onClick={() => setMessage((prev) => ({ ...prev, rua: "" }))}
                                value={usuario.rua}
                                placeholder="Nome da rua..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                            />
                            {message.rua && <p className="text-red-600 text-sm mt-2">{message.rua}</p>}
                        </div>

                        <div>
                            <label htmlFor="bairro" className="block text-sm font-medium text-gray-700 mb-2">
                                Bairro
                            </label>
                            <input
                                id="bairro"
                                type="text"
                                name="bairro"
                                required
                                onChange={(e) => setUsuario((prev) => ({ ...prev, bairro: e.target.value }))}
                                onClick={() => setMessage((prev) => ({ ...prev, bairro: "" }))}
                                value={usuario.bairro}
                                placeholder="Seu bairro..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                            />
                            {message.bairro && (
                                <p className="text-red-600 text-sm mt-2">{message.bairro}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-2">
                                Cidade
                            </label>
                            <input
                                id="cidade"
                                type="text"
                                name="cidade"
                                required
                                onChange={(e) => setUsuario((prev) => ({ ...prev, cidade: e.target.value }))}
                                onClick={() => setMessage((prev) => ({ ...prev, cidade: "" }))}
                                value={usuario.cidade}
                                placeholder="Sua cidade..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                            />
                            {message.cidade && (
                                <p className="text-red-600 text-sm mt-2">{message.cidade}</p>
                            )}
                        </div>
                    </div>

                    {message.errorMessage && (
                        <p className="text-red-600 text-center text-sm break-all whitespace-normal">
                            {message.errorMessage}
                        </p>
                    )}

                    <div className="flex items-center justify-end gap-x-4 pt-6">
                        <Link to="/">
                            <button
                                type="button"
                                className="px-5 py-2.5 rounded-xl text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all font-medium"
                            >
                                Cancelar
                            </button>
                        </Link>
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all text-white font-semibold shadow-md"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>


        </>

    )
}