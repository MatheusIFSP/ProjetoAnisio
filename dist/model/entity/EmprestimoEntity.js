"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoEntity = void 0;
class EmprestimoEntity {
    id;
    usuario_id;
    estoque_id;
    data_emprestimo;
    data_devolucao;
    data_entrega;
    dias_atraso;
    suspensao_ate;
    constructor(id, usuario_id, estoque_id, data_emprestimo, data_devolucao, data_entrega, dias_atraso, suspensao_ate) {
        this.id = id || 0;
        this.usuario_id = usuario_id || 0;
        this.estoque_id = estoque_id || 0;
        this.data_emprestimo = data_emprestimo || new Date();
        this.data_devolucao = data_devolucao || new Date();
        this.data_entrega = data_entrega || new Date();
        this.dias_atraso = dias_atraso || 0;
        this.suspensao_ate = suspensao_ate || new Date();
    }
}
exports.EmprestimoEntity = EmprestimoEntity;
