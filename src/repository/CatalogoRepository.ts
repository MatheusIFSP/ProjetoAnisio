import { UsuarioEntity } from "../model/UsuarioEntity";

export class CatalogoRepository {
    private categoriaUsuario = ["Professor", "Aluno", "Bibliotecário"];
    private cursos = ["ADS", "Pedagogia", "Administração"];
    private static instance: CatalogoRepository

    constructor(){}

    static getInstance(): CatalogoRepository{
        if( !this.instance ){
            this.instance = new CatalogoRepository()
        }
        return CatalogoRepository.instance;
    }
    listarCategoriaUsuario() {
        return this.categoriaUsuario;
    }
    listarCursos() {
        return this.cursos;
    }
    existeCategoriaUsuario(categoria_id: string) {
        return this.categoriaUsuario.includes(categoria_id);
    }
    existeCurso(curso_id: string) {
        return this.categoriaUsuario.includes(curso_id)
    }
}