import { CategoriaLivro } from "../model/entity/CategoriaLivro";
import { executarComandoSQL } from "../database/mysql";

export class CategoriaLivroRepository{
    private static instance: CategoriaLivroRepository

    constructor(){

        this.createTable();
    }

    static getInstance(): CategoriaLivroRepository{
        if( !this.instance ){
            this.instance = new CategoriaLivroRepository()
        }
        return CategoriaLivroRepository.instance
    }

    private async createTable(){
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.CategoriaLivro(
        id AUTO_INCREMENT PRIMARY KEY,
        categoria VARCHAR(100) NOT NULL
        )`

        try{
        const resultado = await executarComandoSQL(query, []);
        console.log('Tabela CategoriaLivro criado com sucesso', resultado)
        } catch (err){
        console.log('Erro', err)
        }
    }

    async insereCategoriaLivro(){
        const categoria = ["Romance", "Computação", "Letras", "Gestão"];
        await executarComandoSQL("CREATE TABLE IF NOT EXISTS biblioteca.CategoriaLivro(id INT AUTO_INCREMENT PRIMARY KEY, categoria VARCHAR(100) NOT NULL)", []);
        for(const categorias of categoria){
            try{
                const resultado = await executarComandoSQL("INSERT IGNORE INTO biblioteca.Cursos (categoria) values (?)", [categoria]);
                console.log('Categoria criada com sucesso!', resultado);
            } catch(err){
                console.error(`Erro ao inserir categoria ${categoria}:`, err);
            }
        }
    }

    async findAll(): Promise<string[]> {
        const resultado = await executarComandoSQL(`SELECT categoria FROM biblioteca.CategoriaLivro`, []);
        return resultado.map((row: any) => row.categoria);
  }

    async encontrarCursos(categoria: string): Promise<CategoriaLivro | null> {
            const query = `SELECT * FROM biblioteca.CategoriaLivro WHERE categoria = ?`;
            const resultado = await executarComandoSQL(query, [categoria]);
    
            if (resultado && resultado.length > 0) {
                const row = resultado[0];
                return new CategoriaLivro(row.id, row.categoria);
            }
    
            return null;
        }
}