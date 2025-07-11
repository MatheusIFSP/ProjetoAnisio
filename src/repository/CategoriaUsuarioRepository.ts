import { CategoriaUsuario } from "../model/entity/CategoriaUsuario";
import { executarComandoSQL } from "../database/mysql";

export class CategoriaUsuarioRepository{
    private static instance: CategoriaUsuarioRepository

    constructor(){

        this.createTable();
    }

    static getInstance(): CategoriaUsuarioRepository{
        if( !this.instance ){
            this.instance = new CategoriaUsuarioRepository()
        }
        return CategoriaUsuarioRepository.instance
    }

    private async createTable(){
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.CategoriaUsuario(
        id AUTO_INCREMENT PRIMARY KEY,
        categoria VARCHAR(100) NOT NULL
        )`

        try{
        const resultado = await executarComandoSQL(query, []);
        console.log('Tabela CategoriaUsuario criado com sucesso', resultado)
        } catch (err){
        console.log('Erro', err)
        }
    }

    async insereCategoriaUsuario(){
        const categoria = ["Aluno", "Professor", "Bibliotecário"];
        await executarComandoSQL("CREATE TABLE IF NOT EXISTS biblioteca.CategoriaUsuario(id INT AUTO_INCREMENT PRIMARY KEY, categoria VARCHAR(100) NOT NULL)", []);
        for(const categorias of categoria){
            try{
                const resultado = await executarComandoSQL("INSERT IGNORE INTO biblioteca.CategoriaUsuario (categoria) values (?)", [categorias]);
                console.log('Categoria criada com sucesso!', resultado);
            } catch(err){
                console.error(`Erro ao inserir categoria ${categorias}:`, err);
            }
        }
    }

    async findAll(): Promise<string[]> {
        const resultado = await executarComandoSQL(`SELECT categoria FROM biblioteca.CategoriaUsuario`, []);
        return resultado.map((row: any) => row.categoria);
  }

    async encontrarCursos(categoria: string): Promise<CategoriaUsuario | null> {
            const query = `SELECT * FROM biblioteca.CategoriaUsuario WHERE categoria = ?`;
            const resultado = await executarComandoSQL(query, [categoria]);
    
            if (resultado && resultado.length > 0) {
                const row = resultado[0];
                return new CategoriaUsuario(row.id, row.categoria);
            }
    
            return null;
        }
}