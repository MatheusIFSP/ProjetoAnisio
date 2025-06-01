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
    updateByISBN(isbn: string, dados: Partial <LivroEntity>) {
        const livro = this.findByISBN(isbn);
        if (!livro) {
            throw new Error("Livro não encontrado");
        }
        Object.assign(livro, dados);
            return livro;
    }
    deleteByISBN(isbn: string) {
        const index = this.livroList.findIndex(livro => livro.isbn === isbn);
        if (index === -1) {
            throw new Error ("Livro não encontrado");
        }
        this.livroList.splice(index, 1);
    }
}