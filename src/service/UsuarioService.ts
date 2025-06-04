import { UsuarioEntity } from "../model/UsuarioEntity"
import { UsuarioRepository } from "../repository/UsuarioRepository"
import { CatalogoRepository } from "../repository/CatalogoRepository"

export class UsuarioService{
    private usuarioRepository = UsuarioRepository.getInstance()
    private catalogoRepository = CatalogoRepository.getInstance()

    listarUsuario(){
        return this.usuarioRepository.findAll()
    }

    buscarPorId(id: number){
        return this.usuarioRepository.findById(id)
    }
    validarCPF( cpf: string ){
        if(typeof cpf !== 'string')
            throw new Error ("Permitido apenas números")
        cpf = cpf.replace(/[^\d]+/g, '')
        if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/))
            throw new Error ("Necessário ter 11 dígitos e/ou proibido números repetidos")
        let cpfList = cpf.split('').map(el => +el)

        const rest = (count: number) => {
            const soma = cpfList.slice(0, count -1)
                .reduce((soma, el, index) => soma + el * (count-index), 0) 
                
                return (soma * 10) % 11 % 10
        }
        return rest(10) === cpfList[9] && rest(11) === cpfList[10]
    }

    validarCategoriaECurso(categoria_id: string, curso_id: string) {
        if (!this.catalogoRepository.existeCategoriaUsuario(categoria_id)) {
            throw new Error("Categoria inválida ou inexistente")
        }
        if (!this.catalogoRepository.existeCurso(curso_id)) {
            throw new Error("Curso inválido ou inexistente")
        }
        return true;
    }

    verificarCPFduplicado(cpf: string) {
        const existe = this.usuarioRepository.findAll().some(u => u.cpf === cpf)
        if (existe) {
            throw new Error("CPF já cadastrado")
        }
    }

    criarUsuario(usuario: UsuarioEntity) {
        if (!this.validarCPF(usuario.cpf)) {
            throw new Error("CPF inválido")
        }
        this.verificarCPFduplicado(usuario.cpf);
        this.validarCategoriaECurso(usuario.categoria_id, usuario.curso_id)

        return this.usuarioRepository.insereUsuario(usuario)
    }
}
