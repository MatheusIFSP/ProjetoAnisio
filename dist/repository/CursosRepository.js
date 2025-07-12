"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursosRepository = void 0;
const CursosEntity_1 = require("../model/entity/CursosEntity");
const mysql_1 = require("../database/mysql");
class CursosRepository {
    static instance;
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CursosRepository();
        }
        return CursosRepository.instance;
    }
    async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Cursos(
        id AUTO_INCREMENT PRIMARY KEY,
        categoria VARCHAR(100) NOT NULL
        )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela Cursos criado com sucesso', resultado);
        }
        catch (err) {
            console.log('Erro', err);
        }
    }
    async insereCursos() {
        const categoria = ["ADS", "Pedagogia", "Administração"];
        await (0, mysql_1.executarComandoSQL)("CREATE TABLE IF NOT EXISTS biblioteca.Cursos(id INT AUTO_INCREMENT PRIMARY KEY, categoria VARCHAR(100) NOT NULL)", []);
        for (const cursos of categoria) {
            try {
                const resultado = await (0, mysql_1.executarComandoSQL)("INSERT IGNORE INTO biblioteca.Cursos (categoria) values (?)", [cursos]);
                console.log('Categoria criada com sucesso!', resultado);
            }
            catch (err) {
                console.error(`Erro ao inserir categoria ${cursos}:`, err);
            }
        }
    }
    async findAll() {
        const resultado = await (0, mysql_1.executarComandoSQL)(`SELECT categoria FROM biblioteca.Cursos`, []);
        return resultado.map((row) => row.categoria);
    }
    async findCursos(categoria) {
        const query = `SELECT * FROM biblioteca.Cursos WHERE categoria = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [categoria]);
        if (resultado && resultado.length > 0) {
            const row = resultado[0];
            return new CursosEntity_1.CursosEntity(row.id, row.categoria);
        }
        return null;
    }
}
exports.CursosRepository = CursosRepository;
