import {
  Body, Controller, Delete, Get, Path, Post, Put,
  Res, Route, Tags, TsoaResponse
} from "tsoa";
import { UsuarioService } from "../service/UsuarioService";
import { UsuarioDto } from "../model/dto/UsuarioDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";

@Route("usuarios")
@Tags("Usuários")
export class UsuarioController extends Controller {
  private usuarioService = new UsuarioService();

  @Post()
  async criarUsuario(
    @Body() dto: UsuarioDto,
    @Res() success: TsoaResponse<201, BasicResponseDto>,
    @Res() fail: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      const usuario = this.usuarioService.criarUsuario(UsuarioDto);
      return success(201, new BasicResponseDto("Usuário criado com sucesso", usuario));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message, null));
    }
  }

  @Get()
  async listarUsuario(): Promise<any[]> {
    return this.usuarioService.listarUsuario();
  }

  @Get("{id}")
  async buscarPorId(
    @Path() id: number,
    @Res() fail: TsoaResponse<404, BasicResponseDto>
  ) {
    try {
      const usuario = this.usuarioService.buscarPorId(id);
      return usuario;
    } catch (error: any) {
      return fail(404, new BasicResponseDto(error.message, null));
    }
  }

  @Put("{id}")
  async atualizarUsuario(
    @Path() id: number,
    @Body() dto: UsuarioDto,
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() fail: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      const atualizado = this.usuarioService.atualizarUsuario(id, dto);
      return success(200, new BasicResponseDto("Usuário atualizado com sucesso", atualizado));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message, null));
    }
  }

  @Delete("{id}")
  async removerUsuario(
    @Path() id: number,
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() fail: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      this.usuarioService.removerUsuario(id);
      return success(200, new BasicResponseDto("Usuário removido com sucesso", null));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message, null));
    }
  }
}