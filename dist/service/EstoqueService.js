"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const EstoqueEntity_1 = require("../model/entity/EstoqueEntity");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
class EstoqueService {
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    async criarEstoque(estoqueData) {
        const { livro_isbn, quantidade, quantidade_emprestada, disponivel } = estoqueData;
        const estoque = new EstoqueEntity_1.EstoqueEntity(undefined, livro_isbn, quantidade, quantidade_emprestada, disponivel);
        const novoEstoque = await this.estoqueRepository.insereEstoque(estoque);
        console.log("Service - Insert", novoEstoque);
        return novoEstoque;
    }
    async listarEstoque() {
        const estoque = await this.estoqueRepository.findAll();
        console.log("Service - Filtrar Todos", estoque);
        return estoque;
    }
    async buscarEstoqueById(id) {
        const estoque = await this.estoqueRepository.findById(parseInt(id));
        console.log("Service - Buscar", estoque);
        return estoque;
    }
    async atualizarEstoque(estoqueData) {
        const { id, livro_isbn, quantidade, quantidade_emprestada, disponivel } = estoqueData;
        const estoque = new EstoqueEntity_1.EstoqueEntity(id, livro_isbn, quantidade, quantidade_emprestada, disponivel);
        await this.estoqueRepository.updateEstoque(estoque);
        console.log("Service - Update ", estoque);
        return estoque;
    }
    async removerEstoque(estoqueData) {
        const { id, livro_isbn, quantidade, quantidade_emprestada, disponivel } = estoqueData;
        const estoque = new EstoqueEntity_1.EstoqueEntity(id, livro_isbn, quantidade, quantidade_emprestada, disponivel);
        await this.estoqueRepository.removeById(id);
        console.log("Service - Delete ", estoque);
        return estoque;
    }
    async marcarIndisponivel(id) {
        const estoque = await this.estoqueRepository.findById(id);
        estoque.disponivel = false;
        const atualizado = await this.estoqueRepository.updateEstoque(estoque);
        console.log("Estoque marcado como indisponível:", atualizado);
        return atualizado;
    }
    async marcarDisponivel(id) {
        const estoque = await this.estoqueRepository.findById(id);
        estoque.disponivel = true;
        const atualizado = await this.estoqueRepository.updateEstoque(estoque);
        console.log("Estoque marcado como disponível:", atualizado);
        return atualizado;
    }
}
exports.EstoqueService = EstoqueService;
