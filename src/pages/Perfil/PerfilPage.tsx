import {useEffect} from "react";
import React from "react";
import { Link } from "react-router-dom";
import type {UsuarioPatchDTO} from "../../types/UsuarioPatchDTO.ts";
import type {UsuarioDTO} from "../../types/UsuarioDTO.ts";
import { tratarErros } from "../../Utils/Utils.ts";
import { atualizarUsuario } from "../../backend/api.ts";
import {UsuarioService} from "../../services/UsuarioService.ts";

function verifyPatchData(usuarioVelho: UsuarioDTO, usuarioNovo: UsuarioPatchDTO) {
    if (usuarioNovo.telefone == '') {
        usuarioNovo.telefone = usuarioVelho.telefone;
    }
    if (usuarioNovo.rua == '') {
        usuarioNovo.rua = usuarioVelho.rua;
    }
    if (usuarioNovo.bairro == '') {
        usuarioNovo.bairro = usuarioVelho.bairro;
    }
    if (usuarioNovo.cidade == '') {
        usuarioNovo.cidade = usuarioVelho.cidade;
    }

    return usuarioNovo;
}

export default function PerfilPage() {
    const usuarioService = new UsuarioService();

    const [usuario, setUsuario] = React.useState<UsuarioDTO | null>(null);
    const [message, setMessage] = React.useState({
        rua: '',
        telefone: '',
        bairro: '',
        cidade: '',
        errorMessage: '',
        successMessage: ''
    });
    const [novoUsuario, setNovoUsuario] = React.useState<UsuarioPatchDTO>({
        telefone: '',
        rua: '',
        bairro: '',
        cidade: ''
    });

    const atualizarUsuarioAction = async () => {
        try {
            const usuarioNovo = verifyPatchData(usuario!, novoUsuario);
            await atualizarUsuario(usuario!.id, usuarioNovo);
            setMessage(message => ({
                ...message, successMessage: 'Dados atualizados com sucesso!'
            }));
        }
        catch (error: any) {
            tratarErros(error, setMessage);
        }
    }

    useEffect(() => {
        async function buscarUsuario() {
            const usuarioData = await usuarioService.carregarUsuario();
            setUsuario(usuarioData);
        }
        buscarUsuario();
    }, [])

    return (

        <>

                <div className="bg-white rounded-xl flex flex-col gap-5">

                    <div>
                        <div className="border border-black px-6 py-4">
                            <h2 className="text-lg text-black">Informações Pessoais</h2>
                        </div>
                        <div className="flex flex-row justify-center">
                            <div className="mb-3 mt-3 mr-2">
                                <p className="text-black font-bold">Nome Completo: {usuario?.nome_completo}</p>
                            </div>
                            <div>
                                <p className="text-black mt-3 mr-2">|</p>
                            </div>
                            <div className="mb-3 mt-3">
                                <p className="text-black font-bold">CPF/CNPJ: {usuario?.cpf_cnpj}</p>
                            </div>
                        </div>
                        <div className="mb-3">
                            <p className="text-black font-bold">Número da Conta: {usuario?.numero_conta}</p>
                        </div>
                    </div>

                    <div>
                        <div
                            className="rounded-xl border border-black">
                            <div className="border-b border-black px-6 py-4">
                                <h2 className="text-lg text-black">Editar Informações</h2>
                            </div>
                            <form action={atualizarUsuarioAction} className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            className="block text-black mb-1.5"
                                            htmlFor="telefone">Telefone</label>
                                        <input
                                            className="bg-gray-800 text-white border border-gray-700 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 appearance-none"
                                            onChange={(e) => setNovoUsuario((prev) => ({...prev, telefone: e.target.value}))}
                                            onClick={() => setMessage((prev) => ({...prev, telefone: ''}))}
                                            id="telefone" placeholder={novoUsuario?.telefone || usuario?.telefone}
                                        />
                                        <div className="h-5 mt-1">
                                            <p className={`text-red-600`}>
                                                {message.telefone}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm text-black mb-1.5"
                                            htmlFor="cidade">Cidade</label>
                                        <input
                                            className="bg-gray-800 text-white border border-gray-700 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 appearance-none"
                                            onChange={(e) => setNovoUsuario((prev) => ({...prev, cidade: e.target.value}))}
                                            onClick={() => setMessage((prev) => ({...prev, cidade: ''}))}
                                            id="cidade" placeholder={novoUsuario?.cidade || usuario?.cidade}
                                        />
                                        <div className="h-5 mt-1">
                                            <p className={`text-red-600`}>
                                                {message.cidade}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            className="block text-sm text-black mb-1.5"
                                            htmlFor="rua">Rua</label>
                                        <input
                                            className="bg-gray-800 text-white border border-gray-700 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 appearance-none"
                                            onChange={(e) => setNovoUsuario((prev) => ({...prev, rua: e.target.value}))}
                                            onClick={() => setMessage((prev) => ({...prev, rua: ''}))}
                                            id="rua" type="text" placeholder={novoUsuario?.rua || usuario?.rua}
                                        />
                                        <div className="h-5 mt-1">
                                            <p className={`text-red-600`}>
                                                {message.rua}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm text-black mb-1.5"
                                            htmlFor="bairro">Bairro</label>
                                        <input
                                            className="bg-gray-800 text-white border border-gray-700 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 appearance-none"
                                            onChange={(e) => setNovoUsuario((prev) => ({...prev, bairro: e.target.value}))}
                                            onClick={() => setMessage((prev) => ({...prev, bairro: ''}))}
                                            id="bairro" placeholder={novoUsuario?.bairro || usuario?.bairro}
                                        />
                                        <div className="h-5 mt-1">
                                            <p className={`text-red-600`}>
                                                {message.bairro}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-black">
                                    <div className="flex justify-evenly gap-3 pt-3">
                                        {
                                            message.successMessage ? <p className="text-red-600">{message.successMessage}</p>
                                                :
                                                ''
                                        }
                                        <Link to="/HomePage">
                                            <button
                                                type={"button"}
                                                className="text-sm text-white">
                                                <span>Voltar</span>
                                            </button>
                                        </Link>
                                        <button
                                            type={"submit"}
                                            className="text-sm bg-blue-500">
                                            <span>Atualizar</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

        </>

    )
}