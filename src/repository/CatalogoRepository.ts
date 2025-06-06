import { UsuarioEntity } from "../model/UsuarioEntity"

export class CatalogoRepository {
    private categoriaUsuario = ["Professor", "Aluno", "Bibliotecário"]
    private cursos = ["ADS", "Pedagogia", "Administração"]
    private categoriaLivro = ["Romance", "Computação", "Letras", "Gestão"]
    private static instance: CatalogoRepository

    constructor(){}

    static getInstance(): CatalogoRepository{
        if( !this.instance ){
            this.instance = new CatalogoRepository()
        }
        return CatalogoRepository.instance
    }
    listarCategoriaUsuario() {
        return this.categoriaUsuario
    }
    listarCursos() {
        return this.cursos;
    }
    listarCategoriaLivro() {
        return this.categoriaLivro
    }
}