"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioDto = void 0;
class UsuarioDto {
    nome;
    cpf;
    status;
    categoria_id;
    curso_id;
    constructor(nome, cpf, status, categoria_id, curso_id) {
        this.nome = nome;
        this.cpf = cpf;
        this.status = status;
        this.categoria_id = categoria_id;
        this.curso_id = curso_id;
    }
}
exports.UsuarioDto = UsuarioDto;
