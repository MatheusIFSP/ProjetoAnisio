export class EstoqueEntity {
    id: number
    codigo: string
    livro_isbn: number
    disponivel: boolean

    constructor(
        id: number | undefined,
        livro_isbn: number,
        codigo: string,
        disponivel: boolean
    ){
        this.id = id ?? this.gerarId()
        this.livro_isbn = livro_isbn
        this.codigo = codigo
        this.disponivel = disponivel
    }
    private gerarId(): number{
        return parseInt((Date.now() /100).toString(),10)
    }
}