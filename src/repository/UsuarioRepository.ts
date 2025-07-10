import { UsuarioEntity } from "../model/entity/UsuarioEntity"
import { executarComandoSQL } from "../database/mysql"

export class UsuarioRepository{
    private static instance: UsuarioRepository

    constructor(){
        this.createTable()
    }

    static getInstance(): UsuarioRepository {
        if( !this.instance ){
            this.instance = new UsuarioRepository()
        }
        return UsuarioRepository.instance
    }

    private async createTable(){
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Usuario (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        cpf DECIMAL(11) NOT NULL UNIQUE,
        status VARCHAR(20) NOT NULL,
        categoria_id VARCHAR(255) NOT NULL,
        curso_id VARCHAR(255) NOT NULL
        )`;
    
        try{
        const resultado = await executarComandoSQL(query, []);
        console.log('Tabela Usuário criado com sucesso', resultado)
        } catch (err){
        console.log('Erro', err)
        }
    }

    async insereUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        const query = "INSERT INTO biblioteca.Usuario (nome, cpf, status, categoria_id, curso_id) VALUES (?, ?, ?, ?, ?)";

        try {
            const resultado = await executarComandoSQL(query, [usuario.nome, usuario.cpf, usuario.status, usuario.categoria_id, usuario.curso_id]);
            console.log('Usuário inserido com sucesso, ID: ', resultado.insertId);
            usuario.id = resultado.insertId;
            return new Promise<UsuarioEntity>((resolve)=>{
                resolve(usuario);
            })
        } catch (err) {
            console.error('Erro ao inserir o usuário:', err);
            throw err;
        }
    }

    async findAll() :Promise<UsuarioEntity[]>{
        const query = "SELECT * FROM biblioteca.Usuario";

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<UsuarioEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os usuários gerando o erro: ${err}`);
            throw err;
        }
    }

    async findById(id:number) :Promise<UsuarioEntity> {
        const query = "SELECT * FROM biblioteca.Usuario WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Usuário localizado com sucesso, ID: ', resultado);
            return new Promise<UsuarioEntity>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o produto de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async updateUsuario(usuario: UsuarioEntity) :Promise<UsuarioEntity> {
        const query = "UPDATE biblioteca.Usuario SET nome = ?, cpf = ?, status = ?, categoria_id = ?, curso_id = ? WHERE id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [usuario.nome, usuario.cpf, usuario.status, usuario.categoria_id, usuario.curso_id, usuario.id]);
            console.log('Usuário atualizado com sucesso, ID: ', resultado);
            return new Promise<UsuarioEntity>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o usuário de ID ${usuario.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async removeById(id: number) :Promise<void> {
         const query = "DELETE FROM biblioteca.Usuario where id = ?;" ;

        try {
            await executarComandoSQL(query, [id]);
            console.log(`Usuário ID ${id} removido com sucesso.`);
        } catch (err) {
            console.error(`Erro ao remover usuário ID ${id}:`, err);
            throw err;
        }
    }
}
