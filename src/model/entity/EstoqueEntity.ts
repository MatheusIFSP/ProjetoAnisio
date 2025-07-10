export class EstoqueEntity {
    id: number
    livro_isbn: number
    quantidade: number
    quantidade_emprestada: number
    disponivel: boolean

    constructor(id?: number, livro_isbn?: number, quantidade?: number, quantidade_emprestada?: number){
        this.id = id || 0 
        this.livro_isbn = livro_isbn || 0
        this.quantidade = quantidade || 0
        this.quantidade_emprestada = quantidade_emprestada || 0
        this.disponivel = true
    }
}