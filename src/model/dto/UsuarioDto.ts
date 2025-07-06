export class UsuarioDto {
    id: number;
    nome: string;
    cpf: string;
    status: string;
    categoria_id: string;
    curso_id: string;

    constructor(
        id: number | undefined, 
        nome: string, 
        cpf: string, 
        status: string, 
        categoria_id: string, 
        curso_id: string
    ){
        this.id = id ?? this.gerarId()
        this.nome = nome
        this.cpf = cpf
        this.status = status
        this.categoria_id = categoria_id
        this.curso_id = curso_id
    }
    private gerarId(): number{
        return parseInt((Date.now() /100).toString(),10)
    }
}