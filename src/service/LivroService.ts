import { LivroEntity} from "../model/LivroEntity"
import { LivroRepository } from "../repository/LivroRepository"
import { CatalogoRepository } from "../repository/CatalogoRepository"

export class LivroService{
    private livroRepository = LivroRepository.getInstance()
    private catalogoRepository = CatalogoRepository.getInstance()

    criarLivro(novoLivro: LivroEntity){
        if (!this.catalogoRepository.existeCategoriaLivro(novoLivro.categoria_id)) {
            throw new Error ("Categoria de livro inválida")
        }
        this.verificarLivro(novoLivro.autor, novoLivro.editora, novoLivro.edicao)
        return this.livroRepository.insereLivro(novoLivro)
    }

    listarLivro(){
        return this.livroRepository.findAll()
    }

    buscarPorISBN(isbn: number) {
        const livro = this.livroRepository.findByISBN(isbn)
        if (!livro){
            throw new Error("Livro não encontrado")
        }
        return livro;
    }

    atualizarLivro(isbn: number, dados: Partial<LivroEntity>){
        return this.livroRepository.updateByISBN(isbn, dados)
    }

    verificarLivro(autor: string, editora: string, edicao: string) {
        const livros = this.livroRepository.findAll()

        const LivroExistente = livros.some(livro =>
            livro.autor === autor &&
            livro.editora === editora &&
            livro.edicao === edicao
        );

        if (LivroExistente){
            throw new Error("Esse livro já está cadastrado")
        }
    }

    removerLivro(isbn: number) {
        return this.livroRepository.removeByISBN(isbn)
    }
}