import { LivroEntity } from "../model/entity/LivroEntity"
import { LivroRepository } from "../repository/LivroRepository"
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository"

export class LivroService{
    private livroRepository = LivroRepository.getInstance()
    private categoriaLivroRepository = CategoriaLivroRepository.getInstance()

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

        await this.livroRepository.updateLivro(isbn, livro);
        console.log("Service - Update ", livro);
        return livro;
    }

    async removerLivro(livroData: any): Promise<LivroEntity> {
        const { id, titulo, autor, editora, edicao, isbn, categoria_id } = livroData;

        const livro = new LivroEntity(id, titulo, autor, editora, edicao, isbn, categoria_id)

        await this.livroRepository.removeByISBN(livro);
        console.log("Service - Delete ", livro);
        return livro;
    }

    async verificarLivro(autor: string, editora: string, edicao: string): Promise<void> {
        const livros = await this.livroRepository.findAll();

        const livroExistente = livros.some(
        (livro) =>
            livro.autor === autor &&
            livro.editora === editora &&
            livro.edicao === edicao
        );

        if (livroExistente) {
        throw new Error("Esse livro já está cadastrado");
        }
    }

    async validarCategoriaLivro(categoria_id: string): Promise<void> {
        const categoria = await this.categoriaLivroRepository.findCategoriaLivro(categoria_id);

        if (!categoria) {
        throw new Error("Categoria de livro inválida ou inexistente");
        }
    }
}