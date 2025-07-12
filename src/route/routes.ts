/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsuarioController } from './../controller/UsuarioController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LivroController } from './../controller/LivroController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EstoqueController } from './../controller/EstoqueController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EmprestimoController } from './../controller/EmprestimoController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CursosController } from './../controller/CursosController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoriaUsuarioController } from './../controller/CategoriaUsuarioController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoriaLivroController } from './../controller/CategoriaLivroController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UsuarioDto": {
        "dataType": "refObject",
        "properties": {
            "nome": {"dataType":"string","required":true},
            "cpf": {"dataType":"string","required":true},
            "status": {"dataType":"string","required":true},
            "categoria_id": {"dataType":"string","required":true},
            "curso_id": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDto": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "object": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LivroDto": {
        "dataType": "refObject",
        "properties": {
            "titulo": {"dataType":"string","required":true},
            "autor": {"dataType":"string","required":true},
            "editora": {"dataType":"string","required":true},
            "edicao": {"dataType":"string","required":true},
            "isbn": {"dataType":"double","required":true},
            "categoria_id": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EstoqueEntityDto": {
        "dataType": "refObject",
        "properties": {
            "livro_isbn": {"dataType":"double","required":true},
            "quantidade": {"dataType":"double","required":true},
            "quantidade_emprestada": {"dataType":"double","required":true},
            "disponivel": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["disponível"]},{"dataType":"enum","enums":["indisponível"]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EmprestimoEntityDto": {
        "dataType": "refObject",
        "properties": {
            "usuario_id": {"dataType":"double","required":true},
            "estoque_id": {"dataType":"double","required":true},
            "dias_atraso": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUsuarioController_criarUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"UsuarioDto"},
                success: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/usuarios',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.criarUsuario)),

            async function UsuarioController_criarUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_criarUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'criarUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_listarUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/usuarios/all',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.listarUsuario)),

            async function UsuarioController_listarUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_listarUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'listarUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_buscarPorId: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/usuarios/id/:id',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.buscarPorId)),

            async function UsuarioController_buscarPorId(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_buscarPorId, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'buscarPorId',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_atualizarUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"UsuarioDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/usuarios',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.atualizarUsuario)),

            async function UsuarioController_atualizarUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_atualizarUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'atualizarUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_removerUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.delete('/usuarios/:id',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.removerUsuario)),

            async function UsuarioController_removerUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_removerUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'removerUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_criarLivro: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"LivroDto"},
                success: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/livros',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.criarLivro)),

            async function LivroController_criarLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_criarLivro, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'criarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_listarLivros: Record<string, TsoaRoute.ParameterSchema> = {
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/livros/all',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.listarLivros)),

            async function LivroController_listarLivros(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_listarLivros, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'listarLivros',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_buscarPorIsbn: Record<string, TsoaRoute.ParameterSchema> = {
                isbn: {"in":"path","name":"isbn","required":true,"dataType":"double"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/livros/isbn/:isbn',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.buscarPorIsbn)),

            async function LivroController_buscarPorIsbn(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_buscarPorIsbn, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'buscarPorIsbn',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_atualizarLivro: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"LivroDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/livros/isbn/:isbn',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.atualizarLivro)),

            async function LivroController_atualizarLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_atualizarLivro, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'atualizarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_removerLivro: Record<string, TsoaRoute.ParameterSchema> = {
                isbn: {"in":"path","name":"isbn","required":true,"dataType":"double"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.delete('/livros/:isbn',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.removerLivro)),

            async function LivroController_removerLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_removerLivro, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'removerLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_criarEstoque: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"EstoqueEntityDto"},
                success: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/estoque',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.criarEstoque)),

            async function EstoqueController_criarEstoque(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_criarEstoque, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'criarEstoque',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_listarEstoques: Record<string, TsoaRoute.ParameterSchema> = {
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/estoque/all',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.listarEstoques)),

            async function EstoqueController_listarEstoques(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_listarEstoques, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'listarEstoques',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_buscarPorId: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/estoque/id/:id',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.buscarPorId)),

            async function EstoqueController_buscarPorId(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_buscarPorId, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'buscarPorId',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_atualizarEstoque: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"EstoqueEntityDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/estoque/id/:id',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.atualizarEstoque)),

            async function EstoqueController_atualizarEstoque(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_atualizarEstoque, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'atualizarEstoque',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_removerEstoque: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.delete('/estoque/:id',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.removerEstoque)),

            async function EstoqueController_removerEstoque(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_removerEstoque, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'removerEstoque',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEmprestimoController_criarEmprestimo: Record<string, TsoaRoute.ParameterSchema> = {
                emprestimoData: {"in":"body","name":"emprestimoData","required":true,"ref":"EmprestimoEntityDto"},
                success: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/emprestimos',
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController)),
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController.prototype.criarEmprestimo)),

            async function EmprestimoController_criarEmprestimo(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_criarEmprestimo, request, response });

                const controller = new EmprestimoController();

              await templateService.apiHandler({
                methodName: 'criarEmprestimo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEmprestimoController_listarEmprestimos: Record<string, TsoaRoute.ParameterSchema> = {
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/emprestimos/all',
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController)),
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController.prototype.listarEmprestimos)),

            async function EmprestimoController_listarEmprestimos(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_listarEmprestimos, request, response });

                const controller = new EmprestimoController();

              await templateService.apiHandler({
                methodName: 'listarEmprestimos',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEmprestimoController_buscarEmprestimoById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                fail: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/emprestimos/:id',
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController)),
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController.prototype.buscarEmprestimoById)),

            async function EmprestimoController_buscarEmprestimoById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_buscarEmprestimoById, request, response });

                const controller = new EmprestimoController();

              await templateService.apiHandler({
                methodName: 'buscarEmprestimoById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEmprestimoController_devolverEmprestimo: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"data_entrega":{"dataType":"string","required":true}}},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/emprestimos/devolucao/:id',
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController)),
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController.prototype.devolverEmprestimo)),

            async function EmprestimoController_devolverEmprestimo(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_devolverEmprestimo, request, response });

                const controller = new EmprestimoController();

              await templateService.apiHandler({
                methodName: 'devolverEmprestimo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCursosController_listarCursos: Record<string, TsoaRoute.ParameterSchema> = {
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/cursos/all',
            ...(fetchMiddlewares<RequestHandler>(CursosController)),
            ...(fetchMiddlewares<RequestHandler>(CursosController.prototype.listarCursos)),

            async function CursosController_listarCursos(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCursosController_listarCursos, request, response });

                const controller = new CursosController();

              await templateService.apiHandler({
                methodName: 'listarCursos',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoriaUsuarioController_listarCategoria: Record<string, TsoaRoute.ParameterSchema> = {
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/categoria_usuario/all',
            ...(fetchMiddlewares<RequestHandler>(CategoriaUsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriaUsuarioController.prototype.listarCategoria)),

            async function CategoriaUsuarioController_listarCategoria(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaUsuarioController_listarCategoria, request, response });

                const controller = new CategoriaUsuarioController();

              await templateService.apiHandler({
                methodName: 'listarCategoria',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoriaLivroController_listarCategoria: Record<string, TsoaRoute.ParameterSchema> = {
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/categoria_livro/all',
            ...(fetchMiddlewares<RequestHandler>(CategoriaLivroController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriaLivroController.prototype.listarCategoria)),

            async function CategoriaLivroController_listarCategoria(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaLivroController_listarCategoria, request, response });

                const controller = new CategoriaLivroController();

              await templateService.apiHandler({
                methodName: 'listarCategoria',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
