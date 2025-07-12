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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const ProductService_1 = require("../service/ProductService");
const tsoa_1 = require("tsoa");
const ProductRequestDto_1 = require("../model/dto/ProductRequestDto");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const ProductDto_1 = require("../model/dto/ProductDto");
let ProductController = class ProductController extends tsoa_1.Controller {
    productService = new ProductService_1.ProductService();
    async cadastrarProduto(dto, fail, success) {
        try {
            const product = await this.productService.cadastrarProduto(dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Produto criado com sucesso!", product));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async atualizarProduto(dto, notFound, success) {
        try {
            const product = await this.productService.atualizarProduto(dto);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Produto atualizado com sucesso!", product));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async deletarProduto(dto, notFound, success) {
        try {
            const product = await this.productService.deletarProduto(dto);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Produto deletado com sucesso!", product));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async filtrarProdutoPorId(id, notFound, success) {
        try {
            const product = await this.productService.filtrarProdutoById(id);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Produto encontrado!", product));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async filtrarProdutoPorNome(name, notFound, success) {
        try {
            const products = await this.productService.filtrarProdutoByName(name);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Produto encontrado!", products));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async listarTodosProduto(notFound, success) {
        try {
            const products = await this.productService.listarTodosProdutos();
            return success(200, new BasicResponseDto_1.BasicResponseDto("Produtos listados com sucesso!", products));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof ProductRequestDto_1.ProductRequestDto !== "undefined" && ProductRequestDto_1.ProductRequestDto) === "function" ? _a : Object, Function, Function]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "cadastrarProduto", null);
__decorate([
    (0, tsoa_1.Put)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof ProductDto_1.ProductDto !== "undefined" && ProductDto_1.ProductDto) === "function" ? _b : Object, Function, Function]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "atualizarProduto", null);
__decorate([
    (0, tsoa_1.Delete)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof ProductDto_1.ProductDto !== "undefined" && ProductDto_1.ProductDto) === "function" ? _c : Object, Function, Function]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deletarProduto", null);
__decorate([
    (0, tsoa_1.Get)("id/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "filtrarProdutoPorId", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "filtrarProdutoPorNome", null);
__decorate([
    (0, tsoa_1.Get)("all"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "listarTodosProduto", null);
exports.ProductController = ProductController = __decorate([
    (0, tsoa_1.Route)("product"),
    (0, tsoa_1.Tags)("Product")
], ProductController);
