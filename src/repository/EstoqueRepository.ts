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
        codigo
        livro_isbn
        disponível
        )`;
    
        try{
        const resultado = await executarComandoSQL(query, []);
        console.log('Tabela Usuário criado com sucesso', resultado)
        } catch (err){
        console.log('Erro', err)
        }
    }

    criarExemplar(exemplar: EstoqueEntity){
        this.estoqueList.push(exemplar)
        return exemplar
    }
    
    insereEstoque(estoque: EstoqueEntity) {
        this.estoqueList.push(estoque)
        return estoque
    }

    findAll() {
        return this.estoqueList
    }

    findByCod(codigo: string) {
        const exemplar = this.estoqueList.find(e => e.codigo === codigo)
        if (!exemplar) {
            throw new Error ("Exemplar não encontrado")
        }
        return exemplar
    }

    findById(id: number) {
        const index = this.findIndex(id)
        return this.estoqueList[index]
    }

    updateById(id: number, dados: Partial<EstoqueEntity>) {
            const index = this.findIndex(id)
            Object.assign(this.estoqueList[index], dados)
            return this.estoqueList[index]
    }

    removeById(id: number) {
        const index = this.findIndex(id)
        this.estoqueList.splice(index, 1)
    }

    Indisponivel(id: number) {
        const index = this.findIndex(id)
        this.estoqueList[index].disponivel = false
    }

    Disponivel(id: number) {
        const index = this.findIndex(id)
        this.estoqueList[index].disponivel = true
    }
    
    private findIndex( id: number):number {
        const index = this.estoqueList.findIndex( es => es.id == id)
        if(index == -1){
            throw new Error("ID informado não foi encontrado")
        }
        return index
    }
}