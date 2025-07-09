import { EstoqueEntity } from "../model/entity/EstoqueEntity"
import { executarComandoSQL } from "../database/mysql"

export class EstoqueRepository{
    private static instance: EstoqueRepository

    constructor(){
        this.createTable();
    }

    static getInstance(): EstoqueRepository{
        if( !this.instance ){
            this.instance = new EstoqueRepository()
        }
        return EstoqueRepository.instance
    }

    private async createTable(){
        const query = `
        CREATE TABLE IF NOT EXIST biblioteca.Estoque (
        id INT AUTO_INCREMENT PRIMARY KEY,
        livro_isbn DECIMAL(13) NOT NULL,
        quantidade DECIMAL(10) NOT NULL,
        quantidade_emprestada(10) NOT NULL,
        disponível VARCHAR(15) NOT NULL 
        )`;
    
        try{
        const resultado = await executarComandoSQL(query, []);
        console.log('Tabela Estoque criado com sucesso', resultado)
        } catch (err){
        console.log('Erro', err)
        }
    }
 
    async insereEstoque(estoque: EstoqueEntity) :Promise<EstoqueEntity> {
        const query = "INSERT INTO biblioteca.Estoque (livro_isbn, quantidade, quantidade_emprestada, disponivel) VALUES (?, ?, ?, ?)";
        
        try {
            const resultado = await executarComandoSQL(query, [estoque.livro_isbn, estoque.quantidade, estoque.quantidade_emprestada, estoque.disponivel]);
            console.log('Livro inserido com sucesso, ISBN: ', resultado.insertId);
            estoque.id = resultado.insertId;
            return new Promise<EstoqueEntity>((resolve)=>{
                resolve(estoque);
            })
        } catch (err) {
            console.error('Erro ao inserir no estoque:', err);
            throw err;
        }
    }

    async findAll() :Promise<EstoqueEntity[]> {
        const query = "SELECT * FROM biblioteca.Estoque";
        
        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<EstoqueEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar o estoque gerando o erro: ${err}`);
            throw err;
        }
    }

    async findById(id: number) :Promise<EstoqueEntity> {
        const query = "SELECT * FROM biblioteca.Estoque WHERE id = ?";
        
        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Estoque localizado com sucesso, ID: ', resultado);
            return new Promise<EstoqueEntity>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o produto de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async updateEstoque(estoque: EstoqueEntity) :Promise<EstoqueEntity> {
        const query = "UPDATE biblioteca.Estoque SET livro_isbn = ?, quantidade = ?, quantidade_emprestada = ?, disponivel = ? WHERE id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [estoque.livro_isbn, estoque.quantidade, estoque.quantidade_emprestada, estoque.disponivel, estoque.id]);
            console.log('Estoque atualizado com sucesso, ID: ', resultado);
            return new Promise<EstoqueEntity>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o estoque de ID ${estoque.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async removeById(estoque: EstoqueEntity) :Promise<EstoqueEntity> {
        const query = "DELETE FROM biblioteca.Estoque where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [estoque.id]);
            console.log('Estoque deletado com sucesso: ', estoque);
            return new Promise<EstoqueEntity>((resolve)=>{
                resolve(estoque);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o estoque de ID ${estoque.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    Indisponivel(id: number) {
        const index = this.findIndex(id)
        this.estoqueList[index].disponivel = false
    }

    Disponivel(id: number) {
        const index = this.findIndex(id)
        this.estoqueList[index].disponivel = true
    }
}