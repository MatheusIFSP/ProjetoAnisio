"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioService = void 0;
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
class CategoriaUsuarioService {
    categoriaUsuarioRepository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    async criarTabelaECategoriasPadrao() {
        await this.categoriaUsuarioRepository.insereCategoriaUsuario();
    }
    async listarCategorias() {
        return await this.categoriaUsuarioRepository.findAll();
    }
    async verificarCategoriaExiste(nome) {
        const categoria = await this.categoriaUsuarioRepository.encontrarCursos(nome);
        if (!categoria) {
            throw new Error("Categoria de usuário inválida ou inexistente");
        }
    }
}
exports.CategoriaUsuarioService = CategoriaUsuarioService;
