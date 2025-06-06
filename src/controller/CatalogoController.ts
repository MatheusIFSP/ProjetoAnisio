import { Request, Response } from "express"
import { CatalogoRepository } from "../repository/CatalogoRepository"

export class CatalogoController {
    private catalogoRepository = CatalogoRepository.getInstance()

    listarCategoriaUsuario(req: Request, res: Response) {
        const categoria = this.catalogoRepository.listarCategoriaUsuario()
        res.status(201).json(categoria)
    }

    listarCursos(req: Request, res: Response) {
        try{
        const curso = this.catalogoRepository.listarCursos()
        res.status(201).json(curso)
        }catch(error: unknown){
            let message: string = "Curso não encontrado"
            if( error instanceof Error){
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }

    listarCategoriaLivro(req: Request, res: Response) {
        try{
        const categoriaLivro = this.catalogoRepository.listarCategoriaLivro()
        res.status(201).json(categoriaLivro)
        }catch(error: unknown){
            let message: string = "Categoria não encontrada"
            if( error instanceof Error){
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }
}