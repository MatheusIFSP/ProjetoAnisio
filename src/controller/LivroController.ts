import { Request, Response } from "express"
import { LivroService } from "../service/LivroService"
import { LivroEntity } from "../model/entity/LivroEntity"

export class LivroController {
    private livroService = new LivroService()

    criarLivro(req: Request, res: Response) {
        try{
            const livro = this.livroService.criarLivro(req.body)
            res.status(201).json(livro)
        }catch(error: unknown){
            let message: string = "Não foi possível criar o registro"
            if( error instanceof Error){
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }

    listarLivro(req: Request, res: Response) {
        const livros = this.livroService.listarLivro()
        res.json(livros)
    }

    buscarPorISBN(req: Request, res: Response) {
        try{
            const isbn = Number(req.params.isbn)
            const livro = this.livroService.buscarPorISBN(isbn);
            res.status(201).json(livro)
    } catch (error: unknown) {
        let message: string = "Livro não encontrado"
        if (error instanceof Error){
            message = error.message
        }
        res.status(400).json({ message })
        }
    }  

    atualizarLivro(req: Request, res: Response) {
        try{
            const isbn = Number(req.params.isbn)
            const livroAtualizado = this.livroService.atualizarLivro(isbn, req.body)
            res.status(201).json(livroAtualizado)
        }catch (error: unknown){
            let message: string = "Não foi possível atualizar registro"
            if (error instanceof Error){
                message = error.message
            }
            res.status(400).json({ message })
        }
    }

    removerLivro(req: Request, res: Response) {
        try{
            const isbn = Number(req.params.isbn)
            this.livroService.removerLivro(isbn)
            res.status(201).send()
        }catch (error: unknown){
            let message: string = "Não foi possível remover o registro"
            if (error instanceof Error){
                message = error.message
            }
            res.status(400).json({ message })
        }
    }
}