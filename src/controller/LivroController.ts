import { LivroService } from "../service/LivroService";
import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { LivroDto } from "../model/dto/LivroDto";
import { LivroEntity } from "../model/entity/LivroEntity";

@Route("livros")
@Tags("Livros")
export class LivroController extends Controller {
  private livroService = new LivroService();

  @Post()
  async criarLivro(
    @Body() dto: LivroDto,
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

  @Get("all")
  async listarLivros(
      @Res() notFound: TsoaResponse<400, BasicResponseDto>,
      @Res() success: TsoaResponse<200, BasicResponseDto>
  ): Promise<any[]> {
    try {
      const livro: LivroEntity[] = await this.livroService.listarLivro();
      return success(200, new BasicResponseDto("Livros listados com sucesso", livro))
    } catch (error: any) {
      return notFound(400, new BasicResponseDto(error.message, null));
    }
  }

  @Get("isbn/{isbn}")
  async buscarPorIsbn(
    @Path() isbn: number,
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<404, BasicResponseDto>
  ): Promise <void> {
    try {
      const livro = await this.livroService.buscarPorISBN(isbn);
      return success(200, new BasicResponseDto("Livro achado com sucesso", livro));
    } catch (error: any) {
      return notFound(404, new BasicResponseDto(error.message, null));
    }
  }

  @Put("isbn/{isbn}")
  async atualizarLivro(
    @Body() dto: LivroDto,
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<400, BasicResponseDto>
  ): Promise <void> {
    try {
      const livro = await this.livroService.atualizarLivro(dto);
      return success(200, new BasicResponseDto("Livro atualizado com sucesso", livro));
    } catch (error: any) {
      return notFound(400, new BasicResponseDto(error.message, null));
    }
  }

  @Delete("{isbn}")
  async removerLivro(
    @Path() isbn: number,
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<400, BasicResponseDto>
  ): Promise<void>{
    try {
      const livro = await this.livroService.removerLivro(isbn);
      return success(200, new BasicResponseDto("Livro removido com sucesso", livro));
    } catch (error: any) {
      return notFound(400, new BasicResponseDto(error.message, undefined));
    }
  }
}