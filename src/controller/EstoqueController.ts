import { EstoqueService } from "../service/EstoqueService";
import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { EstoqueEntityDto } from "../model/dto/EstoqueDto";
import { EstoqueEntity } from "../model/entity/EstoqueEntity";

@Route("estoque")
@Tags("Estoque")
export class EstoqueController extends Controller {
    private estoqueService = new EstoqueService();

    @Post()
    async criarEstoque(
        @Body() dto: EstoqueEntityDto,
        @Res() success: TsoaResponse<201, BasicResponseDto>,
        @Res() fail: TsoaResponse<400, BasicResponseDto>
    ) {
        try {
        const estoque = this.estoqueService.criarEstoque(dto);
        return success(201, new BasicResponseDto("Estoque criado com sucesso", estoque));
        } catch (error: any) {
        return fail(400, new BasicResponseDto(error.message, null));
        }
    }

    @Get("all")
    async listarEstoques(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<any[]> {
      try {
        const estoque: EstoqueEntity[] = await this.estoqueService.listarEstoque();
        return success(200, new BasicResponseDto("Estoques listados com sucesso", estoque))
      } catch (error: any) {
        return notFound(400, new BasicResponseDto(error.message, null));
      }
    }

    @Get("id/{id}")
    async buscarPorId(
        @Path() id: number,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>
    ): Promise <void> {
        try {
        const estoque = await this.estoqueService.buscarEstoqueById(id);
        return success(200, new BasicResponseDto("Estoque achado com sucesso", estoque));
        } catch (error: any) {
        return notFound(404, new BasicResponseDto(error.message, null));
        }
    }

    @Put("id/{id}")
    async atualizarEstoque(
        @Body() dto: EstoqueEntityDto,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>
    ): Promise <void> {
        try {
        const estoque = await this.estoqueService.atualizarEstoque(dto);
        return success(200, new BasicResponseDto("Estoque atualizado com sucesso", estoque));
        } catch (error: any) {
        return notFound(400, new BasicResponseDto(error.message, null));
        }
    }

    @Delete("{id}")
    async removerEstoque(
        @Path() id: number,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>
    ): Promise<void>{
        try {
        const estoque = await this.estoqueService.removerEstoque(id);
        return success(200, new BasicResponseDto("Estoque removido com sucesso", estoque));
        } catch (error: any) {
        return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}