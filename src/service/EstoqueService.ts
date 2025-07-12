import { EstoqueEntity } from "../model/entity/EstoqueEntity";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class EstoqueService {
    private estoqueRepository = EstoqueRepository.getInstance()
    private livroRepository = LivroRepository.getInstance()

    async criarEstoque(estoqueData: any): Promise<EstoqueEntity> {
        const { livro_isbn, quantidade, quantidade_emprestada, disponivel } = estoqueData;

        const estoque = new EstoqueEntity(undefined, livro_isbn, quantidade, quantidade_emprestada, disponivel)

        const novoEstoque = await this.estoqueRepository.insereEstoque(estoque)
        console.log("Service - Insert", novoEstoque)
        return novoEstoque;
    }

    async listarEstoque(): Promise<EstoqueEntity[]> {
        const estoque =  await this.estoqueRepository.findAll();
        console.log("Service - Filtrar Todos", estoque);
        return estoque;
    }

     async buscarEstoqueById(id: any): Promise<EstoqueEntity> {
        const estoque = await this.estoqueRepository.findById(parseInt(id));
        console.log("Service - Buscar", estoque);
        return estoque;
    }

    async atualizarEstoque(estoqueData: any): Promise<EstoqueEntity> {
        const { id, livro_isbn, quantidade, quantidade_emprestada, disponivel} = estoqueData;

        const estoque = new EstoqueEntity(id, livro_isbn, quantidade, quantidade_emprestada, disponivel)

        await this.estoqueRepository.updateEstoque(estoque);
        console.log("Service - Update ", estoque);
        return estoque;
    }

    async removerEstoque(estoqueData: any) :Promise<EstoqueEntity> {
        const { id, livro_isbn, quantidade, quantidade_emprestada, disponivel } = estoqueData;

        const estoque = new EstoqueEntity(id, livro_isbn, quantidade, quantidade_emprestada, disponivel)

        await this.estoqueRepository.removeById(id);
        console.log("Service - Delete ", estoque);
        return estoque;
    }

    async marcarIndisponivel(id: number): Promise<EstoqueEntity> {
        const estoque = await this.estoqueRepository.findById(id);

        estoque.disponivel = false;

        const atualizado = await this.estoqueRepository.updateEstoque(estoque);
        console.log("Estoque marcado como indisponível:", atualizado);
        return atualizado;
    }

    async marcarDisponivel(id: number): Promise<EstoqueEntity> {
        const estoque = await this.estoqueRepository.findById(id);

        estoque.disponivel = true;

        const atualizado = await this.estoqueRepository.updateEstoque(estoque);
        console.log("Estoque marcado como disponível:", atualizado);
        return atualizado;
    }

}