"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioEntity = void 0;
class UsuarioEntity {
    id;
    nome;
    cpf;
    status;
    categoria_id;
    curso_id;
    constructor(id, nome, cpf, status, categoria_id, curso_id) {
        this.id = id || 0;
        this.nome = nome || '';
        this.cpf = cpf || '';
        this.status = "Ativo";
        this.categoria_id = categoria_id || '';
        this.curso_id = curso_id || '';
    }
}
exports.UsuarioEntity = UsuarioEntity;
