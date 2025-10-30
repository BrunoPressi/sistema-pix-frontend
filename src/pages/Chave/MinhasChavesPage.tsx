import {excluirChave} from "../../backend/api.ts";
import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import {ChaveService} from "../../services/ChaveService.ts";
import type {ChaveResponseDTO} from "../../types/ChaveResponseDTO.ts";

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

        <div className="bg-white rounded-2xl p-8 w-full">
            <h2 className="text-xl font-semibold mb-4 text-black">Minhas Chaves</h2>

                {
                    chaves.length > 0 ?
                        <table className="w-full border-collapse">
                            <thead>
                            <tr className="bg-gray-700">
                                <th className="p-3">ID</th>
                                <th className="p-3">Tipo</th>
                                <th className="p-3">Chave</th>
                                <th className="p-3"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {chaves?.map((chave) => (
                                <tr key={chave.id} className="border-b border-gray-700 hover:bg-gray-700/50 text-black">
                                    <td className="p-3">{chave.id}</td>
                                    <td className="p-3">{chave.tipo}</td>
                                    <td className="p-3">{chave.chave}</td>
                                    <td className="p-3 text-red-600 text-sm">
                                        <button onClick={() => excluirChaveOnClick(chave.id)} className="bg-gray">Excluir</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    :
                        <p className="text-black">Nenhuma chave cadastrada</p>

                }

                <div className="mt-6 flex items-center justify-end gap-x-6">

                    <Link to={"/HomePage"}>
                        <button className="text-base font-semibold text-white" type={"button"}>Voltar</button>
                    </Link>
                    <Link to={"/NovaChavePage"}>
                        <button
                            className="text-white rounded-md bg-indigo-500" type={"button"}>Nova Chave
                        </button>
                    </Link>
                </div>
            </div>

        </>

    )

}