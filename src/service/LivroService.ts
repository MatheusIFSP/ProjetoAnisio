import { LivroEntity} from "../model/LivroEntity"
import { LivroRepository } from "../repository/LivroRepository"

export class LivroService{
    private livroRepository = LivroRepository.getInstance()

    verificarLivro(autor: string, editora: string, edicao: string) {
        const livros = this.livroRepository.findAll();

        const LivroExistente = livros.some(livro =>
            livro.autor === autor &&
            livro.editora === editora &&
            livro.edicao === edicao
        );

        if (LivroExistente){
            throw new Error("Esse livro já está cadastrado");
        }
    }

    criarLivro(novoLivro: LivroEntity){
        this.verificarLivro(novoLivro.autor, novoLivro.editora, novoLivro.edicao);
        return this.livroRepository.insereLivro(novoLivro);
    }
    listarLivro(){
        return this.livroRepository.findAll();
    }
    buscarPorISBN(isbn: string) {
        const livro = this.livroRepository.findByISBN(isbn);
        if (!livro){
            throw new Error("Livro não encontrado");
        }
        return livro;
    }
    atualizarLivro(isbn: string, dados: Partial<LivroEntity>){
        return this.livroRepository.updateByISBN(isbn, dados);
    }
    removerLivro(isbn: string) {
        return this.livroRepository.deleteByISBN(isbn);
    }
}