import {
  Body, Controller, Delete, Get, Path, Post, Put,
  Res, Route, Tags, TsoaResponse
} from "tsoa";
import { LivroService } from "../service/LivroService";
import { LivroDto } from "../model/dto/LivroDto"
import { BasicResponseDto } from "../model/dto/BasicResponseDto";

@Route("livros")
@Tags("Livros")
export class LivroController extends Controller {
  private livroService = new LivroService();

  @Post()
  async criarLivro(
    @Body() dto: LivroRequestDto,
    @Res() success: TsoaResponse<201, BasicResponseDto>,
    @Res() fail: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      const livro = this.livroService.criarLivro(dto);
      return success(201, new BasicResponseDto("Livro criado com sucesso", livro));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message, null));
    }
  }

  @Get()
  async listarLivro(): Promise<any[]> {
    return this.livroService.listarLivro();
  }

  @Get("{isbn}")
  async buscarPorISBN(@Path() isbn: number): Promise<any> {
    return this.livroService.buscarPorISBN(isbn);
  }

  @Put("{isbn}")
  async atualizarLivro(
    @Path() isbn: number,
    @Body() dto: LivroDto
  ): Promise<any> {
    return this.livroService.atualizarLivro(isbn, dto);
  }

  @Delete("{isbn}")
  async removerLivro(@Path() isbn: number): Promise<void> {
    return this.livroService.removerLivro(isbn);
  }
}