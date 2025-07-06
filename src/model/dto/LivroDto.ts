export class LivroDto {
    titulo: string
    autor: string
    editora: string
    edicao: string
    isbn: number
    categoria_id: string

    constructor(
        titulo: string,
        autor: string,
        editora: string,
        edicao: string,
        isbn: number,
        categoria_id: string
    ){
        this.titulo = titulo
        this.autor = autor
        this.editora = editora
        this.edicao = edicao
        this.isbn = isbn
        this.categoria_id = categoria_id
    }
}