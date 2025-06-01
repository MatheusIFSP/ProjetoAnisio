import { Request, Response } from "express";
import { LivroService } from "../service/LivroService";
import { LivroEntity } from "../model/LivroEntity";

export class LivroController {
    private livroService = new LivroService();

    criar(req: Request, res: Response) {
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
    listar(req: Request, res: Response){
        const livros = this.livroService.listarLivro();
        res.json(livros);
    }
    buscar(req: Request, res: Response){
        try{
            const { isbn } = req.params;
            const livro = this.livroService.buscarPorISBN(isbn);
            res.status(200).json(livro);
    } catch (error: unknown) {
        let message: string = "Livro não encontrado";
        if (error instanceof Error){
            message = error.message;
        }
        res.status(404).json({ message });
    }
}