import { UsuarioService } from "../service/UsuarioService";
import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { UsuarioDto } from "../model/dto/UsuarioDto";
import { UsuarioEntity } from "../model/entity/UsuarioEntity";

@Route("usuarios")
@Tags("Usuários")
export class UsuarioController extends Controller {
    usuarioService = new UsuarioService();

    @Post()
    async criarUsuario(
      @Body() dto: UsuarioDto,
      @Res() success: TsoaResponse<201, BasicResponseDto>,
      @Res() notFound: TsoaResponse<400, BasicResponseDto>
  ): Promise <void> {
      try {
        const usuario = await this.usuarioService.criarUsuario(dto);
        return success(201, new BasicResponseDto("Usuário criado com sucesso", usuario));
    } catch (error: any) {
        return notFound(400, new BasicResponseDto(error.message, null));
    }
  }

  @Get("all")
  async listarUsuario(
      @Res() notFound: TsoaResponse<400, BasicResponseDto>,
      @Res() success: TsoaResponse<200, BasicResponseDto>
  ): Promise<any[]> {
    try {
      const listar: UsuarioEntity[] = await this.usuarioService.listarUsuario();
      return success(200, new BasicResponseDto("Usuários listado com sucesso", listar))
    }
  }

  @Get("id/{id}")
  async buscarPorId(
    @Path() id: number,
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<404, BasicResponseDto>
  ): Promise <void> {
    try {
      const usuario = await this.usuarioService.buscarPorId(id);
      return success(200, new BasicResponseDto("Usuário achado com sucesso", usuario));
    } catch (error: any) {
      return notFound(404, new BasicResponseDto(error.message, null));
    }
  }

  @Put()
  async atualizarUsuario(
    @Path() id: number,
    @Body() dto: UsuarioDto,
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<400, BasicResponseDto>
  ): Promise <void> {
    try {
      const atualizado = await this.usuarioService.atualizarUsuario(id, dto);
      return success(200, new BasicResponseDto("Usuário atualizado com sucesso", atualizado));
    } catch (error: any) {
      return notFound(400, new BasicResponseDto(error.message, null));
    }
  }

  @Delete()
  async removerUsuario(
    @Path() id: number,
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<400, BasicResponseDto>
  ): Promise <void> {
    try {
      const usuario = await this.usuarioService.removerUsuario(id);
      return success(200, new BasicResponseDto("Usuário removido com sucesso", usuario));
    } catch (error: any) {
      return notFound(400, new BasicResponseDto(error.message, undefined));
    }
  }
}