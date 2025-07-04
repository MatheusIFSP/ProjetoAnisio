import { Request, Response } from "express";
import { ProductService } from "../service/ProductService";
import { Product } from "../model/Product";

export class ProductController{
    private productService = new ProductService()

    async cadastrarProduto(req: Request, res: Response){
        try{
            const newProduct = await this.productService.createProduct(req.body)
            res.status(201).json(newProduct)
        }catch(err){
            const message = err instanceof Error ? err.message : 'Erro ao criar o produto'
            res.status(400).json(
                {
                    message: message,
                }
            )
        }
    }
}