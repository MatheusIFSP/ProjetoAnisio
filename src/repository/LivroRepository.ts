import { LivroEntity } from "../model/LivroEntity"; 

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
        this.livroList.push(livro);
        return livro;
    }
    findAll(){
        return this.livroList;
    }
    findByISBN(isbn: string) {
        return this.livroList.find(livro => livro.isbn === isbn);
    }
    updateById(id: number, dados: Partial<LivroEntity>) {
        const index = this.findIndex(id);
        Object.assign(this.livroList[index], dados);
        return this.livroList[index];
    }
    removeById(id: number) {
        const index = this.findIndex(id);
        this.livroList.splice(index, 1);
    }
    private findIndex( id: number):number{
        const index = this.livroList.findIndex( l => l.id == id)
        if(index == -1){
            throw new Error("ID informado não foi encontrado")
        }
        return index
    }
}