import { LivroEntity } from "../model/entity/LivroEntity"
import { executarComandoSQL } from "../database/mysql"

export class LivroRepository{
    private static instance: LivroRepository

    constructor(){
        this.createTable();
    }

    static getInstance(): LivroRepository{
        if( !this.instance ){
            this.instance = new LivroRepository()
        }
        return LivroRepository.instance
    }

    private async createTable(){
        const query = `
        CREATE TABLE IF NOT EXIST biblioteca.Livro (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        cpf DECIMAL(11) NOT NULL UNIQUE,
        status VARCHAR(20) NOT NULL,
        categoria_id VARCHAR(255) NOT NULL,
        curso_id VARCHAR(255) NOT NULL
        )`;
    
        try{
        const resultado = await executarComandoSQL(query, []);
        console.log('Tabela Usuário criado com sucesso', resultado)
        } catch (err){
        console.log('Erro', err)
        }
    }

    insereLivro(livro: LivroEntity){
        this.livroList.push(livro)
        return livro
    }
    findAll(){
        return this.livroList
    }
    findByISBN(isbn: number) {
        return this.livroList.find(livro => livro.isbn === isbn)
    }
    updateByISBN(isbn: number, dados: Partial<LivroEntity>) {
        const index = this.findIndex(isbn)
        Object.assign(this.livroList[index], dados)
        return this.livroList[index]
    }
    removeByISBN(isbn: number) {
        const index = this.findIndex(isbn)
        this.livroList.splice(index, 1)
    }
    private findIndex( isbn: number):number{
        const index = this.livroList.findIndex( l => l.isbn == isbn)
        if(index == -1){
            throw new Error("ID informado não foi encontrado")
        }
        return index
    }
}