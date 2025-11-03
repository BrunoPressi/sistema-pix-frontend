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

            <div className="bg-white rounded-2xl p-8 w-full">
                <h2 className="text-xl font-semibold mb-4 text-black">Minhas Transações</h2>

                {
                    transacaoes.length > 0 ?
                        <table className="w-full border-collapse">
                            <thead>
                            <tr className="bg-gray-700">
                                <th className="p-3">ID</th>
                                <th className="p-3">Data</th>
                                <th className="p-3">Valor</th>
                                <th className="p-3">Mensagem</th>
                                <th className="p-3">Chave de Origem</th>
                                <th className="p-3">Chave de Destino</th>
                                <th className="p-3">Destinatário</th>
                                <th className="p-3">Número Conta</th>
                                <th className="p-3">Telefone</th>
                            </tr>
                            </thead>
                            <tbody>
                            {transacaoes?.map((transacao) => (
                                <tr key={transacao.id} className="border-b border-gray-700 hover:bg-gray-700/50 text-black">
                                    <td className="p-3">{transacao.id}</td>
                                    <td className="p-3">{transacao.data}</td>
                                    <td className="p-3">{ 'R$ ' + transacao.valor}</td>
                                    <td className="p-3">{transacao.mensagem ? transacao.mensagem : 'Sem mensagem'}</td>
                                    <td className="p-3">{transacao.chaveOrigem.chave}</td>
                                    <td className="p-3">{transacao.chaveDestino.chave}</td>
                                    <td className="p-3">{transacao.chaveDestino.usuario.nome_completo}</td>
                                    <td className="p-3">{transacao.chaveDestino.usuario.numero_conta}</td>
                                    <td className="p-3">{transacao.chaveDestino.usuario.telefone}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        :
                        <p className="text-black">Nenhuma transação encontrada</p>

                }

                <div className="mt-6 flex items-center justify-end gap-x-6">

                    <Link to={"/HomePage"}>
                        <button className="text-base font-semibold text-white" type={"button"}>Voltar</button>
                    </Link>
                    <Link to={"/NovaTransacaoPage"}>
                        <button
                            className="text-white rounded-md bg-indigo-500" type={"button"}>Nova Transação
                        </button>
                    </Link>
                </div>
            </div>


        </>

    );
}