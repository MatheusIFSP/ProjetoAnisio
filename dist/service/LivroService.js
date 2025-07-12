"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const LivroEntity_1 = require("../model/entity/LivroEntity");
const LivroRepository_1 = require("../repository/LivroRepository");
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
class LivroService {
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    categoriaLivroRepository = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
    async criarLivro(livroData) {
        const { titulo, autor, editora, edicao, isbn, categoria_id } = livroData;
        const livro = new LivroEntity_1.LivroEntity(undefined, titulo, autor, editora, edicao, isbn, categoria_id);
        const novoLivro = await this.livroRepository.insereLivro(livro);
        console.log("Service - Insert", novoLivro);
        return novoLivro;
    }
    async listarLivro() {
        const livros = await this.livroRepository.findAll();
        console.log("Service - Filtrar todos", livros);
        return livros;
    }
    async buscarPorISBN(livroData) {
        const idNumber = parseInt(livroData, 10);
        const livro = await this.livroRepository.findByISBN(idNumber);
        console.log("Service - Filtrar", livro);
        return livro;
    }
    async atualizarLivro(livroData) {
        const { id, titulo, autor, editora, edicao, isbn, categoria_id } = livroData;
        const livro = new LivroEntity_1.LivroEntity(id, titulo, autor, editora, edicao, isbn, categoria_id);
        await this.livroRepository.updateLivro(isbn, livro);
        console.log("Service - Update ", livro);
        return livro;
    }
    async removerLivro(livroData) {
        const { id, titulo, autor, editora, edicao, isbn, categoria_id } = livroData;
        const livro = new LivroEntity_1.LivroEntity(id, titulo, autor, editora, edicao, isbn, categoria_id);
        await this.livroRepository.removeByISBN(livro);
        console.log("Service - Delete ", livro);
        return livro;
    }
    async verificarLivro(autor, editora, edicao) {
        const livros = await this.livroRepository.findAll();
        const livroExistente = livros.some((livro) => livro.autor === autor &&
            livro.editora === editora &&
            livro.edicao === edicao);
        if (livroExistente) {
            throw new Error("Esse livro já está cadastrado");
        }
    }
    async validarCategoriaLivro(categoria_id) {
        const categoria = await this.categoriaLivroRepository.findCategoriaLivro(categoria_id);
        if (!categoria) {
            throw new Error("Categoria de livro inválida ou inexistente");
        }
    }
}
exports.LivroService = LivroService;
