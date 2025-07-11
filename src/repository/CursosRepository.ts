import { CursosEntity } from "../model/entity/CursosEntity";
import { executarComandoSQL } from "../database/mysql";

export class CursosRepository{
    private static instance: CursosRepository

    constructor(){

        this.createTable();
    }

    static getInstance(): CursosRepository{
        if( !this.instance ){
            this.instance = new CursosRepository()
        }
        return CursosRepository.instance
    }

    private async createTable(){
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Cursos(
        id AUTO_INCREMENT PRIMARY KEY,
        categoria VARCHAR(100) NOT NULL
        )`

        try{
        const resultado = await executarComandoSQL(query, []);
        console.log('Tabela Cursos criado com sucesso', resultado)
        } catch (err){
        console.log('Erro', err)
        }
    }

    async insereCursos(){
        const categoria = ["ADS", "Pedagogia", "Administração"];
        await executarComandoSQL("CREATE TABLE IF NOT EXISTS biblioteca.Cursos(id INT AUTO_INCREMENT PRIMARY KEY, categoria VARCHAR(100) NOT NULL)", []);
        for(const cursos of categoria){
            try{
                const resultado = await executarComandoSQL("INSERT IGNORE INTO biblioteca.Cursos (categoria) values (?)", [cursos]);
                console.log('Categoria criada com sucesso!', resultado);
            } catch(err){
                console.error(`Erro ao inserir categoria ${cursos}:`, err);
            }
        }
    }

    async findAll(): Promise<string[]> {
        const resultado = await executarComandoSQL(`SELECT categoria FROM biblioteca.Cursos`, []);
        return resultado.map((row: any) => row.categoria);
  }

    async findCursos(categoria: string): Promise<CursosEntity | null> {
            const query = `SELECT * FROM biblioteca.Cursos WHERE categoria = ?`;
            const resultado = await executarComandoSQL(query, [categoria]);
    
            if (resultado && resultado.length > 0) {
                const row = resultado[0];
                return new CursosEntity(row.id, row.categoria);
            }
    
            return null;
        }
}