export class EstoqueEntity {
    livro_isbn: number
    quantidade: number
    quantidade_emprestada: number
    disponivel: 'disponível' | 'indisponível'

    constructor(
        livro_isbn: number,
        quantidade: number,
        quantidade_emprestada?: number
    ){
        this.livro_isbn = livro_isbn
        this.quantidade = quantidade
        this.quantidade_emprestada = quantidade_emprestada || 0
        this.disponivel = 'disponível'
    }
}