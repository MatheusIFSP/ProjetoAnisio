import { UsuarioEntity } from "../model/entity/UsuarioEntity"
import { UsuarioRepository } from "../repository/UsuarioRepository"
import { CatalogoRepository } from "../repository/CatalogoRepository"
import { EmprestimoRepository } from "../repository/EmprestimoRepository"

export class UsuarioService{
    private usuarioRepository = UsuarioRepository.getInstance()
    private catalogoRepository = CatalogoRepository.getInstance()
    private emprestimoRepository = EmprestimoRepository.getInstance()

async criarUsuario(data: any): Promise<UsuarioEntity> {
    const { nome, cpf, status, categoria_id, curso_id } = data;

    if (!this.validarCPF(cpf)) {
      throw new Error("CPF inválido");
    }

    await this.verificarCPFduplicado(cpf);
    this.validarCategoriaECurso(categoria_id, curso_id);

    const usuario = new UsuarioEntity(nome, cpf, status, categoria_id, curso_id);
    const novoUsuario = await this.usuarioRepository.insereUsuario(usuario);
    console.log("Service - Criar", novoUsuario);
    return novoUsuario;
  }

  async atualizarUsuario(Usuariodata: any): Promise<UsuarioEntity> {
    const { id, nome, cpf, status, categoria_id, curso_id } = Usuariodata;

    this.validarCategoriaECurso(categoria_id, curso_id);

    const usuario = new UsuarioEntity(id, nome, cpf, status, categoria_id, curso_id);

    await this.usuarioRepository.updateUsuario(id);
    console.log("Service - Atualizar", usuario);
    return usuario;
  }

  async deletarUsuario(Usuariodata: any): Promise<UsuarioEntity> {
    const { id, nome, cpf, status, categoria_id, curso_id } = Usuariodata;

    const usuario = new UsuarioEntity(id, nome, cpf, status, categoria_id, curso_id)

    await this.usuarioRepository.removeById(id);
    console.log("Service - Delete ", usuario);
    return usuario;
    }

  async buscarUsuarioById(id: any): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findById(parseInt(id));
    console.log("Service - Buscar", usuario);
    return usuario;
  }

  async listarUsuarios(): Promise<UsuarioEntity[]> {
    const usuarios = await this.usuarioRepository.findAll();
    console.log("Service - Listar Todos", usuarios);
    return usuarios;
  }
    
    validarCPF( cpf: string ) {
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
}
