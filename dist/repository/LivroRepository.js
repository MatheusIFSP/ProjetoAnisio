"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRepository = void 0;
const mysql_1 = require("../database/mysql");
class LivroRepository {
    static instance;
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return LivroRepository.instance;
    }
    async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Livro (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        autor VARCHAR(255) NOT NULL,
        editora VARCHAR(255) NOT NULL,
        edicao VARCHAR(255) NOT NULL,
        isbn DECIMAL(13) NOT NULL,
        categoria_id VARCHAR(255) NOT NULL
        )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela Livro criado com sucesso', resultado);
        }
        catch (err) {
            console.log('Erro', err);
        }
    }
    async insereLivro(livro) {
        const query = "INSERT INTO biblioteca.Livro (titulo, autor, editora, edicao, isbn, categoria_id) VALUES (?, ?, ?, ?, ?, ?)";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [livro.titulo, livro.autor, livro.editora, livro.edicao, livro.isbn, livro.categoria_id]);
            console.log('Livro inserido com sucesso, ID: ', resultado.insertId);
            livro.id = resultado.insertId;
            return new Promise((resolve) => {
                resolve(livro);
            });
        }
        catch (err) {
            console.error('Erro ao inserir o livro:', err);
            throw err;
        }
    }
    async findAll() {
        const query = "SELECT * FROM biblioteca.Livro";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            return new Promise((resolve) => {
                resolve(resultado);
            });
        }
        catch (err) {
            console.error(`Falha ao listar os livros gerando o erro: ${err}`);
            throw err;
        }
    }
    async findByISBN(isbn) {
        const query = "SELECT * FROM biblioteca.Livro WHERE isbn = ?";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [isbn]);
            console.log('Livro localizado com sucesso, ISBN: ', resultado);
            return new Promise((resolve) => {
                resolve(resultado);
            });
        }
        catch (err) {
            console.error(`Falha ao procurar o produto de ISBN ${isbn} gerando o erro: ${err}`);
            throw err;
        }
    }
    async updateLivro(isbn, livro) {
        const query = "UPDATE biblioteca.Livro SET titulo = ?, autor = ?, editora = ?, edicao = ?, categoria_id = ? WHERE isbn = ?;";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [livro.titulo, livro.autor, livro.editora, livro.edicao, livro.categoria_id, livro.isbn]);
            console.log('Livro atualizado com sucesso, ISBN ${isbn}: ', resultado);
            return new Promise((resolve) => {
                resolve(resultado);
            });
        }
        catch (err) {
            console.error(`Erro ao atualizar o livro de ISBN ${isbn} gerando o erro: ${err}`);
            throw err;
        }
    }
    async removeByISBN(isbn) {
        const query = "DELETE FROM biblioteca.Livro where isbn = ?;";
        try {
            await (0, mysql_1.executarComandoSQL)(query, [isbn]);
            console.log(`Livro ISBN ${isbn} removido com sucesso.`);
        }
        catch (err) {
            console.error(`Erro ao remover livro ISBN ${isbn}:`, err);
            throw err;
        }
    }
}
exports.LivroRepository = LivroRepository;
