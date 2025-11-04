import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import type {TransacaoCreateDTO} from "../../types/TransacaoTypes/TransacaoCreateDTO.ts";
import {api, novaTransacao} from "../../backend/api.ts";
import {UsuarioService} from "../../services/UsuarioService.ts";
import type {ChaveResponseDTO} from "../../types/ChaveTypes/ChaveResponseDTO.ts";
import {tratarErros} from "../../utils/Utils.ts";
import {ChaveService} from "../../services/ChaveService.ts";

export function NovaTransacaoPage() {
    const usuarioService = new UsuarioService();
    const chaveService = new ChaveService([]);

    const [transacao, setTransacao] = React.useState<TransacaoCreateDTO>({
        valor: 0,
        chaveOrigem: '',
        chaveDestino: '' ,
        mensagem: ''
    });

    const [chaves, setChaves] = React.useState<ChaveResponseDTO[]>([]);

    const [message, setMessage] = React.useState({
        valor: '',
        chaveOrigem: '',
        chaveDestino: '',
        mensagem: '',
        errorMessage: '',
        successMessage: ''
    });

    async function novaTransacaoAction() {
        try {
            api.defaults.headers.Authorization = `Bearer ${usuarioService.getToken()}`;
            await novaTransacao(transacao);
            setMessage((prev) => ({...prev, successMessage: 'Transação realizada com sucesso!'}));
            setTransacao((prev) => ({...prev, valor: 0}));
            setTransacao((prev) => ({...prev, chaveOrigem: ''}));
            setTransacao((prev) => ({...prev, chaveDestino: ''}));
            setTransacao((prev) => ({...prev, mensagem: ''}));
        }
        catch (error: any) {
            tratarErros(error, setMessage);
        }
    }

    async function loadChaves() {
        const chavesList: ChaveResponseDTO[] = await chaveService.carregarChaves();
        setChaves(chavesList);
    }

    useEffect(() => {
        loadChaves();
    }, []);

    return (

        <>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto border border-gray-200">
                <form action={novaTransacaoAction}>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Preencha os dados da transação
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

                        <div>
                            <label
                                htmlFor="valor"
                                className="block text-lg font-medium text-gray-800 mb-2"
                            >
                                Valor
                            </label>
                            <input
                                id="valor"
                                type="number"
                                name="valor"
                                required
                                onChange={(e) =>
                                    setTransacao((prev) => ({ ...prev, valor: Number(e.target.value) }))
                                }
                                onClick={() =>
                                    setMessage((prev) => ({ ...prev, valor: "", errorMessage: "" }))
                                }
                                value={transacao.valor}
                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm transition-all"
                                placeholder="Ex: 150.00"
                            />
                            {message?.valor && (
                                <p className="text-red-600 mt-2 text-sm">{message.valor}</p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="chaveOrigem"
                                className="block text-lg font-medium text-gray-800 mb-2"
                            >
                                Chave de Origem
                            </label>
                            <select
                                id="chaveOrigem"
                                name="chaveOrigem"
                                required
                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm transition-all"
                                onClick={() =>
                                    setMessage((prev) => ({ ...prev, chaveOrigem: "", errorMessage: "" }))
                                }
                                value={transacao.chaveOrigem}
                                onChange={(e) =>
                                    setTransacao((prev) => ({ ...prev, chaveOrigem: e.target.value }))
                                }
                            >
                                <option value="">Selecione a chave de origem</option>
                                {chaves?.map((chave) => (
                                    <option key={chave.chave} value={chave.chave}>
                                        {chave.chave}
                                    </option>
                                ))}
                            </select>
                            {message?.chaveOrigem && (
                                <p className="text-red-600 mt-2 text-sm">{message.chaveOrigem}</p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="chaveDestino"
                                className="block text-lg font-medium text-gray-800 mb-2"
                            >
                                Chave de Destino
                            </label>
                            <input
                                id="chaveDestino"
                                type="text"
                                name="chaveDestino"
                                required
                                onClick={() =>
                                    setMessage((prev) => ({ ...prev, chaveDestino: "", errorMessage: "" }))
                                }
                                onChange={(e) =>
                                    setTransacao((prev) => ({ ...prev, chaveDestino: e.target.value }))
                                }
                                value={transacao.chaveDestino}
                                placeholder="Digite a chave de destino..."
                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm transition-all"
                            />
                            {message?.chaveDestino && (
                                <p className="text-red-600 mt-2 text-sm">{message.chaveDestino}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-10">
                        <label
                            htmlFor="mensagem"
                            className="block text-lg font-medium text-gray-800 mb-2"
                        >
                            Mensagem (opcional)
                        </label>
                        <input
                            id="mensagem"
                            type="text"
                            name="mensagem"
                            onChange={(e) =>
                                setTransacao((prev) => ({ ...prev, mensagem: e.target.value }))
                            }
                            value={transacao.mensagem}
                            placeholder="Ex: Pagamento referente a serviço..."
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm transition-all"
                        />
                        {message?.mensagem && (
                            <p className="text-red-600 mt-2 text-sm">{message.mensagem}</p>
                        )}
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            {message?.errorMessage && (
                                <p className="text-red-600 text-sm">{message.errorMessage}</p>
                            )}
                            {message?.successMessage && (
                                <p className="text-green-600 text-sm font-medium">
                                    {message.successMessage}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <Link to="/HomePage">
                                <button
                                    type="button"
                                    className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-all"
                                >
                                    Cancelar
                                </button>
                            </Link>
                            <button
                                type="submit"
                                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition-all"
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </>

    )
}