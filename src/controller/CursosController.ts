import { CursosService } from "../service/CursosService";
import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";

@Route("cursos")
@Tags("Cursos")
export class CursosController extends Controller {
    private cursosService = new CursosService();

    @Get("all")
    async listarCursos(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<any[]> {
      try {
        const curso = await this.cursosService.listarCursos();
        return success(200, new BasicResponseDto("Cursos listados com sucesso", curso))
      } catch (error: any) {
        return notFound(400, new BasicResponseDto(error.message, null));
      }
    }
}