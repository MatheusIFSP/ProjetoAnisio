import { CursosRepository } from "../repository/CursosRepository";
import { CursosEntity } from "../model/entity/CursosEntity";

export class CursosService {
  private cursosRepository = CursosRepository.getInstance();

  async criarTabelaECursosPadrao(): Promise<void> {
    await this.cursosRepository.insereCursos();
  }

  async listarCursos(): Promise<string[]> {
    return await this.cursosRepository.findAll();
  }

  async verificarCursoExiste(nome: string): Promise<void> {
    const curso = await this.cursosRepository.findCursos(nome);
    if (!curso) {
      throw new Error("Curso inválido ou inexistente");
    }
  }
}