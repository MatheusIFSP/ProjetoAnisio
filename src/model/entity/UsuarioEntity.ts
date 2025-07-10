export class UsuarioEntity {
    id: number
    nome: string
    cpf: string
    status: 'Ativo' | 'Inativo' | 'Suspenso'
    categoria_id: string
    curso_id: string

    constructor(id?: number, nome?: string, cpf?: string, status?: string, categoria_id?: string, curso_id?: string){
        this.id = id || 0
        this.nome = nome || ''
        this.cpf = cpf || ''
        this.status = "Ativo"
        this.categoria_id = categoria_id || ''
        this.curso_id = curso_id || ''
    }
}