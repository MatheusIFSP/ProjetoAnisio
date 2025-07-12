"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroService = void 0;
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
class CategoriaLivroService {
    categoriaLivroRepository = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
    async InsereCategorias() {
        await this.categoriaLivroRepository.insereCategoriaLivro();
    }
    async listarCategorias() {
        return await this.categoriaLivroRepository.findAll();
    }
    async verificarCategoriaExiste(nome) {
        const categoria = await this.categoriaLivroRepository.findCategoriaLivro(nome);
        if (!categoria) {
            throw new Error("Categoria de livro inválida ou inexistente");
        }
    }
}
exports.CategoriaLivroService = CategoriaLivroService;
