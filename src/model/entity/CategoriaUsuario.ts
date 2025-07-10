export class CategoriaUsuario {
    id: number
    categoria: string

    constructor(id?: number, categoria?: string){
        this.id = id || 0;
        this.categoria = categoria || '';
    }
}