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

app.post("/library/usuario", usuarioController.criarUsuario.bind(usuarioController))
app.get("/library/usuario", usuarioController.listarUsuario.bind(usuarioController))
app.get("/library/usuario/:cpf", usuarioController.buscarPorId.bind(usuarioController))
app.put("/library/usuario/:cpf", usuarioController.atualizarUsuario.bind(usuarioController))
app.delete("/library/usuario/:cpf", usuarioController.removerUsuario.bind(usuarioController))

app.post("/library/livro", livroController.criarLivro.bind(livroController))
app.get("/library/livro", livroController.listarLivro.bind(livroController))
app.get("/library/livro/:isbn", livroController.buscarPorISBN.bind(livroController))
app.put("/library/livro/:isbn", livroController.atualizarLivro.bind(livroController))
app.delete("/library/livro/:isbn", livroController.removerLivro.bind(livroController))

app.post("/library/estoque", estoqueController.criarEstoque.bind(estoqueController))
app.get("/library/estoque", estoqueController.listarEstoque.bind(estoqueController))
app.get("/library/estoque/:codigo", estoqueController.buscarPorCod.bind(estoqueController))
app.put("/library/estoque/:codigo", estoqueController.atualizarEstoque.bind(estoqueController))
app.delete("/library/estoque/:codigo", estoqueController.removerEstoque.bind(estoqueController))

app.post("/library/emprestimo", emprestimoController.criarEmprestimo.bind(emprestimoController))
app.get("/library/emprestimo", emprestimoController.listarEmprestimo.bind(emprestimoController))
app.get("/library/emprestimo:id", emprestimoController.buscarPorId.bind(emprestimoController))
app.put("/library/emprestimo/:id/devolucao", emprestimoController.devolverEmprestimo.bind(emprestimoController))

app.get("/library/categorias-usuario", catalogoController.listarCategoriaUsuario.bind(catalogoController))
app.get("/library/cursos", catalogoController.listarCursos.bind(catalogoController))
app.get("/library/categorias-livro", catalogoController.listarCategoriaLivro.bind(catalogoController))

app.listen(PORT, () => console.log("Servidor rodando em http://localhost:${PORT}/library"))


