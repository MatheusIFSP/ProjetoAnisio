import { LivroEntity } from "../model/entity/LivroEntity"

export class LivroRepository{
    private static instance: LivroRepository
    private livroList: LivroEntity[] = []

    constructor(){}

    static getInstance(): LivroRepository{
        if( !this.instance ){
            this.instance = new LivroRepository()
        }
        return LivroRepository.instance
    }
    insereLivro(livro: LivroEntity){
        this.livroList.push(livro)
        return livro
    }
    findAll(){
        return this.livroList
    }
    findByISBN(isbn: number) {
        return this.livroList.find(livro => livro.isbn === isbn)
    }
    updateByISBN(isbn: number, dados: Partial<LivroEntity>) {
        const index = this.findIndex(isbn)
        Object.assign(this.livroList[index], dados)
        return this.livroList[index]
    }
    removeByISBN(isbn: number) {
        const index = this.findIndex(isbn)
        this.livroList.splice(index, 1)
    }
    private findIndex( isbn: number):number{
        const index = this.livroList.findIndex( l => l.isbn == isbn)
        if(index == -1){
            throw new Error("ID informado não foi encontrado")
        }
        return index
    }
}