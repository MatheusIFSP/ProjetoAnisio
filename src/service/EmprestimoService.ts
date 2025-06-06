import { EmprestimoEntity } from "../model/EmprestimoEntity"
import { EmprestimoRepository } from "../repository/EmprestimoRepository"
import { UsuarioRepository } from "../repository/UsuarioRepository"
import { EstoqueRepository } from "../repository/EstoqueRepository"

export class EmprestimoService {
    private emprestimoRepository = EmprestimoRepository.getInstance()
    private usuarioRepository = UsuarioRepository.getInstance()
    private estoqueRepository = EstoqueRepository.getInstance()

    criarEmprestimo(emprestimo: EmprestimoEntity) {
        const usuario = this.usuarioRepository.findById(emprestimo.usuario_id)
        if (usuario.status !== "Ativo") {
            throw new Error ("Usuário não pode realizar empréstimo. Status: " + usuario.status)
        }
        const exemplar  = this.estoqueRepository.findById(emprestimo.estoque_id)
        if (!exemplar.disponivel) {
            throw new Error ("Exemplar não disponível para empréstimo")
        }
        this.estoqueRepository.Disponivel(exemplar.id)
        return this.emprestimoRepository.insereEmprestimo(emprestimo)
    }

    listarEmprestimo() {
        return this.emprestimoRepository.findAll()
    }

    buscarPorId(id: number) {
        return this.emprestimoRepository.findById(id)
    }

    atualizarEmprestimo(id: number, dados: Partial <EmprestimoEntity>) {
        return this.emprestimoRepository.updateById(id, dados)
    }

    devolverEmprestimo(emprestimoId: number, dataEntrega: Date) {
        const emprestimo = this.emprestimoRepository.findById(emprestimoId)
        emprestimo.data_devolucao = dataEntrega

        const diasAtraso = this.calcularDiasAtraso(emprestimo)
        emprestimo.dias_atraso = diasAtraso

        if (diasAtraso > 0) {
            const suspensao = new Date(dataEntrega)
            suspensao.setDate(suspensao.getDate() + diasAtraso * 3)
            emprestimo.suspensao_ate = suspensao

            const usuario = this.usuarioRepository.findById(emprestimo.usuario_id)
            usuario.status = "Suspenso"
        }
        this.estoqueRepository.Disponivel(emprestimo.estoque_id)
        return this.emprestimoRepository.updateById(emprestimoId, emprestimo)
    }

    private calcularDiasAtraso(emprestimo: EmprestimoEntity): number {
        if (!emprestimo.data_entrega || !emprestimo.data_devolucao) {
            return 0
        }
        const entregaTempo = new Date(emprestimo.data_entrega).getTime()
        const limiteTempo = new Date(emprestimo.data_devolucao).getTime()

        const diffMs = entregaTempo - limiteTempo

        if (diffMs <= 0) return 0

        const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
        return diffDias
    }
}