"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueEntity = void 0;
class EstoqueEntity {
    id;
    livro_isbn;
    quantidade;
    quantidade_emprestada;
    disponivel;
    constructor(id, livro_isbn, quantidade, quantidade_emprestada, disponivel) {
        this.id = id || 0;
        this.livro_isbn = livro_isbn || 0;
        this.quantidade = quantidade || 0;
        this.quantidade_emprestada = quantidade_emprestada || 0;
        this.disponivel = true;
    }
}
exports.EstoqueEntity = EstoqueEntity;
