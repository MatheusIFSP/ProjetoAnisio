import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";
import { CategoriaLivro } from "../model/entity/CategoriaLivro";

export class CategoriaLivroService {
  private categoriaLivroRepository = CategoriaLivroRepository.getInstance();

  async InsereCategorias(): Promise<void> {
    await this.categoriaLivroRepository.insereCategoriaLivro();
  }

  async listarCategorias(): Promise<string[]> {
    return await this.categoriaLivroRepository.findAll();
  }

  async verificarCategoriaExiste(nome: string): Promise<void> {
    const categoria = await this.categoriaLivroRepository.findCategoriaLivro(nome);
    if (!categoria) {
      throw new Error("Categoria de livro inválida ou inexistente");
    }
  }
}