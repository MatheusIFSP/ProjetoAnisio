import { EmprestimoEntity } from "../model/entity/EmprestimoEntity"
import { EmprestimoRepository } from "../repository/EmprestimoRepository"
import { UsuarioRepository } from "../repository/UsuarioRepository"
import { EstoqueRepository } from "../repository/EstoqueRepository"
import { CatalogoRepository } from "../repository/CatalogoRepository"

export class EmprestimoService {
    private emprestimoRepository = EmprestimoRepository.getInstance()
    private usuarioRepository = UsuarioRepository.getInstance()
    private estoqueRepository = EstoqueRepository.getInstance()
    private catalogoRepository = CatalogoRepository.getInstance()

    criarEmprestimo(emprestimo: EmprestimoEntity) {
        this.verificarAtrasos(emprestimo.usuario_id)

        const usuario = this.usuarioRepository.findById(emprestimo.usuario_id)
        if (usuario.status !== "Ativo") {
            throw new Error ("Usuário não pode realizar empréstimo. Status: " + usuario.status)
        }
        
        this.limiteEmprestimos(usuario.id, usuario.categoria_id)

        const exemplar  = this.estoqueRepository.findById(emprestimo.estoque_id)
        if (!exemplar.disponivel) {
            throw new Error ("Exemplar não disponível para empréstimo")
        }
        exemplar.disponivel = false
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
        }else {
            const emprestimos = this.emprestimoRepository.findByUsuarioId(emprestimo.usuario_id)
            const atrasados = emprestimos.filter(e => e.dias_atraso && e.dias_atraso > 0)

            if(atrasados.length > 2) {
                const usuario = this.usuarioRepository.findById(emprestimo.usuario_id)
                usuario.status = "Inativo"
            }
        }
        const exemplar = this.estoqueRepository.findById(emprestimo.estoque_id)
        exemplar.disponivel = true
        return this.emprestimoRepository.updateById(emprestimoId, emprestimo)
    }

    private calcularDiasAtraso(emprestimo: { data_entrega: Date; data_devolucao: Date}): number {
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

    private verificarAtrasos(id: number){
        const hoje = new Date()
        const emprestimos = this.emprestimoRepository.findByUsuarioId(id)

        for (const emprestimo of emprestimos) {
            const atrasado = !emprestimo.data_entrega && hoje > new Date(emprestimo.data_devolucao)

            if (atrasado) {
                const diasAtraso = this.calcularDiasAtraso({
                    ...emprestimo,
                    data_entrega: hoje
                })

                emprestimo.dias_atraso = diasAtraso

                const suspensao = new Date()
                suspensao.setDate(suspensao.getDate() + diasAtraso * 3)
                emprestimo.suspensao_ate = suspensao

                const usuario = this.usuarioRepository.findById(emprestimo.usuario_id)
                usuario.status = "Suspenso"

                this.emprestimoRepository.updateById(emprestimo.id, emprestimo)
            }
        }
    }

    private definirDataDevolucao(categoriaUsuario: string, exemplar: any, cursos?: string): Date {
        const hoje = new Date()
        let dias: number

        if(categoriaUsuario === "Professor") {
            dias = 40
        } else if (categoriaUsuario === "Aluno") {
            const categoriaLivro = exemplar.categoria

            if (cursos && categoriaLivro === categoriaLivro) {
                dias = 30
            } else {
                dias = 15
            }
        } else {
            throw new Error ("Tipo de usuário não reconhecido")
        }

        const data_devolucao = new Date()
        data_devolucao.setDate(hoje.getDate() + dias)
        return data_devolucao
    }

    private limiteEmprestimos(id: number, categoriaUsuario: string) {
        const emprestimos = this.emprestimoRepository.findByUsuarioId(id)
        const ativos = emprestimos.filter(e => !e.data_entrega)

        const limite = categoriaUsuario === "Professor" ? 5 : 3

        if (ativos.length >= limite) {
            throw new Error(`Usuário já atingiu o limite de ${limite} empréstimos`)
        }
    }
}