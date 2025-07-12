"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioRepository = void 0;
const CategoriaUsuario_1 = require("../model/entity/CategoriaUsuario");
const mysql_1 = require("../database/mysql");
class CategoriaUsuarioRepository {
    static instance;
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository();
        }
        return CategoriaUsuarioRepository.instance;
    }
    async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.CategoriaUsuario(
        id AUTO_INCREMENT PRIMARY KEY,
        categoria VARCHAR(100) NOT NULL
        )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela CategoriaUsuario criado com sucesso', resultado);
        }
        catch (err) {
            console.log('Erro', err);
        }
    }
    async insereCategoriaUsuario() {
        const categoria = ["Aluno", "Professor", "Bibliotecário"];
        await (0, mysql_1.executarComandoSQL)("CREATE TABLE IF NOT EXISTS biblioteca.CategoriaUsuario(id INT AUTO_INCREMENT PRIMARY KEY, categoria VARCHAR(100) NOT NULL)", []);
        for (const categorias of categoria) {
            try {
                const resultado = await (0, mysql_1.executarComandoSQL)("INSERT IGNORE INTO biblioteca.CategoriaUsuario (categoria) values (?)", [categorias]);
                console.log('Categoria criada com sucesso!', resultado);
            }
            catch (err) {
                console.error(`Erro ao inserir categoria ${categorias}:`, err);
            }
        }
    }
    async findAll() {
        const resultado = await (0, mysql_1.executarComandoSQL)(`SELECT categoria FROM biblioteca.CategoriaUsuario`, []);
        return resultado.map((row) => row.categoria);
    }
    async encontrarCursos(categoria) {
        const query = `SELECT * FROM biblioteca.CategoriaUsuario WHERE categoria = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [categoria]);
        if (resultado && resultado.length > 0) {
            const row = resultado[0];
            return new CategoriaUsuario_1.CategoriaUsuario(row.id, row.categoria);
        }
        return null;
    }
}
exports.CategoriaUsuarioRepository = CategoriaUsuarioRepository;
