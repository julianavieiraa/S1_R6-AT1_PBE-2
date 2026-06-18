import mysql from 'mysql2/promise';
import 'dotenv/config';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false
    }
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log(`Conctando ao MySQL`);
        connection.release();

    } catch (error) {
        console.error(`Erro ao conectar ao MySQL: ${error}`);
    }
})();

export async function initializeDatabase() {
    console.log("Inicializando o banco de dados e tabelas...");
    try {
        const tempConnection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
            ssl: { rejectUnauthorized: false }
        });


        const dbName = process.env.DB_DATABASE || 'deploy';


        await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        await tempConnection.query(`USE \`${dbName}\`;`);


        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS categorias (
            idCategoria INT AUTO_INCREMENT PRIMARY KEY,
            descricaoCategoria VARCHAR(100) NOT NULL,
            dataCad DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);


        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS produtos (
                idProduto INT AUTO_INCREMENT PRIMARY KEY,
                idCategoria INT NOT NULL,
                nomeProduto VARCHAR(100) NOT NULL,
                valorProduto DECIMAL(10,2) NOT NULL,
                vinculoImagem VARCHAR(255),
                dataCad DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (idCategoria) REFERENCES categorias (idCategoria)
            );
        `);


        await tempConnection.end();
        console.log("Banco de dados e tabelas verificados/criados com sucesso.");
    } catch (error) {
        console.error("Erro ao criar o banco ou as tabelas:", error);
        throw error;
    }
}

export default pool;
