import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";
import { CategoriaUsuario } from "../model/entity/CategoriaUsuario";

export class CategoriaUsuarioService {
  private categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();

  async criarTabelaECategoriasPadrao(): Promise<void> {
    await this.categoriaUsuarioRepository.insereCategoriaUsuario();
  }

  async listarCategorias(): Promise<string[]> {
    return await this.categoriaUsuarioRepository.findAll();
  }

  async verificarCategoriaExiste(nome: string): Promise<void> {
    const categoria = await this.categoriaUsuarioRepository.encontrarCursos(nome);
    if (!categoria) {
      throw new Error("Categoria de usuário inválida ou inexistente");
    }
  }
}