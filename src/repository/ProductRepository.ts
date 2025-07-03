import { executarComandoSQL } from "../database/mysql";
import { Product } from "../model/Product"

export class ProductRepository{
    private static instance: ProductRepository;

    private constructor(){}

    static getInstance(){
        if(!this.instance){
            this.instance = new ProductRepository()
        }
        return this.instance
    }

imprimeResult(err:any, result: any) {
    if(result != undefined) {
        console.log("Dentro callback", result);
    }
}

createTable() {
    try {
        const resultado = executarComandoSQL("CREATE TABLE Vendas.Product (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR (255) NOT NULL, price DECIMAL (10,2) NOT NULL)", 
            [], this.imprimeResult);
        console.log('Query executada com sucesso:', resultado);
    } catch (err) {
        console.error('Erro ao executar a query:', err);
    }
}

insertProduct(name: string, price: number) {
    try {
        const resultado = executarComandoSQL(
            "INSERT INTO vendas.Product (name, price) VALUES (?, ?)",
            [name, price], this.imprimeResult
        );
        console.log('Produto inserindo com sucesso:', resultado);
    } catch (err) {
        console.error('Erro ao inserir o produto:', err);
        if( err instanceof Error)
            throw err
    }
}

deleteProduct(id: number) {
    try {
        const deletar = executarComandoSQL(
            "DELETE FROM vendas.Product WHERE id = ?",
            [id], this.imprimeResult
        );
        console.log('Produto deletado com sucesso:', deletar);
    } catch (err) {
        console.error('Erro ao inserir o produto:', err);
    }
}

updateProduct(id: number) {
    try {
        const atualizar = executarComandoSQL(
            "UPDATE vendas.product SET (name, price) VALUES (?, ?) WHERE id = ?",
            [id], this.imprimeResult
        );
        console.log('Produto deletado com sucesso:', atualizar);
    }catch (err) {
        console.error('Erro ao atualizar o produto:', err);
    }
}
}