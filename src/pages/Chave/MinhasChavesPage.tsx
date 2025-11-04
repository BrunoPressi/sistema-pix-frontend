import {excluirChave} from "../../backend/api.ts";
import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import {ChaveService} from "../../services/ChaveService.ts";
import type {ChaveResponseDTO} from "../../types/ChaveTypes/ChaveResponseDTO.ts";

export default function MinhasChavesPage() {
    const chaveService = new ChaveService([]);
    const [chaves, setChaves] = React.useState<ChaveResponseDTO[]>([]);

    const excluirChaveOnClick = async (chaveId: number) => {
        try {
            await excluirChave(chaveId);
            setChaves((prev) => prev.filter((chave) => chave.id !== chaveId));
        }
        catch (error: any) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function loadChaves() {

            if (chaveService.getChaves().length == 0) {
                const chaves: ChaveResponseDTO[] = await chaveService.carregarChaves();
                chaveService.setChaves(chaves);
                setChaves(chaveService.getChaves());
            }
            else {
                setChaves(chaveService.getChaves());
            }
        }
        loadChaves();
    }, [])

    return (

        <>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Minhas Chaves</h2>

                {chaves.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm text-gray-700">
                            <thead>
                            <tr className="bg-indigo-600 text-white text-left">
                                <th className="p-4 rounded-tl-xl">ID</th>
                                <th className="p-4 text-center">Tipo</th>
                                <th className="p-4 text-center">Chave</th>
                                <th className="p-4 text-center rounded-tr-xl">Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            {chaves.map((chave) => (
                                <tr key={chave.id}>
                                    <td className="p-4 font-medium text-gray-900">{chave.id}</td>
                                    <td className="p-4 capitalize">{chave.tipo}</td>
                                    <td className="p-4">{chave.chave}</td>
                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => excluirChaveOnClick(chave.id)}
                                            className="px-3 py-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 font-semibold transition-all text-sm"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-600 mt-6">Nenhuma chave cadastrada.</p>
                )}

                <div className="mt-8 flex items-center justify-end gap-4">
                    <Link to="/HomePage">
                        <button
                            type="button"
                            className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-all"
                        >
                            Voltar
                        </button>
                    </Link>
                    <Link to="/NovaChavePage">
                        <button
                            type="button"
                            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition-all"
                        >
                            Nova Chave
                        </button>
                    </Link>
                </div>
            </div>

        </>

    )

}