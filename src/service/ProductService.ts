import { Product } from "../model/Product"
import { ProductRepository } from "../repository/ProductRepository"

export class ProductService{
    private productRepository = ProductRepository.getInstance()

    createProduct (data: any){
        if(!data.name || !data.price){
            throw new Error('Favor informar os campos obrigatórios')
        }
        this.productRepository.insertProduct(data.name, data.price)
    }
}