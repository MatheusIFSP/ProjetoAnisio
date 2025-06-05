import { EstoqueEntity } from "../model/EstoqueEntity";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class EstoqueService {
    private estoqueRepository = EstoqueRepository.getInstance()
    private livroRepository = LivroRepository.getInstance()

    criarEstoque(novoEstoque: EstoqueEntity) {
        const livro = this.livroRepository.findByISBN(novoEstoque.livro_isbn)
        if (!livro) {
            throw new Error("Livro associado não encontrado")
        }
        return this.estoqueRepository.insereEstoque(novoEstoque)
    }

    listarEstoque() {
        return this.estoqueRepository.findAll()
    }

    buscarPorCodigo(codigo: string) {
        return this.estoqueRepository.findByCod(codigo)
    }

    atualizarEstoque(id: number, dados: Partial <EstoqueEntity>) {
        return this.estoqueRepository.updateById(id, dados)
    }

    removerEstoque(id: number) {
        return this.estoqueRepository.removeById(id)
    }

    marcarIndisponivel(id: number) {
        return this.estoqueRepository.Indisponivel(id)
    }

    marcarDisponivel(id: number) {
        return this.estoqueRepository.Disponivel(id)
    }

}