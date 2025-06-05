import { EmprestimoEntity } from "../model/EmprestimoEntity"

export class EmprestimoRepository{
    private static instance: EmprestimoRepository
    private emprestimoList: EmprestimoEntity[] = []

   constructor(){}
   
   static getInstance(): EmprestimoRepository{
        if( !this.instance ){
            this.instance = new EmprestimoRepository()
        }
        return EmprestimoRepository.instance
    }

    insereEmprestimo(emprestimo: EmprestimoEntity) {
            this.emprestimoList.push(emprestimo)
            return emprestimo
    }
    
    findAll() {
        return this.emprestimoList
    }

    findById( id:number): EmprestimoEntity{
        const index = this.findIndex(id)
        return this.emprestimoList[index]
    }

    updateById(id: number, dados: Partial<EmprestimoEntity>) {
                const index = this.findIndex(id)
                Object.assign(this.emprestimoList[index], dados)
                return this.emprestimoList[index]
    }

    findByUsuarioId(usuarioId: number) {
        return this.emprestimoList.filter(e => e.usuario_id === usuarioId)
    }

    private findIndex( id: number): number{
        const index = this.emprestimoList.findIndex(e => e.id == id)
        if(index == -1){
            throw new Error("ID informado não foi encontrado")
        }
        return index
    } 
}