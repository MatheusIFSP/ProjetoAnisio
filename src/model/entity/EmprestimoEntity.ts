export class EmprestimoEntity {
    id: number
    usuario_id: number
    estoque_id: number
    data_emprestimo: Date
    data_devolucao: Date
    data_entrega: Date
    dias_atraso: number
    suspensao_ate: Date

    constructor(id?: number, usuario_id?: number, estoque_id?: number, data_emprestimo?: Date, data_devolucao?: Date, data_entrega?: Date, dias_atraso?: number, suspensao_ate?: Date){
        this.id = id || 0
        this.usuario_id = usuario_id || 0
        this.estoque_id = estoque_id || 0
        this.data_emprestimo = data_emprestimo || new Date()
        this.data_devolucao = data_devolucao || new Date()
        this.data_entrega = data_entrega || new Date()
        this.dias_atraso = dias_atraso || 0
        this.suspensao_ate = suspensao_ate || new Date()
    }
}