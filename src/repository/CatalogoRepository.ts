import { UsuarioEntity } from "../model/entity/UsuarioEntity"
import { LivroEntity } from "../model/entity/LivroEntity"
import { executarComandoSQL } from "../database/mysql"


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

    existeCategoriaUsuario(categoria: string): boolean {
        return this.categoriaUsuario.includes(categoria);
    }

    existeCurso(curso: string): boolean {
        return this.cursos.includes(curso);
    }

    existeCategoriaLivro(categoria: string): boolean {
        return this.categoriaLivro.includes(categoria);
    }
}