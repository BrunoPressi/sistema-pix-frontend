import React from "react"
import {criarConta} from "../../services/api.ts";

export default function CadastroPage() {
    const [usuario, setUsuario] = React.useState({
        cpf_cnpj: '',
        senha: '',
        nomeCompleto: '',
        telefone: '',
        rua: '',
        bairro: '',
        cidade: ''
    })

    const [message, setMessage] = React.useState('')

    async function criarContaAction() {
        try {
            const data = await criarConta(usuario)
            console.log(data)
        }
        catch (error: any) {
            //console.log(error)
            setMessage(error.errorMessage)
        }
    }

    return (

        <>

            <form action={criarContaAction}>
                <div className="space-y-12">

                    <div className="border-b border-white/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-white">Preencha seus Dados</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div className="sm:col-span-2">
                                <label htmlFor="nomeCompleto" className="block text-sm/6 font-medium text-white">Nome Completo</label>
                                <div className="mt-2">
                                    <input id="nomeCompleto" type="text" name="nomeCompleto" required={true} onChange={(e) => setUsuario((prev) => ({ ...prev, nomeCompleto: e.target.value}))} value={usuario.nomeCompleto}
                                           className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="cpfCnpj" className="block text-sm/6 font-medium text-white">CPF/CNPJ</label>
                                <div className="mt-2">
                                    <input id="cpfCnpj" type="text" name="cpfCnpj" required={true} pattern={'^(\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}|\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2})$'} onChange={(e) => setUsuario((prev) => ({ ...prev, cpf_cnpj: e.target.value}))} value={usuario.cpf_cnpj}
                                           className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="senha" className="block text-sm/6 font-medium text-white">Senha</label>
                                <div className="mt-2">
                                    <input id="senha" type="password" name="senha" required={true} onChange={(e) => setUsuario((prev) => ({ ...prev, senha: e.target.value}))} value={usuario.senha}
                                           className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="rua" className="block text-sm/6 font-medium text-white">Rua</label>
                                <div className="mt-2">
                                    <input id="rua" type="text" name="rua" required={true} onChange={(e) => setUsuario((prev) => ({ ...prev, rua: e.target.value}))} value={usuario.rua}
                                           className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="telefone" className="block text-sm/6 font-medium text-white">Telefone</label>
                                <div className="mt-2">
                                    <input id="telefone" type="text" name="telefone" required={true} onChange={(e) => setUsuario((prev) => ({ ...prev, telefone: e.target.value}))} value={usuario.telefone}
                                           className="block w-full rounde5d-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="bairro" className="block text-sm/6 font-medium text-white">Bairro</label>
                                <div className="mt-2">
                                    <input id="bairro" type="text" name="bairro" required={true} onChange={(e) => setUsuario((prev) => ({ ...prev, bairro: e.target.value}))} value={usuario.bairro}
                                           className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="cidade" className="block text-sm/6 font-medium text-white">Cidade</label>
                                <div className="mt-2">
                                    <input id="cidade" type="text" name="cidade" required={true} onChange={(e) => setUsuario((prev) => ({ ...prev, cidade: e.target.value}))} value={usuario.cidade}
                                           className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                                </div>
                            </div>

                        </div>
                    </div>

                    </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    {message && (
                        <p className={'text-red-600 mt-5'}>{message}</p>
                    )}
                    <button type="reset" className="text-sm/6 font-semibold text-white">Resetar</button>
                    <button type="submit"
                            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Enviar
                    </button>
                </div>
            </form>

        </>

    )
}