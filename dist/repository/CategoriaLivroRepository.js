"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroRepository = void 0;
const CategoriaLivro_1 = require("../model/entity/CategoriaLivro");
const mysql_1 = require("../database/mysql");
class CategoriaLivroRepository {
    static instance;
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaLivroRepository();
        }
        return CategoriaLivroRepository.instance;
    }
    async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.CategoriaLivro(
        id AUTO_INCREMENT PRIMARY KEY,
        categoria VARCHAR(100) NOT NULL
        )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela CategoriaLivro criado com sucesso', resultado);
        }
        catch (err) {
            console.log('Erro', err);
        }
    }
    async insereCategoriaLivro() {
        const categoria = ["Romance", "Computação", "Letras", "Gestão"];
        await (0, mysql_1.executarComandoSQL)("CREATE TABLE IF NOT EXISTS biblioteca.CategoriaLivro(id INT AUTO_INCREMENT PRIMARY KEY, categoria VARCHAR(100) NOT NULL)", []);
        for (const categorias of categoria) {
            try {
                const resultado = await (0, mysql_1.executarComandoSQL)("INSERT IGNORE INTO biblioteca.CategoriaLivro (categoria) values (?)", [categorias]);
                console.log('Categoria criada com sucesso!', resultado);
            }
            catch (err) {
                console.error(`Erro ao inserir categoria ${categorias}:`, err);
            }
        }
    }
    async findAll() {
        const resultado = await (0, mysql_1.executarComandoSQL)(`SELECT categoria FROM biblioteca.CategoriaLivro`, []);
        return resultado.map((row) => row.categoria);
    }
    async findCategoriaLivro(categoria) {
        const query = `SELECT * FROM biblioteca.CategoriaLivro WHERE categoria = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [categoria]);
        if (resultado && resultado.length > 0) {
            const row = resultado[0];
            return new CategoriaLivro_1.CategoriaLivro(row.id, row.categoria);
        }
        return null;
    }
}
exports.CategoriaLivroRepository = CategoriaLivroRepository;
