import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {api, criarChave} from "../../backend/api.ts";
import type {ChaveCreateDTO} from "../../types/ChaveCreateDTO.ts";
import {UsuarioService} from "../../services/UsuarioService.ts";

export default function NovaChavePage() {
   const usuarioService = new UsuarioService();
    const navigate = useNavigate();

    const [chave, setChave] = React.useState<ChaveCreateDTO>({
        tipo: '',
        chave: ''
    });

    const [message, setMessage] = React.useState('');

    const novaChaveAction = async () => {
        try {
            api.defaults.headers.Authorization = `Bearer ${usuarioService.getToken()}`;
            await criarChave(chave, usuarioService.getUserData()!.id);
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
                                                onChange={(e) => setChave((prev) => ({...prev, tipo: e.target.value}))}
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
                                               onChange={(e) => setChave((prev) => ({...prev, chave: e.target.value}))}
                                               className="bg-gray-800 text-white border border-gray-700 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 appearance-none"
                                        />
                                        <div className="h-5 mt-1">
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="flex items-center justify-end gap-3">
                        <p className={`text-red-600 break-all whitespace-normal`}>
                            {message}
                        </p>
                        <Link to={"/HomePage"}>
                            <button className="text-base font-semibold text-white" type={"button"}>Voltar</button>
                        </Link>
                        <button type="submit"
                                className="text-base rounded-md bg-indigo-500 font-semibold text-white">Enviar
                        </button>
                    </div>
                </form>
            </div>

        </>

    )
}