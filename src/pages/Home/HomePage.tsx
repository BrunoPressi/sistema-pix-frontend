import {useContext} from "react";
import {AuthContext} from "../../contexts/auth.tsx";
import type {JwtPayload} from "jsonwebtoken";
import {Link} from "react-router-dom";


export default function HomePage() {
    const context = useContext(AuthContext)
    const userData: JwtPayload | null = context.userData;

    return (


        <>

            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl w-full text-center">
                <div className="text-xl font-bold text-gray-800 mb-6">
                    <h2 className="text-xl font-semibold mb-2">Bem-Vindo {userData!.nomeCompleto}</h2>
                    <p className="text-base opacity-90">Número da conta: {userData!.numeroConta}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    <Link to={"/NovaChavePage"}>
                        <div className="bg-blue-500 text-white rounded-xl p-6 hover:bg-blue-600 transition cursor-pointer">
                            <h2 className="text-xl font-semibold mb-2">Nova Chave PIX</h2>
                            <p className="text-base opacity-90">Cadastrar nova chave PIX</p>
                        </div>
                    </Link>


                    <Link to={"/MinhasChavesPage"}>
                        <div
                            className="bg-green-500 text-white rounded-xl p-6 hover:bg-green-600 transition cursor-pointer">
                            <h2 className="text-xl font-semibold mb-2">Minhas chaves</h2>
                            <p className="text-sm opacity-90">Visualizar suas chaves pix</p>
                        </div>
                    </Link>


                    <div
                        className="bg-yellow-500 text-white rounded-xl p-6 hover:bg-yellow-600 transition cursor-pointer">
                        <h2 className="text-xl font-semibold mb-2">Nova transação</h2>
                        <p className="text-sm opacity-90">Criar nova transação</p>
                    </div>

                    <div className="bg-red-500 text-white rounded-xl p-6 hover:bg-red-600 transition cursor-pointer">
                        <h2 className="text-xl font-semibold mb-2">Minhas transações</h2>
                        <p className="text-sm opacity-90">Visualizar suas transações</p>
                    </div>

                    <Link to={"/PerfilPage"}>
                        <div
                            className="bg-indigo-500 text-white rounded-xl p-6 hover:bg-indigo-600 transition cursor-pointer">
                            <h2 className="text-xl font-semibold mb-2">Perfil</h2>
                            <p className="text-sm opacity-90">Visualizar meu perfil</p>
                        </div>
                    </Link>

                    <Link to={"/"}>
                        <div className="bg-gray-700 text-white rounded-xl p-6 hover:bg-gray-800 transition cursor-pointer"
                             onClick={context!.logout}>
                            <h2 className="text-xl font-semibold mb-2">Sair</h2>
                            <p className="text-sm opacity-90">Encerrar sessão.</p>
                        </div>
                    </Link>

                </div>
            </div>

        </>


    )

}