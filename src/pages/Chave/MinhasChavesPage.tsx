import {useContext, useEffect} from "react";
import {AuthContext} from "../../contexts/auth.tsx";
import {api, buscarChaves} from "../../services/api.ts";
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
                api.defaults.headers.Authorization = `Bearer ${context.token}`;
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

        <div className="bg-white rounded-2xl p-8 w-full">
            <h2 className="text-xl font-semibold mb-4 text-black">Minhas Chaves</h2>

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
                            <tr key={chave.id} className="border-b border-gray-700 hover:bg-gray-700/50 text-black">
                                <td className="p-3">{chave.id}</td>
                                <td className="p-3">{chave.tipo}</td>
                                <td className="p-3">{chave.chave}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-6 flex items-center justify-end gap-x-6">

                    <Link to={"/HomePage"}>
                        <button className="text-base font-semibold text-white">Voltar</button>
                    </Link>
                    <Link to={"/NovaChavePage"}>
                        <button
                            className="text-white rounded-md bg-indigo-500">
                            Nova Chave
                        </button>
                    </Link>
                </div>
            </div>

        </>

    )

}