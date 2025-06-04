import { Request, Response } from "express"
import { EstoqueService } from "../service/EstoqueService"
import { EstoqueEntity } from "../model/EstoqueEntity"

export class EstoqueController {
    private estoqueService = new EstoqueService()

    criarEstoque(req: Request, res: Response) {
        try{
            const estoque = this.estoqueService.criarEstoque(req.body)
            res.status(201).json(estoque)
        }catch(error: unknown){
            let message: string = "Não foi possível criar Registro"
            if( error instanceof Error){
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }

    listarEstoque(req: Request, res: Response) {
        const estoque = this.estoqueService.listarEstoque()
        res.json(estoque)
    }

    buscarPorCod(req: Request, res: Response) {
        try{
            const { codigo } = req.params
            const exemplar = this.estoqueService.buscarPorCodigo(codigo)
            res.status(201).json(exemplar) 
        }catch (error: unknown) {
            let message: string = "Exemplar não encontrado"
            if( error instanceof Error){
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }

    atualizarEstoque(req: Request, res: Response) {
        try{
            const { id } = req.params
            const atualizado = this.estoqueService.atualizarEstoque(Number(id), req.body)
            res.status(201).json(id)
        }catch (error: unknown) {
            let message: string = "Erro ao atualizar exemplar"
            if( error instanceof Error){
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }

    removerEstoque(req: Request, res: Response) {
        try{
            const { id } = req.params
            this.estoqueService.removerEstoque(Number(id))
            res.status(201).json(id)
        }catch (error: unknown) {
            let message: string = "Erro ao atualizar exemplar"
            if( error instanceof Error){
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }
}