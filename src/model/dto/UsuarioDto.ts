export class UsuarioDto {
    nome: string;
    cpf: string;
    status: string;
    categoria_id: string;
    curso_id: string;

    constructor(
        nome: string, 
        cpf: string, 
        status: string, 
        categoria_id: string, 
        curso_id: string
    ){
        this.nome = nome
        this.cpf = cpf
        this.status = status
        this.categoria_id = categoria_id
        this.curso_id = curso_id
    }
}