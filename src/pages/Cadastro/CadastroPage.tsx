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

            <div className="bg-white rounded-2xl p-8">
                <form action={criarContaAction}>
                    <div className="space-y-12">

                        <div className="border-b border-white/10 pb-12">
                            <h2 className="text-lg font-semibold text-black">Preencha seus Dados</h2>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                <div className="sm:col-span-2">
                                    <label htmlFor="nomeCompleto" className="block text-base font-medium text-black">Nome Completo</label>
                                    <div className="mt-2">
                                        <input id="nomeCompleto" type="text" name="nomeCompleto" required={true}
                                               onChange={(e) => setUsuario((prev) => ({...prev, nomeCompleto: e.target.value}))}
                                               onClick={() => setMessage((prev) => ({...prev, nomeCompleto: ''}))}
                                               value={usuario.nomeCompleto}
                                               placeholder="Seu nome completo..."
                                               className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2"
                                        />
                                        <div className="h-5 mt-1">
                                            <p className={`text-red-600`}>
                                                {message.nomeCompleto}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="cpfCnpj"
                                           className="block text-base font-medium text-black">CPF/CNPJ</label>
                                    <div className="mt-2">
                                        <input id="cpfCnpj" type="text" name="cpfCnpj" required={true}
                                               pattern={'^(?:(?:\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2})|(?:\\d{2}\\.?\\d{3}\\.?\\d{3}/?\\d{4}-?\\d{2}))$'}
                                               onChange={(e) => setUsuario((prev) => ({...prev, cpf_cnpj: e.target.value}))}
                                               onClick={() => setMessage((prev) => ({...prev, cpf_cnpj: ''}))}
                                               value={usuario.cpf_cnpj}
                                               placeholder="Seu CPF/CNPJ..."
                                               className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2"
                                        />
                                        <div className="h-5 mt-1">
                                            <p className={`text-red-600`}>
                                                {message.cpf_cnpj}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="telefone"
                                           className="block text-base font-medium text-black">Telefone</label>
                                    <div className="mt-2">
                                        <input id="telefone" type="text" name="telefone" required={true}
                                               onChange={(e) => setUsuario((prev) => ({...prev, telefone: e.target.value}))}
                                               onClick={() => setMessage((prev) => ({...prev, telefone: ''}))}
                                               value={usuario.telefone}
                                               placeholder="Seu telefone..."
                                               className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2"
                                        />
                                        <div className="h-5 mt-1">
                                            <p className={`text-red-600`}>
                                                {message.telefone}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="senha" className="block text-base font-medium text-black">Senha</label>
                                    <div className="mt-2">
                                        <input id="senha" type="password" name="senha" required={true}
                                               onChange={(e) => setUsuario((prev) => ({...prev, senha: e.target.value}))}
                                               onClick={() => setMessage((prev) => ({...prev, senha: ''}))}
                                               value={usuario.senha}
                                               placeholder="Sua senha..."
                                               className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2"
                                        />
                                        <div className="h-5 mt-1">
                                            <p className={`text-red-600`}>
                                                {message.senha}
                                            </p>
                                        </div>
                                    </div>

                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="rua" className="block text-base font-medium text-black">Rua</label>
                                    <div className="mt-2">
                                        <input id="rua" type="text" name="rua" required={true}
                                               onChange={(e) => setUsuario((prev) => ({...prev, rua: e.target.value}))}
                                               onClick={() => setMessage((prev) => ({...prev, rua: ''}))}
                                               value={usuario.rua}
                                               placeholder="Sua rua..."
                                               className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2"
                                        />
                                        <div className="h-5 mt-1">
                                            <p className={`text-red-600`}>
                                                {message.rua}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="bairro"
                                           className="block text-base font-medium text-black">Bairro</label>
                                    <div className="mt-2">
                                        <input id="bairro" type="text" name="bairro" required={true}
                                               onChange={(e) => setUsuario((prev) => ({...prev, bairro: e.target.value}))}
                                               onClick={() => setMessage((prev) => ({...prev, bairro: ''}))}
                                               value={usuario.bairro}
                                               placeholder="Seu bairro..."
                                               className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2"
                                        />
                                        <div className="h-5 mt-1">
                                            <p className={`text-red-600`}>
                                                {message.bairro}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="cidade"
                                           className="block text-base font-medium text-black">Cidade</label>
                                    <div className="mt-2">
                                        <input id="cidade" type="text" name="cidade" required={true}
                                               onChange={(e) => setUsuario((prev) => ({...prev, cidade: e.target.value}))}
                                               onClick={() => setMessage((prev) => ({...prev, cidade: ''}))}
                                               value={usuario.cidade}
                                               placeholder="Sua cidade..."
                                               className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2"
                                        />
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

                    <div className="flex items-center justify-end gap-x-6">
                        <p className={`text-red-600 break-all whitespace-normal`}>
                            {message.errorMessage}
                        </p>
                        <Link to={"/"}>
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