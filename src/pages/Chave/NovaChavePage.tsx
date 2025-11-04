import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {api, criarChave} from "../../backend/api.ts";
import type {ChaveCreateDTO} from "../../types/ChaveTypes/ChaveCreateDTO.ts";
import {UsuarioService} from "../../services/UsuarioService.ts";

export default function NovaChavePage() {
   const usuarioService = new UsuarioService();
    const navigate = useNavigate();

    const [chave, setChave] = React.useState<ChaveCreateDTO>({
        tipo: '',
        chave: ''
    });

    const [message, setMessage] = React.useState('');

    const novaChaveAction = async () => {
        try {
            api.defaults.headers.Authorization = `Bearer ${usuarioService.getToken()}`;
            await criarChave(chave, usuarioService.getUserData()!.id);
            navigate('/MinhasChavesPage');
        }
        catch (error: any) {
            setMessage(error.errorMessage);
        }
    }

    return (

        <>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 max-w-2xl mx-auto border border-gray-200">
                <form action={novaChaveAction} className="space-y-10">

                    <div className="border-b border-gray-200 pb-6 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Cadastrar nova chave</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

                        <div>
                            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-2">
                                Tipo
                            </label>
                            <select
                                id="tipo"
                                name="tipo"
                                required
                                onChange={(e) => setChave((prev) => ({ ...prev, tipo: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                            >
                                <option value="">Selecione o tipo da chave</option>
                                <option value="cpf">CPF</option>
                                <option value="telefone">Telefone</option>
                                <option value="email">Email</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="chave" className="block text-sm font-medium text-gray-700 mb-2">
                                Chave
                            </label>
                            <input
                                id="chave"
                                type="text"
                                name="chave"
                                required
                                placeholder="Digite a chave..."
                                onChange={(e) => setChave((prev) => ({ ...prev, chave: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                            />
                        </div>
                    </div>

                    {message && (
                        <p className="text-red-600 text-center text-sm break-all whitespace-normal mt-4">
                            {message}
                        </p>
                    )}

                    <div className="flex items-center justify-end gap-4 pt-6">
                        <Link to="/HomePage">
                            <button
                                type="button"
                                className="px-5 py-2.5 rounded-xl text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all font-medium"
                            >
                                Voltar
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