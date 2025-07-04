import { UsuarioEntity } from "../model/entity/UsuarioEntity"

export class UsuarioRepository{
    private static instance: UsuarioRepository
    private usuarioList: UsuarioEntity[] = []

    constructor(){}

    static getInstance(): UsuarioRepository {
        if( !this.instance ){
            this.instance = new UsuarioRepository()
        }
        return UsuarioRepository.instance
    }

    insereUsuario(usuario: UsuarioEntity) {
        this.usuarioList.push(usuario)
        return usuario
    }

    findAll(){
        return this.usuarioList
    }

    findById(id:number): UsuarioEntity {
        const index = this.findIndex(id)
        return this.usuarioList[index]
    }

    updateById(id: number, dados: Partial<UsuarioEntity>) {
            const index = this.findIndex(id)
            Object.assign(this.usuarioList[index], dados)
            return this.usuarioList[index]
        }

    removeById(id: number) {
        const index = this.findIndex(id)
        this.usuarioList.splice(index, 1)
    }
    
    private findIndex( id: number): number{
        const index = this.usuarioList.findIndex(u => u.id == id)
        if(index == -1){
            throw new Error("ID não informado não encontrado")
        }
        return index
    }
    }
