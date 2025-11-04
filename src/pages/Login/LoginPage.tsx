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

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 max-w-md mx-auto border border-gray-200">
                <form action={loginAction} className="space-y-8">
                    <div className="border-b border-gray-200 pb-6">
                        <h2 className="text-4xl font-bold text-gray-900 text-center">Login</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label
                                htmlFor="cpf_cnpj"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                CPF / CNPJ
                            </label>
                            <input
                                id="cpf_cnpj"
                                type="text"
                                name="cpf_cnpj"
                                onChange={(e) =>
                                    setLogin((prev) => ({ ...prev, cpf_cnpj: e.target.value }))
                                }
                                onClick={() => setMessage("")}
                                placeholder="Seu CPF / CNPJ"
                                required
                                value={login.cpf_cnpj}
                                pattern={
                                    "^(\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}|\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2})$"
                                }
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="senha"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Senha
                            </label>
                            <input
                                id="senha"
                                type="password"
                                name="senha"
                                onChange={(e) =>
                                    setLogin((prev) => ({ ...prev, senha: e.target.value }))
                                }
                                onClick={() => setMessage("")}
                                placeholder="Sua senha"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all text-white font-semibold py-3 rounded-xl shadow-md"
                        >
                            Entrar
                        </button>
                    </div>

                    {message && <p className="text-red-600 text-center mt-4">{message}</p>}
                </form>
            </div>

            <CadastroButton></CadastroButton>
        </>
    )
}