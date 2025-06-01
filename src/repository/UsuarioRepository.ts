import { UsuarioEntity } from "../model/UsuarioEntity"

export class UsuarioRepository{
    private static instance: UsuarioRepository
    private usuarioList: UsuarioEntity[] = []

    constructor(){}

    static getInstance(): UsuarioRepository{
        if( !this.instance ){
            this.instance = new UsuarioRepository()
        }
        return UsuarioRepository.instance
    }

    insereUsuario(usuario: UsuarioEntity) {
        this.usuarioList.push(usuario);
        return usuario;
    }

    findAll(){
        return this.usuarioList;
    }

      findById( id:number): UsuarioEntity{
         const index = this.findIndex(id)
         return this.pessoaList[index]
    }

    }
}