"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
const mysql_1 = require("../database/mysql");
class EstoqueRepository {
    static instance;
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return EstoqueRepository.instance;
    }
    async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Estoque (
        id INT AUTO_INCREMENT PRIMARY KEY,
        livro_isbn DECIMAL(13) NOT NULL,
        quantidade DECIMAL(10) NOT NULL,
        quantidade_emprestada(10) NOT NULL,
        disponível VARCHAR(15) NOT NULL 
        )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela Estoque criado com sucesso', resultado);
        }
        catch (err) {
            console.log('Erro', err);
        }
    }
    async insereEstoque(estoque) {
        const query = "INSERT INTO biblioteca.Estoque (livro_isbn, quantidade, quantidade_emprestada, disponivel) VALUES (?, ?, ?, ?)";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [estoque.livro_isbn, estoque.quantidade, estoque.quantidade_emprestada, estoque.disponivel]);
            console.log('Livro inserido com sucesso, ISBN: ', resultado.insertId);
            estoque.id = resultado.insertId;
            return new Promise((resolve) => {
                resolve(estoque);
            });
        }
        catch (err) {
            console.error('Erro ao inserir no estoque:', err);
            throw err;
        }
    }
    async findAll() {
        const query = "SELECT * FROM biblioteca.Estoque";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            return new Promise((resolve) => {
                resolve(resultado);
            });
        }
        catch (err) {
            console.error(`Falha ao listar o estoque gerando o erro: ${err}`);
            throw err;
        }
    }
    async findById(id) {
        const query = "SELECT * FROM biblioteca.Estoque WHERE id = ?";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
            console.log('Estoque localizado com sucesso, ID: ', resultado);
            return new Promise((resolve) => {
                resolve(resultado);
            });
        }
        catch (err) {
            console.error(`Falha ao procurar o estoque de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }
    async updateEstoque(estoque) {
        const query = "UPDATE biblioteca.Estoque SET livro_isbn = ?, quantidade = ?, quantidade_emprestada = ?, disponivel = ? WHERE id = ?;";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [estoque.livro_isbn, estoque.quantidade, estoque.quantidade_emprestada, estoque.disponivel, estoque.id]);
            console.log('Estoque atualizado com sucesso, ID: ', resultado);
            return new Promise((resolve) => {
                resolve(resultado);
            });
        }
        catch (err) {
            console.error(`Erro ao atualizar o estoque de ID ${estoque.id} gerando o erro: ${err}`);
            throw err;
        }
    }
    async removeById(id) {
        const query = "DELETE FROM biblioteca.Estoque where id = ?;";
        try {
            await (0, mysql_1.executarComandoSQL)(query, [id]);
            console.log(`Estoque ID ${id} removido com sucesso.`);
        }
        catch (err) {
            console.error(`Erro ao remover estoque ID ${id}:`, err);
            throw err;
        }
    }
    async Indisponivel(id) {
        const query = "UPDATE biblioteca.estoque SET disponivel = false WHERE id = ?";
        try {
            await (0, mysql_1.executarComandoSQL)(query, [id]);
            console.log(`Estoque ${id} marcado como Indisponível`);
        }
        catch (err) {
            console.error(`Erro ao marcar como indisponível: ${err}`);
        }
    }
    async Disponivel(id) {
        const query = "UPDATE biblioteca.estoque SET disponivel = true WHERE id = ?";
        try {
            await (0, mysql_1.executarComandoSQL)(query, [id]);
            console.log(`Estoque ${id} marcado como Disponível`);
        }
        catch (err) {
            console.error(`Erro ao marcar como disponível: ${err}`);
        }
    }
}
exports.EstoqueRepository = EstoqueRepository;
