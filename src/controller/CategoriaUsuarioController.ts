import { CategoriaUsuarioService } from "../service/CategoriaUsuarioService";
import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";

@Route("categoria_usuario")
@Tags("Categoria Usuário")
export class CategoriaUsuarioController extends Controller {
    private categoriaUsuarioService = new CategoriaUsuarioService();

    @Get("all")
    async listarCategoria(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<any[]> {
      try {
        const categoria = await this.categoriaUsuarioService.listarCategorias();
        return success(200, new BasicResponseDto("Cursos listados com sucesso", categoria))
      } catch (error: any) {
        return notFound(400, new BasicResponseDto(error.message, null));
      }
    }
}