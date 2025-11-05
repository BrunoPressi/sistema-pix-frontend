interface PaginacaoProps {
    paginaAtual: number;
    totalPaginas: number;
    onPageChange: (page: number) => void;
}

export function Paginação( { paginaAtual, totalPaginas, onPageChange }: PaginacaoProps) {

    function handlePrevious() {
        if (paginaAtual > 1) {
            onPageChange(paginaAtual - 1);
        }
    }

    function handleNext() {
        if (paginaAtual < totalPaginas) {
            onPageChange(paginaAtual + 1);
        }
    }

    return (

        <>

            <div>
                <button disabled={paginaAtual === 1} onClick={handlePrevious}>
                    Anterior
                </button>
            </div>

            <span>
                Página {paginaAtual} de {totalPaginas}
            </span>

            <div>
                <button disabled={paginaAtual === totalPaginas} onClick={handleNext}>
                    Próxima
                </button>
            </div>

        </>

    );

}