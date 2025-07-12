"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const Product_1 = require("../model/entity/Product");
const ProductRepository_1 = require("../repository/ProductRepository");
class ProductService {
    productRepository = new ProductRepository_1.ProductRepository();
    async cadastrarProduto(produtoData) {
        const { name, price, expirationDate } = produtoData;
        const produto = new Product_1.ProductEntity(undefined, name, price);
        const novoProduto = await this.productRepository.insertProduct(produto);
        console.log("Service - Insert ", novoProduto);
        return novoProduto;
    }
    async atualizarProduto(produtoData) {
        const { id, name, price, expirationDate } = produtoData;
        const produto = new Product_1.ProductEntity(id, name, price);
        await this.productRepository.updateProduct(produto);
        console.log("Service - Update ", produto);
        return produto;
    }
    async deletarProduto(produtoData) {
        const { id, name, price, expirationDate } = produtoData;
        const produto = new Product_1.ProductEntity(id, name, price);
        await this.productRepository.deleteProduct(produto);
        console.log("Service - Delete ", produto);
        return produto;
    }
    async filtrarProdutoById(produtoData) {
        const idNumber = parseInt(produtoData, 10);
        const produto = await this.productRepository.filterProductById(idNumber);
        console.log("Service - Filtrar", produto);
        return produto;
    }
    async filtrarProdutoByName(produtoData) {
        const name = produtoData;
        const produtos = await this.productRepository.filterProductByName(name);
        console.log("Service - Filtrar", produtos);
        return produtos;
    }
    async listarTodosProdutos() {
        const produtos = await this.productRepository.filterAllProduct();
        console.log("Service - Filtrar Todos", produtos);
        return produtos;
    }
}
exports.ProductService = ProductService;
