import { Product } from "../model/Product"
import { ProductRepository } from "../repository/ProductRepository"

export class ProductService{
    private productRepository = ProductRepository.getInstance()
}