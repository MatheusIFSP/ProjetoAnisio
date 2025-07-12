"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueController = void 0;
const EstoqueService_1 = require("../service/EstoqueService");
const tsoa_1 = require("tsoa");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const EstoqueDto_1 = require("../model/dto/EstoqueDto");
let EstoqueController = class EstoqueController extends tsoa_1.Controller {
    estoqueService = new EstoqueService_1.EstoqueService();
    async criarEstoque(dto, success, fail) {
        try {
            const estoque = this.estoqueService.criarEstoque(dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Estoque criado com sucesso", estoque));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, null));
        }
    }
    async listarEstoques(notFound, success) {
        try {
            const estoque = await this.estoqueService.listarEstoque();
            return success(200, new BasicResponseDto_1.BasicResponseDto("Estoques listados com sucesso", estoque));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, null));
        }
    }
    async buscarPorId(id, success, notFound) {
        try {
            const estoque = await this.estoqueService.buscarEstoqueById(id);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Estoque achado com sucesso", estoque));
        }
        catch (error) {
            return notFound(404, new BasicResponseDto_1.BasicResponseDto(error.message, null));
        }
    }
    async atualizarEstoque(dto, success, notFound) {
        try {
            const estoque = await this.estoqueService.atualizarEstoque(dto);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Estoque atualizado com sucesso", estoque));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, null));
        }
    }
    async removerEstoque(id, success, notFound) {
        try {
            const estoque = await this.estoqueService.removerEstoque(id);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Estoque removido com sucesso", estoque));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
};
exports.EstoqueController = EstoqueController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EstoqueDto_1.EstoqueEntityDto, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "criarEstoque", null);
__decorate([
    (0, tsoa_1.Get)("all"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "listarEstoques", null);
__decorate([
    (0, tsoa_1.Get)("id/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "buscarPorId", null);
__decorate([
    (0, tsoa_1.Put)("id/{id}"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EstoqueDto_1.EstoqueEntityDto, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "atualizarEstoque", null);
__decorate([
    (0, tsoa_1.Delete)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "removerEstoque", null);
exports.EstoqueController = EstoqueController = __decorate([
    (0, tsoa_1.Route)("estoque"),
    (0, tsoa_1.Tags)("Estoque")
], EstoqueController);
