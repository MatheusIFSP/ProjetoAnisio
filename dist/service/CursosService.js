"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursosService = void 0;
const CursosRepository_1 = require("../repository/CursosRepository");
class CursosService {
    cursosRepository = CursosRepository_1.CursosRepository.getInstance();
    async criarTabelaECursosPadrao() {
        await this.cursosRepository.insereCursos();
    }
    async listarCursos() {
        return await this.cursosRepository.findAll();
    }
    async verificarCursoExiste(nome) {
        const curso = await this.cursosRepository.findCursos(nome);
        if (!curso) {
            throw new Error("Curso inválido ou inexistente");
        }
    }
}
exports.CursosService = CursosService;
