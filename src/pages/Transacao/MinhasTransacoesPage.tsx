import React, {useEffect} from "react";
import type { TransacaoResponseDTO } from "../../types/TransacaoTypes/TransacaoResponseDTO.ts";
import {TransacaoService} from "../../services/TransacaoService.ts";
import {Link} from "react-router-dom";

export default function MinhasTransacoesPage() {
    const transacaoService = new TransacaoService();
    const [transacaoes, setTransacoes] = React.useState<TransacaoResponseDTO[]>([]);

    const loadTransacoes = async () => {
        try {
            const transacoesList: TransacaoResponseDTO[] = await transacaoService.buscarTransacoes();
            setTransacoes(transacoesList);
        }
        catch (error: any) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadTransacoes();
    }, []);

    return (

        <>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    Minhas Transações
                </h2>

                {transacaoes.length > 0 ? (
                    <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-inner">
                        <table className="min-w-full border-collapse text-gray-900">
                            <thead>
                            <tr className="bg-indigo-600 text-white text-left text-sm uppercase tracking-wide">
                                <th className="p-4">ID</th>
                                <th className="p-4">Data</th>
                                <th className="p-4">Valor</th>
                                <th className="p-4">Mensagem</th>
                                <th className="p-4">Chave de Origem</th>
                                <th className="p-4">Chave de Destino</th>
                                <th className="p-4">Destinatário</th>
                                <th className="p-4">Nº Conta</th>
                                <th className="p-4">Telefone</th>
                            </tr>
                            </thead>
                            <tbody>
                            {transacaoes?.map((transacao) => (
                                <tr
                                    key={transacao.id}
                                    className="border-b border-gray-200 hover:bg-indigo-50 transition-colors duration-200"
                                >
                                    <td className="p-4">{transacao.id}</td>
                                    <td className="p-4">{transacao.data}</td>
                                    <td className="p-4 font-semibold text-green-600">
                                        R$ {Number(transacao.valor).toFixed(2)}
                                    </td>
                                    <td className="p-4 italic text-gray-600">
                                        {transacao.mensagem || "Sem mensagem"}
                                    </td>
                                    <td className="p-4">{transacao.chaveOrigem.chave}</td>
                                    <td className="p-4">{transacao.chaveDestino.chave}</td>
                                    <td className="p-4">{transacao.chaveDestino.usuario.nome_completo}</td>
                                    <td className="p-4">{transacao.chaveDestino.usuario.numero_conta}</td>
                                    <td className="p-4">{transacao.chaveDestino.usuario.telefone}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-700 font-medium mt-4">
                        Nenhuma transação encontrada.
                    </p>
                )}

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-4">
                    <Link to="/HomePage">
                        <button
                            type="button"
                            className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-all"
                        >
                            Voltar
                        </button>
                    </Link>

                    <Link to="/NovaTransacaoPage">
                        <button
                            type="button"
                            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition-all"
                        >
                            Nova Transação
                        </button>
                    </Link>
                </div>
            </div>

        </>

    );
}