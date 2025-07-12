"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const UsuarioEntity_1 = require("../model/entity/UsuarioEntity");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
const CursosRepository_1 = require("../repository/CursosRepository");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
class UsuarioService {
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    categoriaUsuarioRepository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    cursosRepository = CursosRepository_1.CursosRepository.getInstance();
    async criarUsuario(data) {
        const { nome, cpf, status, categoria_id, curso_id } = data;
        if (!this.validarCPF(cpf)) {
            throw new Error("CPF inválido");
        }
        await this.verificarCPFduplicado(cpf);
        this.validarCategoriaECurso(categoria_id, curso_id);
        const usuario = new UsuarioEntity_1.UsuarioEntity(nome, cpf, status, categoria_id, curso_id);
        const novoUsuario = await this.usuarioRepository.insereUsuario(usuario);
        console.log("Service - Criar", novoUsuario);
        return novoUsuario;
    }
    async atualizarUsuario(Usuariodata) {
        const { id, nome, cpf, status, categoria_id, curso_id } = Usuariodata;
        this.validarCategoriaECurso(categoria_id, curso_id);
        const usuario = new UsuarioEntity_1.UsuarioEntity(id, nome, cpf, status, categoria_id, curso_id);
        await this.usuarioRepository.updateUsuario(id);
        console.log("Service - Atualizar", usuario);
        return usuario;
    }
    async deletarUsuario(Usuariodata) {
        const { id, nome, cpf, status, categoria_id, curso_id } = Usuariodata;
        const usuario = new UsuarioEntity_1.UsuarioEntity(id, nome, cpf, status, categoria_id, curso_id);
        await this.usuarioRepository.removeById(id);
        console.log("Service - Delete ", usuario);
        return usuario;
    }
    async buscarUsuarioById(id) {
        const usuario = await this.usuarioRepository.findById(parseInt(id));
        console.log("Service - Buscar", usuario);
        return usuario;
    }
    async listarUsuarios() {
        const usuarios = await this.usuarioRepository.findAll();
        console.log("Service - Listar Todos", usuarios);
        return usuarios;
    }
    async validarCPF(cpf) {
        if (typeof cpf !== 'string')
            throw new Error("Permitido apenas números");
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/))
            throw new Error("Necessário ter 11 dígitos e/ou proibido números repetidos");
        let cpfList = cpf.split('').map(el => +el);
        const rest = (count) => {
            const soma = cpfList.slice(0, count - 1)
                .reduce((soma, el, index) => soma + el * (count - index), 0);
            return (soma * 10) % 11 % 10;
        };
        return rest(10) === cpfList[9] && rest(11) === cpfList[10];
    }
    async validarCategoriaECurso(categoria_id, curso_id) {
        const categoria = await this.categoriaUsuarioRepository.encontrarCursos(categoria_id);
        if (!categoria) {
            throw new Error("Categoria de usuário inválida ou inexistente");
        }
        const curso = await this.cursosRepository.findCursos(curso_id);
        if (!curso) {
            throw new Error("Curso inválido ou inexistente");
        }
    }
    async verificarCPFduplicado(cpf) {
        const usuarios = await this.usuarioRepository.findAll();
        const existe = usuarios.some(u => u.cpf === cpf);
        if (existe) {
            throw new Error("CPF já cadastrado");
        }
    }
}
exports.UsuarioService = UsuarioService;
