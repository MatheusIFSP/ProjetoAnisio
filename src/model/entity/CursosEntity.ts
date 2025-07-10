export class CursosEntity {
    id: number
    cursos: string

    constructor(id?: number, cursos?: string){
        this.id = id || 0
        this.cursos = cursos || ''
    }
}