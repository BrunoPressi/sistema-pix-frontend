import { Link } from "react-router-dom";

export default function CadastroButton() {
    return (

        <>

            <Link to='/CadastroPage'>
                <button className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 w-32 rounded-full">
                    Criar Conta
                </button>
            </Link>


        </>
    )
}