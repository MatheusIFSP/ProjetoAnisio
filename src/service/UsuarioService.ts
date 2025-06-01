import { UsuarioEntity } from "../model/UsuarioEntity";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class UsuarioService{
    private usuarioRepository = UsuarioRepository.getInstance()

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

    validarCategoriaECurso(categoria_id: number, curso_id: number) {
        const categoria = this.usuarioRepository.findById(categoria_id);
        const curso = this.usuarioRepository.findById(curso_id);

        if (!categoria) {
            throw new Error("Categoria inválida ou inexistente");
        }
        if (!curso) {
            throw new Error("Curso inválido ou inexistente");
        }
        return true;
    }
}
