"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const ProductController_1 = require("../controller/ProductController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "ProductRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "price": { "dataType": "double", "required": true },
            "expirationDate": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDto": {
        "dataType": "refObject",
        "properties": {
            "message": { "dataType": "string", "required": true },
            "object": { "dataType": "any", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "name": { "dataType": "string", "required": true },
            "price": { "dataType": "double", "required": true },
            "expirationDate": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    const argsProductController_cadastrarProduto = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "ProductRequestDto" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/product', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductController.prototype.cadastrarProduto)), async function ProductController_cadastrarProduto(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProductController_cadastrarProduto, request, response });
            const controller = new ProductController_1.ProductController();
            await templateService.apiHandler({
                methodName: 'cadastrarProduto',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProductController_atualizarProduto = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "ProductDto" },
        notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.put('/product', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductController.prototype.atualizarProduto)), async function ProductController_atualizarProduto(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProductController_atualizarProduto, request, response });
            const controller = new ProductController_1.ProductController();
            await templateService.apiHandler({
                methodName: 'atualizarProduto',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProductController_deletarProduto = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "ProductDto" },
        notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.delete('/product', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductController.prototype.deletarProduto)), async function ProductController_deletarProduto(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProductController_deletarProduto, request, response });
            const controller = new ProductController_1.ProductController();
            await templateService.apiHandler({
                methodName: 'deletarProduto',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProductController_filtrarProdutoPorId = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/product/id/:id', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductController.prototype.filtrarProdutoPorId)), async function ProductController_filtrarProdutoPorId(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProductController_filtrarProdutoPorId, request, response });
            const controller = new ProductController_1.ProductController();
            await templateService.apiHandler({
                methodName: 'filtrarProdutoPorId',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProductController_filtrarProdutoPorNome = {
        name: { "in": "query", "name": "name", "required": true, "dataType": "string" },
        notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/product', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductController.prototype.filtrarProdutoPorNome)), async function ProductController_filtrarProdutoPorNome(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProductController_filtrarProdutoPorNome, request, response });
            const controller = new ProductController_1.ProductController();
            await templateService.apiHandler({
                methodName: 'filtrarProdutoPorNome',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProductController_listarTodosProduto = {
        notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/product/all', ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductController)), ...((0, runtime_1.fetchMiddlewares)(ProductController_1.ProductController.prototype.listarTodosProduto)), async function ProductController_listarTodosProduto(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsProductController_listarTodosProduto, request, response });
            const controller = new ProductController_1.ProductController();
            await templateService.apiHandler({
                methodName: 'listarTodosProduto',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
