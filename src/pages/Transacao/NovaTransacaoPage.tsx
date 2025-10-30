import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import type {TransacaoCreateDTO} from "../../types/TransacaoCreateDTO.ts";
import {api, novaTransacao} from "../../backend/api.ts";
import {UsuarioService} from "../../services/UsuarioService.ts";
import type {ChaveResponseDTO} from "../../types/ChaveResponseDTO.ts";
import {tratarErros} from "../../Utils/Utils.ts";
import {ChaveService} from "../../services/ChaveService.ts";

export function NovaTransacaoPage() {
    const usuarioService = new UsuarioService();
    const chaveService = new ChaveService([]);

    const [transacao, setTransacao] = React.useState<TransacaoCreateDTO>({
        valor: 0,
        chaveOrigem: '',
        chaveDestino: '' ,
        mensagem: ''
    });

    const [chaves, setChaves] = React.useState<ChaveResponseDTO[]>([]);

    const [message, setMessage] = React.useState({
        valor: '',
        chaveOrigem: '',
        chaveDestino: '',
        mensagem: '',
        errorMessage: ''
    });

    async function novaTransacaoAction() {
        try {
            api.defaults.headers.Authorization = `Bearer ${usuarioService.getToken()}`;
            await novaTransacao(transacao);
        }
        catch (error: any) {
            tratarErros(error, setMessage);
        }
    }

    async function loadChaves() {
        const chavesList: ChaveResponseDTO[] = await chaveService.carregarChaves();
        setChaves(chavesList);
    }

    useEffect(() => {
        loadChaves();
    }, []);

    return (

        <>

            <div className="bg-white rounded-xl py-3 px-5">
                <form action={novaTransacaoAction}>
                    <div className="space-y-12">

                        <div className="border-b border-black">
                            <h2 className="text-lg font-semibold text-black">Preencha os dados da transação</h2>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                <div className="sm:col-span-2">
                                    <label htmlFor="valor" className="block text-base font-medium text-black">Valor</label>
                                    <div className="mt-2">
                                        <input id="valor" type="number" name="valor" required={true}
                                               onChange={(e) => setTransacao((prev) => ({...prev, valor: Number(e.target.value)}))}
                                               className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2"
                                        />
                                        {message ? <p className="text-red-600">{message.valor}</p> : ''}
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="chaveOrigem" className="block text-base font-medium text-black">Chave de Origem</label>
                                    <div className="mt-2">
                                        <select id="chaveOrigem" name="chaveOrigem" required={true}
                                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2"
                                                onChange={(e) => setTransacao((prev) => ({...prev, chaveOrigem: e.target.value}))}>
                                                <option value=''>Selecione a chave de origem</option>
                                                {chaves?.map((chave) => (
                                                    <option value={chave.chave} key={chave.chave}>{chave.chave}</option>
                                                ))}
                                        </select>
                                        {message ? <p className="text-red-600">{message.chaveOrigem}</p> : ''}
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="chaveDestino"
                                           className="block text-base font-medium text-black">Chave de Destino</label>
                                    <div className="mt-2">
                                        <input id="chaveDestino" type="text" name="chaveDestino" required={true}
                                               onChange={(e) => setTransacao((prev) => ({...prev, chaveDestino: e.target.value}))}
                                               className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2"
                                        />
                                        {message ? <p className="text-red-600">{message.chaveDestino}</p> : ''}
                                    </div>
                                </div>
                            </div>
                            <div className="px-7 py-5 mt-4">
                                <label htmlFor="mensagem" className="block text-base font-medium text-black">Mensagem</label>
                                <div className="mt-2">
                                    <input id="mensagem" type="text" name="mensagem" required={false}
                                           onChange={(e) => setTransacao((prev) => ({...prev, mensagem: e.target.value}))}
                                           className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2"
                                    />
                                    {message ? <p className="text-red-600">{message.mensagem}</p> : ''}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="flex items-center justify-end gap-x-6 mt-6">
                        <p className={`text-red-600 break-all whitespace-normal`}>{message.errorMessage}</p>
                        <Link to={"/HomePage"}>
                            <button className="text-base text-white" type={"button"}>Cancelar</button>
                        </Link>
                        <button type="submit"
                                className="rounded-md bg-indigo-500 px-3 py-2 text-base text-white">Enviar
                        </button>
                    </div>
                </form>
            </div>

        </>

    )
}