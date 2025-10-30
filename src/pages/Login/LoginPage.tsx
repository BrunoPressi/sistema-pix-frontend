import React, {useContext} from "react";
import CadastroButton from "../../components/CadastroButton.tsx";
import {AuthContext} from "../../contexts/auth.tsx";
import {useNavigate} from "react-router-dom";
import type {LoginDTO} from "../../types/LoginDTO.ts";

export default function LoginPage() {
    const { loginContext } = useContext(AuthContext);
    const navigate = useNavigate();

    const [login, setLogin] = React.useState<LoginDTO>({
        cpf_cnpj: '',
        senha: ''
    })

    const [message, setMessage] = React.useState('')

    async function loginAction() {
        try {
            await loginContext(login)
            navigate('HomePage')
        } catch (error: any) {
            setMessage(error.errorMessage)
        }

    }

    return (
        <>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <form action={loginAction}>
                    <div className="space-y-12">
                        <div className="border-b border-white/10 pb-8 ">
                            <h2 className="text-3xl/7 font-semibold font- text-black">Login</h2>

                            <div className="mt-10">
                                <div className="sm:col-span-4">
                                    <label htmlFor="cpf_cnpj"
                                           className="block text-sm/6 font-medium text-black">CPF / CNPJ</label>
                                    <div className="mt-2 w-80">
                                        <div
                                            className="flex items-center rounded-md bg-white/5 pl-3 w-full">
                                            <input id="cpf_cnpj" type="text" name="cpf_cnpj"
                                                   onChange={(e) => setLogin((prev) => ({...prev, cpf_cnpj: e.target.value}))}
                                                   onClick={() => setMessage('')}
                                                   placeholder='123.456.789.01 - XX.XXX.XXX/YYYY-ZZ'
                                                   required={true}
                                                   pattern={'^(\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}|\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2})$'}
                                                   className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="mt-3">
                                <div className="sm:col-span-4">
                                    <label htmlFor="senha"
                                           className="block text-sm/6 font-medium text-black">Senha</label>
                                    <div className="mt-2">
                                        <div
                                            className="flex items-center rounded-md bg-white/5 pl-3">
                                            <input id="senha" type="password" name="senha"
                                                   onChange={(e) => setLogin((prev) => ({...prev, senha: e.target.value}))}
                                                   onClick={() => setMessage('')}
                                                   placeholder='Senha123' required={true}
                                                   className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 appearance-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="mt-1 flex items-center justify-center gap-x-6">
                        <button type="submit"
                                className="rounded-md bg-indigo-black px-3 py-2 text-base font-semibold text-white">Entrar
                        </button>
                    </div>
                    {message && (
                        <p className={'text-red-600 mt-5'}>{message}</p>
                    )}
                </form>
            </div>
            <CadastroButton></CadastroButton>
        </>
    )
}