import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {criarChave} from "../../services/api.ts";
import {AuthContext} from "../../contexts/auth.tsx";
import {decodeToken} from "../../services/utils.ts";

export default function NovaChavePage() {
    const [tipo, setTipo] = React.useState('');
    const [chave, setChave] = React.useState('');
    const [message, setMessage] = React.useState('');
    const context = useContext(AuthContext);
    const token = decodeToken(context.token!);
    const navigate = useNavigate();

    const novaChaveAction = async () => {
        try {
            await criarChave(tipo, chave, token.id);
            navigate('/homePage');
        }
        catch (error: any) {
            setMessage(error.errorMessage);
        }
    }

    return (

        <>

            <form action={novaChaveAction}>
                <div className="space-y-12">

                    <div className="border-b border-white/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-white">Cadastrar nova chave</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div className="sm:col-span-3">
                                <label htmlFor="tipo"
                                       className="block text-sm/6 font-medium text-white">Tipo</label>
                                <div className="mt-2">
                                    <select id="tipo"
                                            className="bg-gray-800 text-white border border-gray-700 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 appearance-none"
                                            name="tipo"
                                            onChange={(e) => setTipo(e.target.value)}
                                            required={true}>
                                        <option value=''>Selecione o tipo da chave</option>
                                        <option value="cpf">CPF</option>
                                        <option value='telefone'>Telefone</option>
                                        <option value='email'>Email</option>
                                    </select>
                                    <div className="h-5 mt-1">
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="chave"
                                       className="block text-sm/6 font-medium text-white">Chave</label>
                                <div className="mt-2">
                                    <input id="chave" type="text" name="chave" required={true}
                                           onChange={(e) => setChave(e.target.value)}
                                           className="bg-gray-800 text-white border border-gray-700 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 appearance-none"
                                    />
                                    <div className="h-5 mt-1">
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <p className={`text-red-600 break-all whitespace-normal`}>
                        {message}
                    </p>
                    <Link to={"/HomePage"}>
                        <button className="text-sm/6 font-semibold text-white">Voltar</button>
                    </Link>
                    <button type="submit"
                            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Enviar
                    </button>
                </div>
            </form>

        </>

    )
}