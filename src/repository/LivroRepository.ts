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
        titulo VARCHAR(255) NOT NULL,
        autor VARCHAR(255) NOT NULL,
        editora VARCHAR(255) NOT NULL,
        edicao VARCHAR(255) NOT NULL,
        isbn DECIMAL(13) NOT NULL,
        categoria_id VARCHAR(255) NOT NULL
        )`;
    
        try{
        const resultado = await executarComandoSQL(query, []);
        console.log('Tabela Livro criado com sucesso', resultado)
        } catch (err){
        console.log('Erro', err)
        }
    }

    async insereLivro(livro: LivroEntity) :Promise<LivroEntity>{
        const query = "INSERT INTO biblioteca.Livro (titulo, autor, editora, edicao, isbn, categoria_id) VALUES (?, ?, ?, ?, ?, ?)";
        
        try {
            const resultado = await executarComandoSQL(query, [livro.titulo, livro.autor, livro.editora, livro.edicao, livro.isbn, livro.categoria_id]);
            console.log('Livro inserido com sucesso, ID: ', resultado.insertId);
            livro.id = resultado.insertId;
            return new Promise<LivroEntity>((resolve)=>{
                resolve(livro);
            })
        } catch (err) {
            console.error('Erro ao inserir o livro:', err);
            throw err;
        }
    }

    async findAll() :Promise<LivroEntity[]>{
        const query = "SELECT * FROM biblioteca.Livro";
        
        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<LivroEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os livros gerando o erro: ${err}`);
            throw err;
        }
    }

    async findByISBN(isbn: number) :Promise<LivroEntity> {
        const query = "SELECT * FROM biblioteca.Livro WHERE isbn = ?";
        
        try {
            const resultado = await executarComandoSQL(query, [isbn]);
            console.log('Livro localizado com sucesso, ISBN: ', resultado);
            return new Promise<LivroEntity>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o produto de ISBN ${isbn} gerando o erro: ${err}`);
            throw err;
        }
    }

    async updateLivro(livro: LivroEntity) :Promise<LivroEntity> {
        const query = "UPDATE biblioteca.Livro SET titulo = ?, autor = ?, editora = ?, edicao = ?, categoria_id = ? WHERE isbn = ?;" ;
        
            try {
                const resultado = await executarComandoSQL(query, [livro.titulo, livro.autor, livro.editora, livro.edicao, livro.categoria_id, livro.isbn]);
                console.log('Livro atualizado com sucesso, ID: ', resultado);
                return new Promise<LivroEntity>((resolve)=>{
                    resolve(resultado);
                })
            } catch (err:any) {
                console.error(`Erro ao atualizar o livro de ID ${livro.isbn} gerando o erro: ${err}`);
                throw err;
            }
    }
    async removeByISBN(livro: LivroEntity) :Promise<LivroEntity> {
        const query = "DELETE FROM biblioteca.Livro where isbn = ?;" ;
        
        try {
            const resultado = await executarComandoSQL(query, [livro.isbn]);
            console.log('Livro deletado com sucesso: ', livro);
            return new Promise<LivroEntity>((resolve)=>{
                resolve(livro);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o livro de ISBN ${livro.isbn} gerando o erro: ${err}`);
            throw err;
        }
    }
}