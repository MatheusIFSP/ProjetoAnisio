import express from "express"
import { UsuarioController } from "./controller/UsuarioController"
import { LivroController } from "./controller/LivroController"
import { EstoqueController } from "./controller/EstoqueController"
import { EmprestimoController } from "./controller/EmprestimoController"
import { CatalogoController } from "./controller/CatalogoController"

const usuarioController = new UsuarioController()
const livroController = new LivroController()
const estoqueController = new EstoqueController()
const emprestimoController = new EmprestimoController()
const catalogoController = new CatalogoController()

const app = express()

const PORT = process.env.PORT ?? 3090
app.use(express.json())

app.post("/api/usuario", usuarioController.criarUsuario.bind(usuarioController))
app.get("/api/usuario", usuarioController.listarUsuario.bind(usuarioController))
app.get("/api/usuario/:cpf", usuarioController.buscarPorId.bind(usuarioController))
app.put("/api/usuario/:cpf", usuarioController.atualizarUsuario.bind(usuarioController))
app.delete("/api/usuario/:cpf", usuarioController.removerUsuario.bind(usuarioController))

app.post("/api/livro", livroController.criarLivro.bind(livroController))
app.get("/api/livro", livroController.listarLivro.bind(livroController))
app.get("/api/livro/:isbn", livroController.buscarPorISBN.bind(livroController))
app.put("/api/livro/:isbn", livroController.atualizarLivro.bind(livroController))
app.delete("/api/livro/:isbn", livroController.removerLivro.bind(livroController))

app.post("/api/estoque", estoqueController.criarEstoque.bind(estoqueController))
app.get("/api/estoque", estoqueController.listarEstoque.bind(estoqueController))
app.get("/api/estoque/:codigo", estoqueController.buscarPorCod.bind(estoqueController))
app.put("/api/estoque/:codigo", estoqueController.atualizarEstoque.bind(estoqueController))
app.delete("/api/estoque/:codigo", estoqueController.removerEstoque.bind(estoqueController))

app.post("/api/emprestimo", emprestimoController.criarEmprestimo.bind(emprestimoController))
app.get("/api/emprestimo", emprestimoController.listarEmprestimo.bind(emprestimoController))
app.get("/api/emprestimo:id", emprestimoController.buscarPorId.bind(emprestimoController))
app.put("/api/emprestimo/:id/devolucao", emprestimoController.devolverEmprestimo.bind(emprestimoController))

app.get("/api/categorias-usuario", catalogoController.listarCategoriaUsuario.bind(catalogoController))
app.get("/api/cursos", catalogoController.listarCursos.bind(catalogoController))
app.get("/api/categorias-livro", catalogoController.listarCategoriaLivro.bind(catalogoController))

app.listen(PORT, () => console.log("Servidor rodando em http://localhost:3090/library"))


