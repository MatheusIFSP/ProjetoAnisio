"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueEntityDto = void 0;
class EstoqueEntityDto {
    livro_isbn;
    quantidade;
    quantidade_emprestada;
    disponivel;
    constructor(livro_isbn, quantidade, quantidade_emprestada) {
        this.livro_isbn = livro_isbn;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada || 0;
        this.disponivel = 'disponível';
    }
}
exports.EstoqueEntityDto = EstoqueEntityDto;
