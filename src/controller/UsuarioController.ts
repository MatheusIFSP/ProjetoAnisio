import { Request, Response } from "express";
import { UsuarioService } from "../service/UsuarioService";
import { UsuarioEntity } from "../model/UsuarioEntity";

export class UsuarioController{
    private usuarioService = new UsuarioService()

    criarUsuario(req: Request, res: Response) {
        try{
            const usuario = this.usuarioService.criarUsuario(req.body)
            res.status(201).json(usuario)
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

    listarUsuario(req: Request, res: Response) {
        try{
            const usuario = this.usuarioService.listarUsuario()
            res.status(201).json(usuario)
        }catch(error: unknown){
            let message: string = "Não foi possível listar os usuários"
            if( error instanceof Error){
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }

    buscarPorId(req: Request, res: Response) {
        try{
            const { id } = req.params
            const usuario = this.usuarioService.buscarPorId(Number(id))
            res.status(201).json(usuario)
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

    removerUsuario(req: Request, res: Response) {
        try{
            const { id } = req.params
            this.usuarioService.removerUsuario(Number(id))
            res.status(201).send()
        }catch(error: unknown){
            let message: string = "Não foi possível remover o usuário"
            if( error instanceof Error){
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }
}