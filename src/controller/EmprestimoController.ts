import { Request, Response } from "express"
import { EmprestimoService } from "../service/EmprestimoService"
import { EmprestimoEntity } from "../model/EmprestimoEntity"

export class EmprestimoController {
    private emprestimoService = new EmprestimoService()

    criarEmprestimo(req: Request, res: Response) {
        try{
            const estoque = this.emprestimoService.criarEmprestimo(req.body)
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

    listarEmprestimo(req: Request, res: Response) {
        const emprestimo = this.emprestimoService.listarEmprestimo()
        res.json(emprestimo)
    }

    buscarPorId(req: Request, res: Response) {
        try{
            const id = Number(req.params.id)
            const emprestimo = this.emprestimoService.buscarPorId(id)
            res.status(201).json(emprestimo)
        }catch(error: unknown){
            let message: string = "Usuário não encontrado"
            if( error instanceof Error){
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }

    devolverEmprestimo(req: Request, res: Response) {
        try{
            const id = Number(req.params.id)
            const { data_entrega } = req.body
            const emprestimoFinalizado = this.emprestimoService.devolverEmprestimo(id, new Date(data_entrega))
            res.status(201).json(emprestimoFinalizado)
        }catch(error: unknown){
            let message: string = "Usuário não encontrado"
            if( error instanceof Error){
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }
}