export class LivroEntity {
    id: number
    titulo: string
    autor: string
    editora: string
    edicao: string
    isbn: number
    categoria_id: string

    constructor(
        id: number,
        titulo: string,
        autor: string,
        editora: string,
        edicao: string,
        isbn: number,
        categoria_id: string
    ){
        this.id = id 
        this.titulo = titulo
        this.autor = autor
        this.editora = editora
        this.edicao = edicao
        this.isbn = isbn
        this.categoria_id = categoria_id
    }
}