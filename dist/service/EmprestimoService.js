"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoService = void 0;
const EmprestimoEntity_1 = require("../model/entity/EmprestimoEntity");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const CursosRepository_1 = require("../repository/CursosRepository");
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
class EmprestimoService {
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    cursosRepository = CursosRepository_1.CursosRepository.getInstance();
    categoriaLivroRepository = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
    categoriaUsuarioRepository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    async criarEmprestimo(dto) {
        const { usuario_id, estoque_id } = dto;
        await this.verificarAtrasos(usuario_id);
        const usuario = await this.usuarioRepository.findById(usuario_id);
        if (usuario.status !== "Ativo") {
            throw new Error("Usuário não pode realizar empréstimo. Status: " + usuario.status);
        }
        await this.limiteEmprestimos(usuario.id, usuario.categoria_id);
        const exemplar = await this.estoqueRepository.findById(estoque_id);
        if (!exemplar.disponivel) {
            throw new Error("Exemplar não disponível para empréstimo");
        }
        exemplar.disponivel = false;
        await this.estoqueRepository.updateEstoque(exemplar);
        const hoje = new Date();
        const data_devolucao = await this.definirDataDevolucao(usuario.categoria_id, exemplar, usuario.curso_id);
        const emprestimo = new EmprestimoEntity_1.EmprestimoEntity();
        emprestimo.usuario_id = usuario_id;
        emprestimo.estoque_id = estoque_id;
        emprestimo.data_emprestimo = hoje;
        emprestimo.data_devolucao = data_devolucao;
        emprestimo.data_entrega = new Date(0);
        emprestimo.dias_atraso = 0;
        emprestimo.suspensao_ate = new Date(0);
        return await this.emprestimoRepository.insereEmprestimo(emprestimo);
    }
    async listarEmprestimo() {
        return await this.emprestimoRepository.findAll();
    }
    async buscarPorId(id) {
        return await this.emprestimoRepository.findById(id);
    }
    async devolverEmprestimo(emprestimoId, dataEntrega) {
        const emprestimo = await this.emprestimoRepository.findById(emprestimoId);
        emprestimo.data_entrega = dataEntrega;
        const diasAtraso = this.calcularDiasAtraso(emprestimo);
        emprestimo.dias_atraso = diasAtraso;
        const usuario = await this.usuarioRepository.findById(emprestimo.usuario_id);
        if (diasAtraso > 0) {
            const suspensao = new Date(dataEntrega);
            suspensao.setDate(suspensao.getDate() + diasAtraso * 3);
            emprestimo.suspensao_ate = suspensao;
            usuario.status = "Suspenso";
        }
        else {
            const emprestimos = await this.emprestimoRepository.findAll();
            const atrasados = emprestimos.filter(e => e.usuario_id === usuario.id && e.dias_atraso > 0);
            if (atrasados.length > 2) {
                usuario.status = "Inativo";
            }
        }
        await this.usuarioRepository.updateUsuario(usuario);
        const exemplar = await this.estoqueRepository.findById(emprestimo.estoque_id);
        exemplar.disponivel = true;
        await this.estoqueRepository.updateEstoque(exemplar);
        return await this.emprestimoRepository.updateEmprestimo(emprestimo);
    }
    calcularDiasAtraso(emprestimo) {
        if (!emprestimo.data_entrega || !emprestimo.data_devolucao)
            return 0;
        const entrega = new Date(emprestimo.data_entrega).getTime();
        const devolucao = new Date(emprestimo.data_devolucao).getTime();
        const diff = entrega - devolucao;
        return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
    }
    async verificarAtrasos(id) {
        const hoje = new Date();
        const emprestimos = await this.emprestimoRepository.findAll();
        const emprestimosUsuario = emprestimos.filter(e => e.usuario_id === id);
        for (const emprestimo of emprestimosUsuario) {
            const atrasado = !emprestimo.data_entrega || new Date(emprestimo.data_entrega).getTime() === 0;
            const vencido = hoje > new Date(emprestimo.data_devolucao);
            if (atrasado && vencido) {
                emprestimo.data_entrega = hoje;
                emprestimo.dias_atraso = this.calcularDiasAtraso(emprestimo);
                const suspensao = new Date();
                suspensao.setDate(suspensao.getDate() + emprestimo.dias_atraso * 3);
                emprestimo.suspensao_ate = suspensao;
                const usuario = await this.usuarioRepository.findById(emprestimo.usuario_id);
                usuario.status = "Suspenso";
                await this.usuarioRepository.updateUsuario(usuario);
                await this.emprestimoRepository.updateEmprestimo(emprestimo);
            }
        }
    }
    async limiteEmprestimos(id, categoriaUsuario) {
        const emprestimos = await this.emprestimoRepository.findAll();
        const ativos = emprestimos.filter(e => e.usuario_id === id && (!e.data_entrega || new Date(e.data_entrega).getTime() === 0));
        const limite = categoriaUsuario === "Professor" ? 5 : 3;
        if (ativos.length >= limite) {
            throw new Error(`Usuário já atingiu o limite de ${limite} empréstimos`);
        }
    }
    async definirDataDevolucao(categoriaUsuario, exemplar, curso) {
        const hoje = new Date();
        let dias = 15;
        if (categoriaUsuario === "Professor") {
            dias = 40;
        }
        else if (categoriaUsuario === "Aluno") {
            if (curso && exemplar.categoria === curso) {
                dias = 30;
            }
        }
        else {
            throw new Error("Tipo de usuário não reconhecido");
        }
        const data_devolucao = new Date();
        data_devolucao.setDate(hoje.getDate() + dias);
        return data_devolucao;
    }
}
exports.EmprestimoService = EmprestimoService;
