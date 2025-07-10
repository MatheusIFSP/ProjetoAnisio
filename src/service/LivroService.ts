import { LivroEntity } from "../model/entity/LivroEntity"
import { LivroRepository } from "../repository/LivroRepository"
import { CatalogoRepository } from "../repository/CatalogoRepository"

export class LivroService{
    private livroRepository = LivroRepository.getInstance()
    private catalogoRepository = CatalogoRepository.getInstance()

    async criarLivro(livroData: any): Promise<LivroEntity>{
        const { titulo, autor, editora, edicao, isbn, categoria_id } = livroData

        const livro = new LivroEntity(undefined, titulo, autor, editora, edicao, isbn, categoria_id)

        const novoLivro = await this.livroRepository.insereLivro(livro);
        console.log("Service - Insert", novoLivro);
        return novoLivro;
    }

    async listarLivro() :Promise<LivroEntity[]>{
        const livros = await this.livroRepository.findAll();
        console.log("Service - Filtrar todos", livros);
        return livros;
    }

    async buscarPorISBN(livroData: any): Promise<LivroEntity> {
        const idNumber = parseInt(livroData, 10);

        const livro =  await this.livroRepository.findByISBN(idNumber);
        console.log("Service - Filtrar", livro);
        return livro;
    }

    async atualizarLivro(livroData: any) :Promise<LivroEntity>{
        const { id, titulo, autor, editora, edicao, isbn, categoria_id } = livroData;

        const livro = new LivroEntity(id, titulo, autor, editora, edicao, isbn, categoria_id)

        await this.livroRepository.updateLivro(livro, isbn);
        console.log("Service - Update ", livro);
        return livro;
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

    async removerLivro(livroData: any): Promise<LivroEntity> {
        const { id, titulo, autor, editora, edicao, isbn, categoria_id } = livroData;

        const livro = new LivroEntity(id, titulo, autor, editora, edicao, isbn, categoria_id)

        await this.livroRepository.removeByISBN(livro);
        console.log("Service - Delete ", livro);
        return livro;
    }
}