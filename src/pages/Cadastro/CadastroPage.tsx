import React from "react"
import {criarConta} from "../../services/api.ts";
import {Link, useNavigate} from "react-router-dom";

export default function CadastroPage() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = React.useState({
        cpf_cnpj: '',
        senha: '',
        nomeCompleto: '',
        telefone: '',
        rua: '',
        bairro: '',
        cidade: ''
    })

    const [message, setMessage] = React.useState({
        nomeCompleto: '',
        cpf_cnpj: '',
        senha: '',
        rua: '',
        telefone: '',
        bairro: '',
        cidade: '',
        errorMessage: ''
    });

    async function criarContaAction() {
        try {
            await criarConta(usuario)

            navigate("/")
        } catch (error: any) {
            if (error.errorMessage != null) {
                setMessage((prev) => ({...prev, errorMessage: error.errorMessage}));
            } else {
                const errorsLength = error.errors.length;
                for (let i = 0; i < errorsLength; i++) {
                    let pathError = error.errors[i].path;
                    setMessage((prev) => ({...prev, [pathError]: error.errors[i].msg}));
                }
            }
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
                                <label htmlFor="nomeCompleto" className="block text-sm/6 font-medium text-white">Nome
                                    Completo</label>
                                <div className="mt-2">
                                    <input id="nomeCompleto" type="text" name="nomeCompleto" required={true}
                                           onChange={(e) => setUsuario((prev) => ({
                                               ...prev,
                                               nomeCompleto: e.target.value
                                           }))} onClick={() => setMessage((prev) => ({...prev, nomeCompleto: ''}))}
                                           value={usuario.nomeCompleto}
                                           className="block min-w-0 w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                                    <div className="h-5 mt-1">
                                        <p className={`text-red-600`}>
                                            {message.nomeCompleto}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="cpfCnpj"
                                       className="block text-sm/6 font-medium text-white">CPF/CNPJ</label>
                                <div className="mt-2">
                                    <input id="cpfCnpj" type="text" name="cpfCnpj" required={true}
                                           pattern={'^(\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}|\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2})$'}
                                           onChange={(e) => setUsuario((prev) => ({...prev, cpf_cnpj: e.target.value}))}
                                           onClick={() => setMessage((prev) => ({...prev, cpf_cnpj: ''}))}
                                           value={usuario.cpf_cnpj}
                                           className="block min-w-0 w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                                    <div className="h-5 mt-1">
                                        <p className={`text-red-600`}>
                                            {message.cpf_cnpj}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="telefone"
                                       className="block text-sm/6 font-medium text-white">Telefone</label>
                                <div className="mt-2">
                                    <input id="telefone" type="text" name="telefone" required={true}
                                           onChange={(e) => setUsuario((prev) => ({...prev, telefone: e.target.value}))}
                                           onClick={() => setMessage((prev) => ({...prev, telefone: ''}))}
                                           value={usuario.telefone}
                                           className="block min-w-0 w-full rounde5d-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                                    <div className="h-5 mt-1">
                                        <p className={`text-red-600`}>
                                            {message.telefone}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="senha" className="block text-sm/6 font-medium text-white">Senha</label>
                                <div className="mt-2">
                                    <input id="senha" type="password" name="senha" required={true}
                                           onChange={(e) => setUsuario((prev) => ({...prev, senha: e.target.value}))}
                                           onClick={() => setMessage((prev) => ({...prev, senha: ''}))}
                                           value={usuario.senha}
                                           className="block min-w-0 w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                                    <div className="h-5 mt-1">
                                        <p className={`text-red-600`}>
                                            {message.senha}
                                        </p>
                                    </div>
                                </div>

                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="rua" className="block text-sm/6 font-medium text-white">Rua</label>
                                <div className="mt-2">
                                    <input id="rua" type="text" name="rua" required={true}
                                           onChange={(e) => setUsuario((prev) => ({...prev, rua: e.target.value}))}
                                           onClick={() => setMessage((prev) => ({...prev, rua: ''}))}
                                           value={usuario.rua}
                                           className="block min-w-0 w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                                    <div className="h-5 mt-1">
                                        <p className={`text-red-600`}>
                                            {message.rua}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="bairro"
                                       className="block text-sm/6 font-medium text-white">Bairro</label>
                                <div className="mt-2">
                                    <input id="bairro" type="text" name="bairro" required={true}
                                           onChange={(e) => setUsuario((prev) => ({...prev, bairro: e.target.value}))}
                                           onClick={() => setMessage((prev) => ({...prev, bairro: ''}))}
                                           value={usuario.bairro}
                                           className="block min-w-0 w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                                    <div className="h-5 mt-1">
                                        <p className={`text-red-600`}>
                                            {message.bairro}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="cidade"
                                       className="block text-sm/6 font-medium text-white">Cidade</label>
                                <div className="mt-2">
                                    <input id="cidade" type="text" name="cidade" required={true}
                                           onChange={(e) => setUsuario((prev) => ({...prev, cidade: e.target.value}))}
                                           onClick={() => setMessage((prev) => ({...prev, cidade: ''}))}
                                           value={usuario.cidade}
                                           className="block min-w-0 w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                                    <div className="h-5 mt-1">
                                        <p className={`text-red-600`}>
                                            {message.cidade}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <p className={`text-red-600 break-all whitespace-normal`}>
                        {message.errorMessage}
                    </p>
                    <Link to={"/"}>
                        <button className="text-sm/6 font-semibold text-white">Cancelar</button>
                    </Link>
                    <button type="submit"
                            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Enviar
                    </button>
                </div>
            </form>

        </>

    )
}