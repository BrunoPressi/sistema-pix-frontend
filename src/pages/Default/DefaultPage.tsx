import { Link } from "react-router-dom";

export default function DefaultPage() {
    return (

        <>

            <div className={"fixed top-8 left-5"}>

                <div className={"text-2xl"}>
                    <h2>ERRO 404: Página não encontrada ou sua sessão expirou 😞</h2>
                </div>

                <div className={"mt-5"}>
                    <Link to={"/"}>
                        <button>Fazer login</button>
                    </Link>
                </div>

            </div>

        </>

    )
}