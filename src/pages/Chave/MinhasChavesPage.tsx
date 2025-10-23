import {useContext, useEffect} from "react";
import {AuthContext} from "../../contexts/auth.tsx";
import {buscarChaves} from "../../services/api.ts";
import {decodeToken} from "../../services/utils.ts";
import React from "react";
import {Link} from "react-router-dom";

export default function MinhasChavesPage() {
    const context = useContext(AuthContext);
    const token = decodeToken(context.token!);

    const [chaves, setChaves] = React.useState<any[] | null>(null);

    useEffect(() => {
        async function carregarChaves() {
            try {
                const response = await buscarChaves(token.id);
                setChaves(response.Chaves);
            }
            catch (error: any) {
                console.log(error);
            }
        }
        carregarChaves()
    }, [])

    return (

        <>

            <div className="w-full max-w-4xl p-6 bg-gray-800 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Minhas Chaves</h2>

                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-gray-700 text-left">
                        <th className="p-3">ID</th>
                        <th className="p-3">Tipo</th>
                        <th className="p-3">Chave</th>
                    </tr>
                    </thead>
                    <tbody>
                        {chaves?.map((chave) => (
                            <tr key={chave.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                <td className="p-3">{chave.id}</td>
                                <td className="p-3">{chave.tipo}</td>
                                <td className="p-3">{chave.chave}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-6 flex items-center justify-end gap-x-6">

                    <Link to={"/HomePage"}>
                        <button className="text-sm/6 font-semibold text-white">Voltar</button>
                    </Link>
                    <Link to={"/NovaChavePage"}>
                        <button
                            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                            Nova Chave
                        </button>
                    </Link>
                </div>
            </div>

        </>

    )

}