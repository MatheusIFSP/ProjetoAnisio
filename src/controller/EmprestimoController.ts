import { EmprestimoService } from "../service/EmprestimoService";
import { Body, Controller, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { EmprestimoEntityDto } from "../model/dto/EmprestimoDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";

@Route("emprestimos")
@Tags("Empréstimos")
export class EmprestimoController extends Controller {
  private emprestimoService = new EmprestimoService();

  @Post()
  async criarEmprestimo(
    @Body() emprestimoData: EmprestimoEntityDto,
    @Res() success: TsoaResponse<201, BasicResponseDto>,
    @Res() fail: TsoaResponse<400, BasicResponseDto>
  ): Promise<void> {
    try {
      const emprestimo = await this.emprestimoService.criarEmprestimo(emprestimoData);
      return success(201, new BasicResponseDto("Empréstimo criado com sucesso", emprestimo));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message, null));
    }
  }

  @Get("all")
  async listarEmprestimos(
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() fail: TsoaResponse<400, BasicResponseDto>
  ): Promise<void> {
    try {
      const emprestimos = await this.emprestimoService.listarEmprestimo();
      return success(200, new BasicResponseDto("Lista de empréstimos carregada com sucesso", emprestimos));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message, null));
    }
  }

  @Get("{id}")
  async buscarEmprestimoById(
    @Path() id: number,
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() fail: TsoaResponse<404, BasicResponseDto>
  ): Promise<void> {
    try {
      const emprestimo = await this.emprestimoService.buscarPorId(id);
      return success(200, new BasicResponseDto("Empréstimo encontrado com sucesso", emprestimo));
    } catch (error: any) {
      return fail(404, new BasicResponseDto(error.message, null));
    }
  }

  @Put("devolucao/{id}")
  async devolverEmprestimo(
    @Path() id: number,
    @Body() body: { data_entrega: string },
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() fail: TsoaResponse<400, BasicResponseDto>
  ): Promise<void> {
    try {
      const dataEntrega = new Date(body.data_entrega);
      const emprestimo = await this.emprestimoService.devolverEmprestimo(id, dataEntrega);
      return success(200, new BasicResponseDto("Devolução registrada com sucesso", emprestimo));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message, null));
    }
  }
}