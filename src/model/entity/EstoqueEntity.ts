export class EstoqueEntity {
    id: number
    livro_isbn: number
    quantidade: number
    quantidade_emprestada: number
    disponivel: boolean

    constructor(
        livro_isbn: number,
        quantidade: number,
        disponivel: boolean,
        id?: number,
        quantidade_emprestada?: number
    ){
        this.id = id || 0 
        this.livro_isbn = livro_isbn
        this.quantidade = quantidade
        this.quantidade_emprestada = quantidade_emprestada || 0
        this.disponivel = disponivel
    }
}