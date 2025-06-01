export class UsuarioEntity {
    id: number
    nome: string
    cpf: string
    ativo: boolean
    categoria_id: number
    curso_id: number

    constructor(
        id: number | undefined,
        nome: string,
        cpf: string,
        ativo: boolean,
        categoria_id: number,
        curso_id: number
    ){
        this.id = id ?? this.gerarId()
        this.nome = nome
        this.cpf = cpf
        this.ativo = ativo
        this.categoria_id = categoria_id
        this.curso_id = curso_id
    }

    private gerarId(): number{
        return parseInt((Date.now() /100).toString(),10)
    }
}