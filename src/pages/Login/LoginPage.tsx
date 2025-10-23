import React, {useContext} from "react";
import CadastroButton from "../../components/CadastroButton.tsx";
import {AuthContext} from "../../contexts/auth.tsx";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const [message, setMessage] = React.useState('')
    const [cpf_cnpj, setCpfCnpj] = React.useState('')
    const [senha, setSenha] = React.useState('')
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    async function loginAction() {
        try {
            await login(cpf_cnpj, senha)
            navigate('HomePage')
        } catch (error: any) {
            setMessage(error.errorMessage)
        }

    }

    return (
        <>

            <form action={loginAction}>
                <div className="space-y-12">
                    <div className="border-b border-white/10 pb-8 ">
                        <h2 className="text-4xl/7 font-semibold font- text-white">Login</h2>

                        <div className="mt-10">
                            <div className="sm:col-span-4">
                                <label htmlFor="cpf_cnpj"
                                       className="block text-sm/6 font-medium text-white">CPF / CNPJ</label>
                                <div className="mt-2 w-80">
                                    <div
                                        className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500 w-full">
                                        <input id="cpf_cnpj" type="text" name="cpf_cnpj"
                                               onChange={(e) => setCpfCnpj(e.target.value)}
                                               onClick={() => setMessage('')}
                                               placeholder='123.456.789.01 - XX.XXX.XXX/YYYY-ZZ' value={cpf_cnpj}
                                               required={true}
                                               pattern={'^(\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}|\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2})$'}
                                               className="block w-full grow bg-transparent py-1.5 pr-3 pl-1 text-white focus:outline-none sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="mt-3">
                            <div className="sm:col-span-4">
                                <label htmlFor="senha"
                                       className="block text-sm/6 font-medium text-white">Senha</label>
                                <div className="mt-2">
                                    <div
                                        className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                                        <input id="senha" type="password" name="senha"
                                               onChange={(e) => setSenha(e.target.value)} onClick={() => setMessage('')}
                                               placeholder='Senha123' required={true}
                                               className="block min-w-0 max grow bg-transparent py-1.5 pr-3 pl-1 focus:outline-none sm:text-sm/6"/>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="mt-5 flex items-center justify-center gap-x-6">
                    <button type="submit"
                            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Entrar
                    </button>
                </div>
                {message && (
                    <p className={'text-red-600 mt-5'}>{message}</p>
                )}
            </form>
            <CadastroButton></CadastroButton>
        </>
    )
}