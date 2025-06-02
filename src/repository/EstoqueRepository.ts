import { EstoqueEntity } from "../model/EstoqueEntity";

export class EstoqueRepository{
    private static instance: EstoqueRepository
    private estoqueList: EstoqueEntity[] = []

    constructor(){}

    static getInstance(): EstoqueRepository{
        if( !this.instance ){
            this.instance = new EstoqueRepository()
        }
        return EstoqueRepository.instance
    }
    insereEstoque(estoque: EstoqueEntity){
        this.estoqueList.push(estoque);
        return estoque;
    }
    findAll(){
        return this.estoqueList;
    }
    findById(id: number){
        const index = this.findIndex(id);
        return this.estoqueList[index];
    }
    updateById(id: number, dados: Partial<EstoqueEntity>) {
            const index = this.findIndex(id);
            Object.assign(this.estoqueList[index], dados);
            return this.estoqueList[index];
    }
    removeById(id: number) {
        const index = this.findIndex(id);
        this.estoqueList.splice(index, 1);
    }
    
    private findIndex( id: number):number{
        const index = this.estoqueList.findIndex( l => l.id == id)
        if(index == -1){
            throw new Error("ID informado não foi encontrado")
        }
        return index
    }
}