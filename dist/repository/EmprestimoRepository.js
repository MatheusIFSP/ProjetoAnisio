"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoRepository = void 0;
const mysql_1 = require("../database/mysql");
class EmprestimoRepository {
    static instance;
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return EmprestimoRepository.instance;
    }
    async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Emprestimo(
        id INT AUTO_INCREMENT PRIMARY KEY,
        usuario_id DECIMAL(11) NOT NULL,
        estoque_id DECIMAL(11) NOT NULL,
        data_emprestimo DATE NOT NULL,
        data_devolucao DATE NOT NULL,
        data_entrega DATE NOT NULL,
        dias_atraso DECIMAL (10) NOT NULL,
        suspensao_ate DATE NOT NULL
        )`;
    }
    async insereEmprestimo(emprestimo) {
        const query = "INSERT INTO biblioteca.Emprestimo (usuario_id, estoque_id, data_emprestimo, data_devolucao, data_entrega, dias_atraso, suspensao_ate) VALUES (?, ?, ?, ?, ?, ?, ?)";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [emprestimo.usuario_id, emprestimo.estoque_id, emprestimo.data_emprestimo, emprestimo.data_devolucao, emprestimo.data_entrega, emprestimo.dias_atraso, emprestimo.suspensao_ate]);
            console.log('Empréstimo inserido com sucesso, ID: ', resultado.insertId);
            emprestimo.id = resultado.insertId;
            return new Promise((resolve) => {
                resolve(emprestimo);
            });
        }
        catch (err) {
            console.error('Erro ao inserir no empréstimo:', err);
            throw err;
        }
    }
    async findAll() {
        const query = "SELECT * FROM biblioteca.Emprestimo";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            return new Promise((resolve) => {
                resolve(resultado);
            });
        }
        catch (err) {
            console.error(`Falha ao listar o empréstimo gerando o erro: ${err}`);
            throw err;
        }
    }
    async findById(id) {
        const query = "SELECT * FROM biblioteca.Emprestimo WHERE id = ?";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
            console.log('Empréstimo localizado com sucesso, ID: ', resultado);
            return new Promise((resolve) => {
                resolve(resultado);
            });
        }
        catch (err) {
            console.error(`Falha ao procurar o empréstimo de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }
    async updateEmprestimo(emprestimo) {
        const query = "UPDATE biblioteca.Emprestimo SET usuario_id = ?, estoque_id = ?, data_emprestimo = ?, data_devolucao = ?, data_entrega = ?, dias_atraso = ?, suspensao_ate = ? WHERE id = ?;";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [emprestimo.usuario_id, emprestimo.estoque_id, emprestimo.data_emprestimo, emprestimo.data_devolucao, emprestimo.data_entrega, emprestimo.dias_atraso, emprestimo.suspensao_ate, emprestimo.id]);
            console.log('Emprestimo atualizado com sucesso, ID: ', resultado);
            return new Promise((resolve) => {
                resolve(resultado);
            });
        }
        catch (err) {
            console.error(`Erro ao atualizar o emprestimo de ID ${emprestimo.id} gerando o erro: ${err}`);
            throw err;
        }
    }
    async deleteById(id) {
        const query = "DELETE FROM biblioteca.Emprestimo where id = ?;";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
            console.log('Empréstimo deletado com sucesso: ', id);
        }
        catch (err) {
            console.error(`Falha ao deletar o empréstimo de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }
}
exports.EmprestimoRepository = EmprestimoRepository;
