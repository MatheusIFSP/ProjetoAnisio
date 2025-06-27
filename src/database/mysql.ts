import mysql, { Connection, QueryError } from 'mysql2'

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ifsp',
    database: 'vendas'
};

const mysqlConnection: Connection = mysql.createConnection(dbConfig);

mysqlConnection.connect ((err) => {
    if (err) {
        console.error('Error ao conectar ao banco de dados:', err);
        throw err;
    }
    console.log('Conexao bem-sucedida com o banco de dados My SQL');
});

export function executarComandoSQL(query: string, valores: any[], callback: (err: any, result: any)=>void){
    mysqlConnection.query(query, valores, (err, resultado: any) => {
        if (err) {
            console.error('Erro ao executar a query', err);
            throw err;
        }
        return callback(err, resultado);
    });
}



