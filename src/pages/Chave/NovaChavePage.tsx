import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {api, criarChave} from "../../services/api.ts";
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
            api.defaults.headers.Authorization = `Bearer ${context.token}`;
            await criarChave(tipo, chave, token.id);
            navigate('/MinhasChavesPage');
        }
        catch (error: any) {
            setMessage(error.errorMessage);
        }
    }

    return (

        <>

            <div className="bg-white rounded-2xl shadow-lg p-8 w-full">
                <form action={novaChaveAction}>
                    <div className="space-y-12">

                        <div className="border-b border-white/10 pb-12">
                            <h2 className="text-2xl font-semibold text-black">Cadastrar nova chave</h2>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                <div className="sm:col-span-3">
                                    <label htmlFor="tipo"
                                           className="block text-lg font-medium text-black">Tipo</label>
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
                                           className="block text-lg font-medium text-black">Chave</label>
                                    <div className="mt-2">
                                        <input id="chave" type="text" name="chave" required={true}
                                               placeholder="Digite a chave..."
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
                            <button className="text-base font-semibold text-white">Voltar</button>
                        </Link>
                        <button type="submit"
                                className="text-bae rounded-md bg-indigo-500 font-semibold text-white">Enviar
                        </button>
                    </div>
                </form>
            </div>

        </>

    )
}